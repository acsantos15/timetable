// Aries

package com.tgsi.timetable.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tgsi.timetable.entity.Events;
import com.tgsi.timetable.entity.Users;
import com.tgsi.timetable.mapper.EventMapper;
import com.tgsi.timetable.mapper.UserMapper;

import jakarta.servlet.http.HttpSession;

@Controller
public class UserController {

   @Autowired
   private UserMapper uMapper;

   @Autowired
   private EventMapper eMapper;

   @Autowired
   private BCryptPasswordEncoder bCryptPasswordEncoder;

    //signup page
    @GetMapping("/signup")
    public String signup() {
        return "signup";
    }

    // Get all users
    @GetMapping("/users")
    public @ResponseBody Iterable<Users> getAllUsers(Model model) {
      return uMapper.getAllUser();
    }
  
    // Register User
    @PostMapping("/createUser")
    @ResponseBody
    public ResponseEntity<?> signUp(@RequestBody Users user) {
        if (uMapper.findByUsername(user.getUsername()) != null) {
            return ResponseEntity.badRequest().body("Username is already taken.");
        }
        user.setPass(bCryptPasswordEncoder.encode(user.getPass()));
        uMapper.insertUser(user);
        return ResponseEntity.ok("User registered successfully.");
    }

    // Display Profile
    @GetMapping("/profile")
    public String showprofile(HttpSession session, Model model) {
        Users user = (Users) session.getAttribute("user");
        if (user == null) {
            return "redirect:/login";
        } else {
            // Get User Information
            Long userid = user.getId();
            Users dbUser = uMapper.getUserById(userid);
            model.addAttribute("user", dbUser);
            return "profile";
        }
    }

    // editprofile page
    @GetMapping("/editprofile")
    public String editprofile(HttpSession session, Model model) {
        Users user = (Users) session.getAttribute("user");
        if (user == null) {
            return "redirect:/login";
        } else {
            // Get User Information
            Long userid = user.getId();
            Users dbUser = uMapper.getUserById(userid);
            model.addAttribute("user", dbUser);
            return "editprofile";
        }
    }

    // Edit User
    @PutMapping("edituser/{id}")
    @ResponseBody
    public ResponseEntity<?> updateUser(@PathVariable("id") Long id, @RequestBody Users updatedUser) {
        Users existingUser = uMapper.getUserById(id);
        if (existingUser == null) {
            return ResponseEntity.notFound().build();
        }

        // Check if updated username already exists
        Users Usernames = uMapper.findByUsername(updatedUser.getUsername());
        if (Usernames != null && !Usernames.getId().equals(id)) {
            return ResponseEntity.badRequest().body("Username already exists.");
        }
        
        // event object 
        existingUser.setFname(updatedUser.getFname());
        existingUser.setLname(updatedUser.getLname());
        existingUser.setAddress(updatedUser.getAddress());
        existingUser.setContact(updatedUser.getContact());
        existingUser.setUsername(updatedUser.getUsername());
        existingUser.setEmail(updatedUser.getEmail());

        // Save the updated event object to the database
        uMapper.updateUser(existingUser);
        return ResponseEntity.ok(existingUser);
    }

     // Edit User pass
     @PutMapping("editpass/{id}")
     @ResponseBody
     public ResponseEntity<?> updatePass(@PathVariable("id") Long id, @RequestBody Map<String, String> passMap) {
         Users existingUser = uMapper.getUserById(id);
         if (existingUser == null) {
             return ResponseEntity.notFound().build();
         }
     
         String oldPass = passMap.get("oldpass");
         String newPass = passMap.get("newpass");
     
         // Check if old password is correct
         if (!BCrypt.checkpw(oldPass, existingUser.getPass())) {
             return ResponseEntity.badRequest().body("Wrong old password");
         }
     
         // Hash and set the new password
         String hashedPass = BCrypt.hashpw(newPass, BCrypt.gensalt());
         existingUser.setPass(hashedPass);
     
         // Save the updated user object to the database
         uMapper.updateUser(existingUser);
     
         return ResponseEntity.ok(existingUser);
    }

    

    // Login page
    @GetMapping("/login")
    public String showLoginForm() {
        return "login";
    }

    // Login page
    @GetMapping("/")
    public String showLoginForm2() {
        return "login";
    }

    // Login httpsession
    @PostMapping("/loginUser")
    public String login(@RequestParam String username, @RequestParam String password, HttpSession session, Model model) {
        Users user = uMapper.findByUsername(username);
        if (user != null && bCryptPasswordEncoder.matches(password, user.getPass()))  {
            session.setAttribute("user", user);
            model.addAttribute("success", "Login Successfully");
            return "redirect:/dashboard";
        } else {
            model.addAttribute("error", "Invalid username or password");
            return "login";
        }
    }
    
    // Logout remove httpsession
    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.removeAttribute("user");
        return "redirect:/login";
    }

    // Search users
    @GetMapping("/search")
    public String searchUsers(@RequestParam String searchWord, Model model) {
        List<Users> users = uMapper.searchUser(searchWord);
        List<String> userIds = users.stream().map(user -> String.valueOf(user.getId())).collect(Collectors.toList());
        LocalDateTime startTime = LocalDateTime.now().withHour(0).withMinute(0).withSecond(0);
        LocalDateTime endTime = LocalDateTime.now().withHour(23).withMinute(59).withSecond(59);
        List<Events> events = eMapper.getUserbyEventId(String.join(",", userIds), startTime, endTime);
        
        model.addAttribute("users", users);
        model.addAttribute("events", events);
        return "searchresult";
    }

    
}

