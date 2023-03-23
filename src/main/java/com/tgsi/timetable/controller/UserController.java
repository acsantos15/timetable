package com.tgsi.timetable.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import com.tgsi.timetable.Entity.User;
import com.tgsi.timetable.repository.UserRepo;

@Controller
public class UserController {

   @Autowired
   private UserRepo userRepository;

   @GetMapping("/")
   public String showLoginForm(Model model) {
      model.addAttribute("user", new User());
      return "login";
   }

   @PostMapping("/login")
   public String login(@ModelAttribute User user, Model model) {
      User existingUser = userRepository.findByEmail(user.getEmail());
      if (existingUser != null && existingUser.getPass().equals(user.getPass())) {
         return "dashboard";
      } else {
         model.addAttribute("error", "Invalid email or password.");
         return "login";
      }
   }

   @GetMapping("/signup")
   public String showSignupForm(Model model) {
      model.addAttribute("user", new User());
      return "signup";
   }

   @PostMapping("/signup")
   public String signup(@ModelAttribute User user, Model model) {
      User existingUser = userRepository.findByEmail(user.getEmail());
      if (existingUser == null) {
         userRepository.save(user);
         return "dashboard";
      } else {
         model.addAttribute("error", "Email address already exists.");
         return "signup";
      }
   }
}

