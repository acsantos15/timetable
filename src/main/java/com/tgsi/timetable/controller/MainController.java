// Aries

package com.tgsi.timetable.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
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
import com.tgsi.timetable.entity.Users;
import com.tgsi.timetable.mapper.EventMapper;

import jakarta.servlet.http.HttpSession;

@Controller
public class MainController {

    @Autowired
    private EventMapper eMapper;

    // Fetch events for today and tommorow
    @GetMapping("/dashboard")
    public String dashboard(Model model, HttpSession session) {
        Users user = (Users) session.getAttribute("user");
        if (user == null) {
            return "redirect:/login";
        } else {
            String username = user.getUsername();
            Long userid = user.getId();
            model.addAttribute("username", username);
            // Get Today Event
            List<Events> allEvents = eMapper.getUserEvent(userid);
            LocalDateTime today = LocalDateTime.now();
            List<Events> todaysEvents = allEvents.stream()
                    .filter(event -> event.getStart().toLocalDate().equals(today.toLocalDate()))
                    .collect(Collectors.toList());
            model.addAttribute("today", todaysEvents);

            // Dashboard Display Today Event
            if (todaysEvents.isEmpty()) {
                model.addAttribute("todayResponse", "NoData");
            } else {
                model.addAttribute("todayResponse", todaysEvents);
            }

            // Get Tommorow Event
            LocalDateTime tom = LocalDateTime.now().plusDays(1);
            List<Events> tomEvents = allEvents.stream()
                    .filter(event -> event.getStart().toLocalDate().equals(tom.toLocalDate()))
                    .collect(Collectors.toList());
            model.addAttribute("tommorow", tomEvents);

            // Dashboard Display Tommorow Event
            if (tomEvents.isEmpty()) {
                model.addAttribute("tommorowResponse", "NoData");
            } else {
                model.addAttribute("tommorowResponse", tomEvents);
            }

            // Get User Name
            String fname = user.getFname();
            model.addAttribute("fname", fname);
            String lname = user.getLname();
            model.addAttribute("lname", lname);
            return "dashboard";
        }

    }

    // Get All Events
    @GetMapping("/events")
    public @ResponseBody Iterable<Events> getAllEvents(HttpSession session, Model model) {
        Users user = (Users) session.getAttribute("user");
        // Get User Name
        Long loggedId = user.getId();
        model.addAttribute("loggedId", loggedId);
        return eMapper.getUserEvent(loggedId);
    }

    // Timetable Page
    @GetMapping("/timetable")
    public String timetablePage(HttpSession session, Model model) {
        Users user = (Users) session.getAttribute("user");
        if (user == null) {
            return "redirect:/login";
        } else {
            // Get User Name
            Long loggedId = user.getId();
            model.addAttribute("loggedId", loggedId);
            String fname = user.getFname();
            model.addAttribute("fname", fname);
            String lname = user.getLname();
            model.addAttribute("lname", lname);
            return "timetable";
        }
    }

    // Save Event
    @ResponseBody
    @PostMapping("/save")
    public Long saveEvent(@RequestBody Events event) {
        eMapper.insertEvent(event);
        Long eventId = event.getId();
        return eventId;
    }

    // Save Participant
    @PostMapping("/saveEventParticipants")
    @ResponseBody
    @SuppressWarnings("unchecked")
    public String saveEventParticipants(@RequestBody Map<String, Object> payload) {
        Long eventId = ((Number) payload.get("eventId")).longValue();
        List<Long> participantIds = (List<Long>) payload.get("participantIds");
        eMapper.insertEventParticipants(eventId, participantIds);
        return "Success";
    }

    // Get Invdividual Event
    @GetMapping("/timetable/{id}")
    @ResponseBody
    public Events getEventById(@PathVariable("id") Long id) {
        return eMapper.getEventById(id);
    }

    // Fetch participant for event
    @GetMapping("/events/{eventId}/users")
    @ResponseBody
    public List<Users> getAllUsersForEvent(@PathVariable Long eventId) {
        return eMapper.getUsersByEventId(eventId);
    }

    // Delete Event
    @DeleteMapping("/delete/{id}")
    public String deleteEvent(@PathVariable("id") Long id) {
        eMapper.deleteEventById(id);
        return "timetable";
    }

    // Edit Event
    @PutMapping("edit/{id}")
    @ResponseBody
    public ResponseEntity<?> updateEvent(@PathVariable("id") Long id, @RequestBody Events updatedEvent) {
        Events existingEvent = eMapper.getEventById(id);
        if (existingEvent == null) {
            return ResponseEntity.notFound().build();
        }

        // event object
        existingEvent.setTitle(updatedEvent.getTitle());
        existingEvent.setDescription(updatedEvent.getDescription());
        existingEvent.setLocation(updatedEvent.getLocation());
        existingEvent.setColor(updatedEvent.getColor());
        existingEvent.setStart(updatedEvent.getStart());
        existingEvent.setEnd(updatedEvent.getEnd());

        // Save the updated event object to the database
        eMapper.updatedEvent(existingEvent);
        return ResponseEntity.ok(existingEvent);
    }

    @DeleteMapping("/delete/{eventId}/edit")
    @ResponseBody
    public Long deleteParticipantsByEventId(@PathVariable Long eventId) {
        eMapper.deleteParticipant(eventId);
        return eventId;
    }
}