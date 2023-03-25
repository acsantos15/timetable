package com.tgsi.timetable.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tgsi.timetable.Entity.Events;
import com.tgsi.timetable.repository.EventRepo;

import jakarta.persistence.Entity;
import jakarta.transaction.Transactional;

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

    // Get All Events 
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
    @PostMapping("/add/save")
    public String saveEvent(@ModelAttribute("timetable") @Validated Events event, BindingResult result) {
        if (result.hasErrors()) {
            return "timetable";
        }
        eRepo.save(event);
        return "redirect:/timetable";
    }

    // Get Invdividual Event
    @GetMapping("/timetable/{id}")
    @ResponseBody
    public Events getEventById(@PathVariable("id") Long id) {
        return eRepo.findById(id).orElse(null);
    }

    // Delete Event
    @DeleteMapping("/delete/{id}")
    @Transactional
    public ResponseEntity<Void> deleteEvent(@PathVariable("id") Long id) {
        eRepo.deleteById(id);
        return ResponseEntity.ok().build();
    }

    // Edit Event
    @PutMapping("edit/{id}")
    public Events updateEvent(@PathVariable("id") Long eventId, @RequestBody Events updatedEvent) {
        Events existingEvent = eRepo.findById(eventId)
                                                .orElseThrow(() -> new NotFoundException("Event not found"));

        // Update the fields on the existing event object with values from the updated event object
        existingEvent.setTitle(updatedEvent.getTitle());
        existingEvent.setDescription(updatedEvent.getDescription());
        existingEvent.setLocation(updatedEvent.getLocation());
        existingEvent.setStart(updatedEvent.getStart());
        existingEvent.setEnd(updatedEvent.getEnd());

        // Save the updated event object to the database
        Events savedEvent = eRepo.save(existingEvent);

        return savedEvent;
    }
    
}
