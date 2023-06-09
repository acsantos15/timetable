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
import org.springframework.web.client.RestTemplate;

import com.tgsi.timetable.entity.Events;
import com.tgsi.timetable.entity.Users;
import com.tgsi.timetable.entity.WeatherData;
import com.tgsi.timetable.mapper.EventMapper;
import com.tgsi.timetable.mapper.UserMapper;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;

@Controller
public class MainController {

    @Autowired
    public EventMapper eMapper;

    @Autowired
    public UserMapper uMapper;

    // Dashboard Page
    @GetMapping("/dashboard")
    public String dashboard(Model model, HttpSession session) {

        // Check Session If User Is Logged In
        Users user = (Users) session.getAttribute("user");
        if (user == null) {
            return "redirect:/login";
        } else {
            String username = user.getUsername();
            Long userid = user.getId();
            model.addAttribute("username", username);

            //Fetch Events For Today
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

            // Fetch Events For Tommorow
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

            // Open Weather API 
            String apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=Pasig&units=metric&appid=b5e35da3557f68bd8edc2b6032dddc77";
            WeatherData weatherData = new RestTemplate().getForObject(apiUrl, WeatherData.class);
            model.addAttribute("weatherData", weatherData);

            model.addAttribute("user", user);
            return "dashboard";
        }

    }


    // Get All Events Of Logged User
    @GetMapping("/events")
    public @ResponseBody Iterable<Events> getAllEvents(HttpSession session, Model model) {
        Users user = (Users) session.getAttribute("user");
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
            Long loggedId = user.getId();
            Users dbUser = uMapper.getUserById(loggedId);
            model.addAttribute("loggedId", dbUser);

            model.addAttribute("user", user);
            return "timetable";
        }
    }

    // Save Event
    @PostMapping("/save")
    @ResponseBody
    public ResponseEntity<Long> saveEvent(@Valid @RequestBody Events event) {
        eMapper.insertEvent(event);
        Long eventId = event.getId();
        return ResponseEntity.ok(eventId);
    }

    // Save Participant
    @PostMapping("/saveEventParticipants")
    @ResponseBody
    public String saveEventParticipants(@Valid @RequestBody Map<String, Object> payload) {
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

    // Fetch Participant For Event
    @GetMapping("/events/{eventId}/users")
    @ResponseBody
    public List<Users> getAllUsersForEvent(@PathVariable Long eventId) {
        return eMapper.getUsersByEventId(eventId);
    }

    // Delete Event
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id) {
        eMapper.deleteEventById(id);
        return ResponseEntity.noContent().build();
    }

    // Edit Event
    @PutMapping("edit/{id}")
    @ResponseBody
    public ResponseEntity<?> updateEvent(@Valid @PathVariable("id") Long id, @RequestBody Events updatedEvent) {
        Events existingEvent = eMapper.getEventById(id);
        if (existingEvent == null) {
            return ResponseEntity.notFound().build();
        }

        // Event Object
        existingEvent.setTitle(updatedEvent.getTitle());
        existingEvent.setDescription(updatedEvent.getDescription());
        existingEvent.setLocation(updatedEvent.getLocation());
        existingEvent.setColor(updatedEvent.getColor());
        existingEvent.setStart(updatedEvent.getStart());
        existingEvent.setEnd(updatedEvent.getEnd());

        // Save Updated Object to Database
        eMapper.updatedEvent(existingEvent);
        return ResponseEntity.ok(existingEvent);
    }

    // Delete Participant For Event
    @DeleteMapping("/delete/{eventId}/edit")
    @ResponseBody
    public Long deleteParticipantsByEventId(@PathVariable Long eventId) {
        eMapper.deleteParticipant(eventId);
        return eventId;
    }
}