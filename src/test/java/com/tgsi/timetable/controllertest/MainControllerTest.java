package com.tgsi.timetable.controllertest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;

import com.tgsi.timetable.controller.MainController;
import com.tgsi.timetable.entity.Events;
import com.tgsi.timetable.entity.Users;
import com.tgsi.timetable.mapper.EventMapper;

import jakarta.servlet.http.HttpSession;

@SpringBootTest
public class MainControllerTest {

    @Autowired
    private EventMapper eMapper;

    @Autowired
    private MainController mainController;
    
    // Test Fetching Datas On Dashboard
    @Test
    public void testDashboard() {
        // Create a mock HttpSession object
        HttpSession session = mock(HttpSession.class);
        // Create a mock Model object
        Model model = mock(Model.class);

        // Set up a mock user object in the session
        Users user = new Users();
        user.setId(1L);
        user.setUsername("testuser");
        when(session.getAttribute("user")).thenReturn(user);

        // Set up a mock list of events
        List<Events> events = new ArrayList<>();
        Events event1 = new Events();
        event1.setId(1L);
        event1.setTitle("Event 1");
        event1.setStart(LocalDateTime.now());
        events.add(event1);
        Events event2 = new Events();
        event2.setId(2L);
        event2.setTitle("Event 2");
        event2.setStart(LocalDateTime.now().plusDays(1));
        events.add(event2);

        // Set up a mock EventMapper object
        EventMapper eMapper = mock(EventMapper.class);
        when(eMapper.getUserEvent(1L)).thenReturn(events);

        // Create a MainController object and call the dashboard method
        MainController mainController = new MainController();
        mainController.eMapper = eMapper;
        String viewName = mainController.dashboard(model, session);

        // Verify that the expected view name is returned
        assertEquals("dashboard", viewName);

        // Verify that the expected attributes are added to the model
        verify(model).addAttribute("username", "testuser");
        verify(model).addAttribute("today", Collections.singletonList(event1));
        verify(model).addAttribute("todayResponse", Collections.singletonList(event1));
        verify(model).addAttribute("tommorow", Collections.singletonList(event2));
        verify(model).addAttribute("tommorowResponse", Collections.singletonList(event2));
        verify(model).addAttribute("user", user);
    }
    
    // Test Saving Event 
    @Test
    public void testSaveEvent() {
        // create a mock event
        Events event = new Events();
        event.setTitle("Test Event");
        event.setDescription("Test Description");
        event.setLocation("Test Location");
        event.setStart(LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS));
        event.setEnd(LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS).plusHours(1));
        event.setColor("#12345");

        // call the saveEvent method
        ResponseEntity<Long> responseEntity = mainController.saveEvent(event);

        // check that the event was saved and assigned an ID
        Long eventId = responseEntity.getBody();
        assertNotNull(eventId);

        // retrieve the event from the database and check that it matches the one we saved
        Events savedEvent = eMapper.getEventById(eventId);
        assertNotNull(savedEvent);
        assertEquals(event.getTitle(), savedEvent.getTitle());
        assertEquals(event.getDescription(), savedEvent.getDescription());
        assertEquals(event.getLocation(), savedEvent.getLocation());
        assertEquals(event.getStart(), savedEvent.getStart());
        assertEquals(event.getEnd(), savedEvent.getEnd());
        assertEquals(event.getColor(), savedEvent.getColor());
    }

    // Test Deleting Event
    @Test
    public void testDeleteEvent() {
        // save the event to the database
        Long eventId = 1L;

        // call the deleteEvent method
        ResponseEntity<Void> responseEntity = mainController.deleteEvent(eventId);

        // check that the event was deleted
        assertEquals(HttpStatus.NO_CONTENT, responseEntity.getStatusCode());

        // retrieve the event from the database and check that it does not exist
        Events deletedEvent = eMapper.getEventById(eventId);
        assertNull(deletedEvent);
    }

    // Test Updating Event
    @Test
    public void testUpdateEvent() {
 
         // Event id from database
         Long eventId = 43L;

        // create an updated event
        Events updatedEvent = new Events();
        updatedEvent.setTitle("Updated Test Event");
        updatedEvent.setDescription("Updated Test Description");
        updatedEvent.setLocation("Updated Test Location");
        updatedEvent.setStart(LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS));
        updatedEvent.setEnd(LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS).plusHours(1));
        updatedEvent.setColor("#67890");

        // call the updateEvent method
        ResponseEntity<?> responseEntity = mainController.updateEvent(eventId, updatedEvent);

        // check that the event was updated
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());

        // retrieve the event from the database and check that it matches the updated event
        Events updateEvent = eMapper.getEventById(eventId);
        assertEquals(updatedEvent.getTitle(), updateEvent.getTitle());
        assertEquals(updatedEvent.getDescription(), updateEvent.getDescription());
        assertEquals(updatedEvent.getLocation(), updateEvent.getLocation());
        assertEquals(updatedEvent.getStart(), updateEvent.getStart());
        assertEquals(updatedEvent.getEnd(), updateEvent.getEnd());
        assertEquals(updatedEvent.getColor(), updateEvent.getColor());
    }



}
