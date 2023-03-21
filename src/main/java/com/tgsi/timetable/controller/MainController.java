package com.tgsi.timetable.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;


import com.tgsi.timetable.Entity.Events;
import com.tgsi.timetable.repository.EventRepo;

// @Controller // This means that this class is a Controller
// @RequestMapping(path="/demo") // This means URL's start with /demo (after Application path)
// public class MainController {
//   @Autowired // This means to get the bean called userRepository
//          // Which is auto-generated by Spring, we will use it to handle the data
//   private EventRepo eRepo;

//   @GetMapping(path="/all")
//   public @ResponseBody Iterable<Events> getAllUsers() {
//     // This returns a JSON or XML with the users
//     return eRepo.findAll();
//   }
// }
@Controller
public class MainController {

    @Autowired
	private EventRepo eRepo;

    @GetMapping("/dashboard")
    public String dash(Model model) {
        LocalDateTime today = LocalDateTime.now();
        List<Events> events = eRepo.findAll();
        List<Events> todaysEvents = events.stream()
        .filter(event -> event.getStart().toLocalDate().equals(today.toLocalDate()))
        .collect(Collectors.toList());
        model.addAttribute("events", todaysEvents);
        return "dashboard";
    }

    @GetMapping("/timetable")
    public String timetable() {
        return "timetable";
    }
    
}
