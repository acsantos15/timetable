// Aries

package com.tgsi.timetable.controller;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

import com.tgsi.timetable.mapper.EventMapper;
import com.tgsi.timetable.mapper.UserMapper;
import com.tgsi.timetable.model.Events;
import com.tgsi.timetable.model.Users;
import com.tgsi.timetable.model.WeatherData;

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
    @CrossOrigin
    public ResponseEntity<Map<String, Object>> dashboard(HttpSession session) {
        Users user = (Users) session.getAttribute("userSession");
        Long userid = user.getId();
        // Fetch Events For Today
        List<Events> allEvents = eMapper.getUserEvent(userid);
        LocalDateTime today = LocalDateTime.now();
        List<Events> todaysEvents = allEvents.stream()
                .filter(event -> event.getStart().toLocalDate().equals(today.toLocalDate()))
                .collect(Collectors.toList());

        // Fetch Events For Tomorrow
        LocalDateTime tom = LocalDateTime.now().plusDays(1);
        List<Events> tomEvents = allEvents.stream()
                .filter(event -> event.getStart().toLocalDate().equals(tom.toLocalDate()))
                .collect(Collectors.toList());

        // Open Weather API
        String apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=Pasig&units=metric&appid=b5e35da3557f68bd8edc2b6032dddc77";
        WeatherData weatherData = new RestTemplate().getForObject(apiUrl, WeatherData.class);

        Map<String, Object> data = new HashMap<>();
        data.put("today", todaysEvents);
        data.put("tomorrow", tomEvents);
        data.put("weatherData", weatherData);
        return ResponseEntity.ok(data);
    }

    // Get All Events Of Logged User
    @GetMapping("/events")
    @CrossOrigin
    public @ResponseBody Iterable<Events> getAllEvents(HttpSession session) {
        Users user = (Users) session.getAttribute("userSession");
        Long loggedId = user.getId();
        return eMapper.getUserEvent(loggedId);
    }

    // Save Event
    @PostMapping("/saveEvent")
    @ResponseBody
    public ResponseEntity<Long> saveEvent(@Valid @RequestBody Events event) {
        eMapper.insertEvent(event);
        Long eventId = event.getId();
        return ResponseEntity.ok(eventId);
    }

    // Save Participant
    @PostMapping("/saveEventParticipants")
    @ResponseBody
    @SuppressWarnings("unchecked")
    public ResponseEntity<Map<String, String>> saveEventParticipants(@Valid @RequestBody Map<String, Object> payload) {
        Long eventId = ((Number) payload.get("eventId")).longValue();
        List<Long> participantIds = (List<Long>) payload.get("participantIds");
        eMapper.insertEventParticipants(eventId, participantIds);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Success");
        return ResponseEntity.ok(response);
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
    public ResponseEntity<?> updateEvent(@Valid @PathVariable Long id, @RequestBody Events updatedEvent) {
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

    // Get all locations
    @GetMapping("/locations")
    @ResponseBody
    public Map<String, Object> getAllUsers() {
        Map<String, Object> response = new HashMap<>();
        response.put("locations", eMapper.getAllLocations());

        return response;
    }
}