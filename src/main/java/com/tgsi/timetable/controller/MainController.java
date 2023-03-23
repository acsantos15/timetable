package com.tgsi.timetable.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tgsi.timetable.Entity.Events;
import com.tgsi.timetable.repository.EventRepo;

@Controller
public class MainController {

    @Autowired
	private EventRepo eRepo;

    //Fetch Data from Database 
    @GetMapping("/dashboard")
    public String dash(Model model) {
        // Get Today Event
        LocalDateTime today = LocalDateTime.now();
        List<Events> events = eRepo.findAll();
        List<Events> todaysEvents = events.stream()
        .filter(event -> event.getStart().toLocalDate().equals(today.toLocalDate()))
        .collect(Collectors.toList());
        model.addAttribute("today", todaysEvents);

        // Get Tommorow Event
        LocalDateTime tom = LocalDateTime.now().plusDays(1);
        List<Events> tomEvents = events.stream()
        .filter(event -> event.getStart().toLocalDate().equals(tom.toLocalDate()))
        .collect(Collectors.toList());
        model.addAttribute("tommorow", tomEvents);
        return "dashboard";
    }

    // Get All events and return a json
    @GetMapping("/events")
    public @ResponseBody Iterable<Events> getAllEvents() {
      return eRepo.findAll();
    }

    // Event Form
    @GetMapping("/timetable")
    public String newEvent(Model model) {
        model.addAttribute("timetable", new Events());
        return "timetable";
    }

    // Save Event Using AJAX NOT WORKING
    // @PostMapping("/timetable/save")
    // public ResponseEntity<String> saveData(@RequestBody Events event) {
    //     // Save the data to the MariaDB database using a JPA repository
    //     eRepo.save(event);

    //     // Return a success response
    //     return ResponseEntity.ok("Data saved successfully");
    // }
    

    // Save Event
    @PostMapping("/timetable/save")
    public String saveEvent(@ModelAttribute("timetable") @Validated Events event, BindingResult result) {
        if (result.hasErrors()) {
            return "timetable"; // Return to the form if there are validation errors
        }

        eRepo.save(event); // Save the event data to the database

        return "redirect:/timetable"; // Redirect to the events list page
    }

    @GetMapping("/timetable/{id}")
    @ResponseBody
    public Events getEventById(@PathVariable("id") Long id) {
        return eRepo.findById(id).orElse(null);
    }

    
}
