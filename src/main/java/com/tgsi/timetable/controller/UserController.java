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
import com.tgsi.timetable.service.UserService;

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
    // @PostMapping("/createUser")
    // @ResponseBody
    // public ResponseEntity<String> registerUser(@RequestBody Users user, @RequestParam("username") String username) {
    //     Users existUsername = uMapper.findByUsername(username);
    //     if(existUsername != null){
    //         return ResponseEntity.ok().body("UUsername already");
    //     }
    //     uMapper.insertUser(user);
    //     return ResponseEntity.ok().body("User Registered");
    // }

//    // Signup Form
// //    @GetMapping("/signup")
// //    public String newEvent(Model model) {
// //        model.addAttribute("user", new User());
// //        return "signup";
// //    }
   

//    // Register User
// //    @PostMapping("/createUser")
// //    @ResponseBody
// //    public String saveEvent(@ModelAttribute("user") @RequestBody @Validated User event, BindingResult result) {
// //        if (result.hasErrors()) {
// //            return "signup";
// //        }
// //        uRepo.save(event);
// //        return "redirect:/login";
// //    }

//     // @GetMapping("/signup")
//     // public String signup(){
//     //     return "signup"; 
//     // }

//     // @PostMapping("/createUser")
//     // public String createUser(@ModelAttribute User user, HttpSession session){
        
//     //     boolean f = userService.checkEmail(user.getEmail());

//     //     /* for prompt yung httpsession */
//     //     if(f){
//     //         session.setAttribute("msg", "Email already exists!");
//     //     }else{
//     //         User userDetails = userService.createUser(user);
//     //         if(userDetails!=null){
//     //             session.setAttribute("msg", "Registered Successfully!");
//     //         }else{
//     //             session.setAttribute("msg", "Something went wrong!");
//     //         }
//     //     }
//     //     return "redirect:/signup";
//     // }

//    // @GetMapping("/login")
//    //  public String showLoginForm(Model model) {
//    //      model.addAttribute("user", new User());
//    //      return "login";
//    //  }

//    // @PostMapping("/login")
//    // public String login(@ModelAttribute("user") User user, HttpSession session) {
//    //    User existingUser = userRepository.findByEmail(user.getEmail());
//    //    if (existingUser != null && existingUser.getPass().equals(user.getPass())) {
//    //       session.setAttribute("user", existingUser);
//    //       return "redirect:/dashboard";
//    //    } else {
//    //       return "login";
//    //    }
//    // }Login
//    // public String showRegisterForm(Model model) {
//    //    model.addAttribute("signup", new User());
//    //    return "signup";
//    // }

//    // @PostMapping("/signup")
//    // public String register(@ModelAttribute("user") User user, HttpSession session) {
//    //    userRepository.save(user);
//    //    session.setAttribute("user", user);
//    //    return "redirect:/dashboard";
//    // }

//    // @GetMapping("/logout")
//    // public StrSuccessfullying logout(HttpSession session) {
//    //    session.removeAttribute("user");
//    //    return "redirect:/login";
//    // }
}

