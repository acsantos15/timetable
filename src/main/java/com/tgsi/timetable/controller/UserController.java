package com.tgsi.timetable.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import com.tgsi.timetable.Entity.User;
import com.tgsi.timetable.service.UserService;

import jakarta.servlet.http.HttpSession;

@Controller
public class UserController {

   @Autowired
   private UserService userService;

   @GetMapping("/signup")
    public String signup(){
        return "signup";
    }

    @PostMapping("/createUser")
    public String createUser(@ModelAttribute User user, HttpSession session){
        
        boolean f = userService.checkEmail(user.getEmail());

        /* for prompt yung httpsession */
        if(f){
            session.setAttribute("msg", "Email already exists!");
        }else{
            User userDetails = userService.createUser(user);
            if(userDetails!=null){
                session.setAttribute("msg", "Registered Successfully!");
            }else{
                session.setAttribute("msg", "Something went wrong!");
            }
        }
        
        return "redirect:/signup";
    }

   // @GetMapping("/login")
   //  public String showLoginForm(Model model) {
   //      model.addAttribute("user", new User());
   //      return "login";
   //  }

   // @PostMapping("/login")
   // public String login(@ModelAttribute("user") User user, HttpSession session) {
   //    User existingUser = userRepository.findByEmail(user.getEmail());
   //    if (existingUser != null && existingUser.getPass().equals(user.getPass())) {
   //       session.setAttribute("user", existingUser);
   //       return "redirect:/dashboard";
   //    } else {
   //       return "login";
   //    }
   // }

   // @GetMapping("/signup")
   // public String showRegisterForm(Model model) {
   //    model.addAttribute("signup", new User());
   //    return "signup";
   // }

   // @PostMapping("/signup")
   // public String register(@ModelAttribute("user") User user, HttpSession session) {
   //    userRepository.save(user);
   //    session.setAttribute("user", user);
   //    return "redirect:/dashboard";
   // }

   // @GetMapping("/logout")
   // public String logout(HttpSession session) {
   //    session.removeAttribute("user");
   //    return "redirect:/login";
   // }
}

