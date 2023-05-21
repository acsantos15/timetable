// Aries

package com.tgsi.timetable.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.multipart.MultipartFile;

import com.tgsi.timetable.mapper.EventMapper;
import com.tgsi.timetable.mapper.UserMapper;
import com.tgsi.timetable.model.Events;
import com.tgsi.timetable.model.Users;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;

@RestController
@SessionAttributes("userSession")
public class UserController {

    @Autowired
    public UserMapper uMapper;

    @Autowired
    private EventMapper eMapper;

    @Autowired
    public BCryptPasswordEncoder bCryptPasswordEncoder;

    // Get all users
    @GetMapping("/users")
    @ResponseBody
    public Map<String, Object> getAllUsers(HttpSession session) {
        Users user = (Users) session.getAttribute("userSession");
        Long loggedId = user.getId();

        Map<String, Object> response = new HashMap<>();
        // response.put("loggedId", loggedId);
        response.put("users", uMapper.getAllUser());
        response.put("userid", loggedId);

        return response;
    }

    // Register User
    @PostMapping("/createUser")
    @ResponseBody
    public Map<String, String>  signUp(@Valid @RequestBody Users user) {
        Map<String, String> response = new HashMap<>();
        if (uMapper.findByUsername(user.getUsername()) != null) {
            response.put("status", "taken");
        } else {
            user.setPass(bCryptPasswordEncoder.encode(user.getPass()));
            uMapper.insertUser(user);
            response.put("status", "success");
        }
        return response;
    }

    @GetMapping("/loggedUser")
    @CrossOrigin
    public ResponseEntity<?> header(HttpSession session) {
        Users user = (Users) session.getAttribute("userSession");
        Long userid = user.getId();
        Users dbUser = uMapper.getUserById(userid);
        return ResponseEntity.ok(dbUser);
    }

    // editprofile page
    @GetMapping("/editprofile")
    public String editprofile(@Valid HttpSession session, Model model) {
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
    public ResponseEntity<?> updateUser(
        @Valid @PathVariable Long id,
        @RequestParam(value = "photo", required = false) MultipartFile photo,
        @RequestParam("fname") String fname,
        @RequestParam("lname") String lname,
        @RequestParam("address") String address,
        @RequestParam("contact") String contact,
        @RequestParam("username") String username,
        @RequestParam("email") String email
    ) {
        Users existingUser = uMapper.getUserById(id);
        if (existingUser == null) {
            return ResponseEntity.notFound().build();
        }

        // Check if updated username already exists
        if (username != null && !username.equals(existingUser.getUsername())) {
            Users usernameExists = uMapper.findByUsername(username);
            if (usernameExists != null && !usernameExists.getId().equals(id)) {
                return ResponseEntity.badRequest().body("Username already exists.");
            }
        }
    

        // Update user details
        existingUser.setFname(fname);
        existingUser.setLname(lname);
        existingUser.setAddress(address);
        existingUser.setContact(contact);
        existingUser.setUsername(username);
        existingUser.setEmail(email);

        // Handle profile picture update
        if (photo != null && !photo.isEmpty()) {
            try {
                // Save the profile picture file to a desired location
                String originalFileName = photo.getOriginalFilename();
                String extension = originalFileName.substring(originalFileName.lastIndexOf(".") + 1);
                String fileName = UUID.randomUUID().toString() + "." + extension;
                
                String filePath = "/home/aries/Desktop/Timetable Projecty/timetable/FrontEnd/public/ProfilePhotos/" + fileName;
                Files.copy(photo.getInputStream(), Paths.get(filePath), StandardCopyOption.REPLACE_EXISTING);

                // Update the profile picture field in the existing user object
                existingUser.setPhoto(fileName);
            } catch (IOException e) {
                // Handle file upload error
                return ResponseEntity.badRequest().body("Failed to upload profile picture.");
            }
        }

        // Save the updated user object to the database
        uMapper.updateUser(existingUser);
        return ResponseEntity.ok(existingUser);
    }



    // Edit User pass
    @PutMapping("editpass/{id}")
    @ResponseBody
    public ResponseEntity<?> updatePass(@Valid @PathVariable("id") Long id, @RequestBody Map<String, String> passMap) {
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

    // Login httpsession
    @PostMapping("/loginUser")
    @ResponseBody
    @CrossOrigin
    public Map<String, String> login(@RequestBody Map<String, String> loginData, HttpSession session) {
        String username = loginData.get("username");
        String password = loginData.get("password");
        Map<String, String> response = new HashMap<>();
        Users user = uMapper.findByUsername(username);
        if (user != null && bCryptPasswordEncoder.matches(password, user.getPass())) {
            session.setAttribute("userSession", user);
            response.put("status", "success");
        } else {
            response.put("status", "error");
        }
        return response;
    }

    // Check httpsession
    @GetMapping("/checkSession")
    public Map<String, String> checkSession(HttpSession session) {
        Map<String, String> response = new HashMap<>();
        Users userSession = (Users) session.getAttribute("userSession");
        if (userSession != null) {
            response.put("status", "success");
        } else {
            response.put("status", "error");
        }
        return response;
    }

    // Logout remove httpsession
    @GetMapping("/logout")
    public String logout(HttpSession session) {
        if (session != null) {
        session.invalidate();
        }
        return "{\"status\":\"success\"}";
    }

    // Search users
    @PostMapping("/search")
    public ResponseEntity<Object> searchUsers(@RequestBody Map<String, String> payload, HttpSession session) {
        String searchWord = payload.get("searchWord");
        List<Users> users = uMapper.searchUser(searchWord);
        List<String> userIds = users.stream().map(user -> String.valueOf(user.getId())).collect(Collectors.toList());
        LocalDateTime startTime = LocalDateTime.now().withHour(0).withMinute(0).withSecond(0);
        LocalDateTime endTime = LocalDateTime.now().withHour(23).withMinute(59).withSecond(59);
        List<Events> events = eMapper.getUserbyEventId(String.join(",", userIds), startTime, endTime);

            Map<String, Object> response = new HashMap<>();
            if (users.isEmpty()) {
                response.put("userresult", "nouser");
            } else {
                response.put("users", users);
                if (events.isEmpty()) {
                    response.put("eventresult", "noevent");
                } else {
                    response.put("events", events);
                }
            }
            return ResponseEntity.ok(response);
    }


}
