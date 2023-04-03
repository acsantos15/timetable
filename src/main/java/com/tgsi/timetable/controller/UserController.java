// Aries

package com.tgsi.timetable.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tgsi.timetable.entity.UserEvent;
import com.tgsi.timetable.entity.Users;
import com.tgsi.timetable.mapper.UserMapper;

import jakarta.servlet.http.HttpSession;

@Controller
public class UserController {

   @Autowired
   private UserMapper uMapper;

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
    public Users createUser(@RequestBody Users user) {
        uMapper.insertUser(user);
        return user;
    }

    // Edit User
    @PutMapping("edit/{id}")
    @ResponseBody
    public ResponseEntity<?> updateEvent(@PathVariable("id") Long id, @RequestBody Events updatedEvent) {
        Events existingEvent = eMapper.getEventById(id);
        if (existingEvent == null) {
            return ResponseEntity.notFound().build();
        }

        // event object 
        existingEvent.setTitle(updatedEvent.getTitle());
        existingEvent.setDescription(updatedEvent.getDescription());
        existingEvent.setLocation(updatedEvent.getLocation());
        existingEvent.setStart(updatedEvent.getStart());
        existingEvent.setEnd(updatedEvent.getEnd());

        // Save the updated event object to the database
        eMapper.updatedEvent(existingEvent);
        return ResponseEntity.ok(existingEvent);
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
    @PostMapping("/login")
    public String login(@RequestParam String username, @RequestParam String password, HttpSession session, Model model) {
        Users user = uMapper.findByUsername(username);
        if (user != null && user.getPass().equals(password)) {
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

    
}

