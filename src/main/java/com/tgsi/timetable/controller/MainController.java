// Aries

package com.tgsi.timetable.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tgsi.timetable.entity.Events;
import com.tgsi.timetable.mapper.EventMapper;


@Controller
public class MainController {

    @Autowired
	private EventMapper eMapper;

    //Fetch Data from Database 
    @GetMapping("/dashboard")
    public String dashboard(Model model) {
        // Get Today Event
        List<Events> allEvents = eMapper.getAllEvents();
        LocalDateTime today = LocalDateTime.now();
        List<Events> todaysEvents = allEvents.stream()
        .filter(event -> event.getStart().toLocalDate().equals(today.toLocalDate()))
        .collect(Collectors.toList());
        model.addAttribute("today", todaysEvents);

        // Get Tommorow Event
        LocalDateTime tom = LocalDateTime.now().plusDays(1);
        List<Events> tomEvents = allEvents.stream()
        .filter(event -> event.getStart().toLocalDate().equals(tom.toLocalDate()))
        .collect(Collectors.toList());
        model.addAttribute("tommorow", tomEvents);
        return "dashboard";
    }

    // Get All Events 
    @GetMapping("/events")
    public @ResponseBody Iterable<Events> getAllEvents() {
      return eMapper.getAllEvents();
    }

    // Timetable
    @GetMapping("/timetable")
    public String newEvent() {
        return "timetable";
    }

    // Save Event
    @ResponseBody
    @PostMapping("/save")
    public String saveEvent(@RequestBody Events event) {
        eMapper.insertEvent(event);
        return "redirect:/timetable";
    }

    // Get Invdividual Event
    @GetMapping("/timetable/{id}")
    @ResponseBody
    public Events getEventById(@PathVariable("id") Long id) {
        return eMapper.getEventById(id);
    }

    // Delete Event
    @DeleteMapping("/delete/{id}")
    public String deleteEvent(@PathVariable("id")Long id) {
        eMapper.deleteEventById(id);
        return "timetable";
    }

    // Edit Event
    // @PutMapping("edit/{id}")
    // @ResponseBody
    // public Events updateEvent (@PathVariable("id") Long id, @RequestBody Events event) {
    //     event.setId(id);
    //     eMapper.updatedEvent(event);
    //     return event;
    // }
    @PutMapping("edit/{id}")
    @ResponseBody
    public ResponseEntity<?> updateEvent(@PathVariable("id") Long id, @RequestBody Events updatedEvent) {
        Events existingEvent = eMapper.getEventById(id);
        if (existingEvent == null){
            return ResponseEntity.notFound().build();
        }

        // Update the fields on the existing event object with values from the updated event object
        existingEvent.setTitle(updatedEvent.getTitle());
        existingEvent.setDescription(updatedEvent.getDescription());
        existingEvent.setLocation(updatedEvent.getLocation());
        existingEvent.setStart(updatedEvent.getStart());
        existingEvent.setEnd(updatedEvent.getEnd());

        // Save the updated event object to the database
        eMapper.updatedEvent(existingEvent);
        return ResponseEntity.ok(existingEvent);
    }

}
