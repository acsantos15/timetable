package com.tgsi.timetable.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

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

    @GetMapping("/users")
    public @ResponseBody Iterable<Users> getAllUsers() {
      return uMapper.getAllUser();
    }

    // Register User
    @PostMapping("/createUser")
    @ResponseBody
    public Users createUser(@RequestBody Users user) {
        uMapper.insertUser(user);
        return user;
    }

    // Login page
    @GetMapping("/login")
    public String showLoginForm() {
        return "login";
    }

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

    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.removeAttribute("user");
        return "redirect:/login";
    }

    // editprofile page
    @GetMapping("/editprofile")
    public String editprofile() {
        return "editprofile";
    }
}

