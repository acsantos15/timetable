package com.tgsi.timetable.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tgsi.timetable.Entity.Events;
import com.tgsi.timetable.repository.EventRepo;

@Controller
public class MainController {

    @Autowired
	private EventRepo eRepo;

    //Dashboard Controller
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

    // return the timetable page
    @GetMapping("/timetable")
    public String formEvent(Model model) {
        model.addAttribute("event", new Events());
        return "timetable";
    }

    @PostMapping("/timetable")
    public String saveEvent(@ModelAttribute Events event, Model model) {
        eRepo.save(event);
        model.addAttribute("message", "Event Created");
        return "timetable";
    }
    
}
