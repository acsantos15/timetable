package com.tgsi.timetable.controllertest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.invocation.InvocationOnMock;
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

    @Mock
    private EventMapper eMapper;

    @InjectMocks
    private MainController mainController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }
    
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
    void saveEventTest() {
        Events event = new Events();
        event.setTitle("Test Event");
        event.setDescription("Test Description");
        event.setLocation("Test Location");
        event.setStart(LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS));
        event.setEnd(LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS).plusHours(1));
        event.setColor("#12345");

        when(eMapper.insertEvent(event)).thenReturn(1L);

        // Call the saveEvent method
        ResponseEntity<Long> responseEntity = mainController.saveEvent(event);

        verify(eMapper).insertEvent(event);
    }

    // Test Saving Participants
    @Test
    public void testSaveEventParticipants() {
        // Mock the payload
        Map<String, Object> payload = new HashMap<>();
        payload.put("eventId", 1L);
        payload.put("participantIds", Arrays.asList(1L, 2L, 3L));

        // Mock the mapper method
        doNothing().when(eMapper).insertEventParticipants(1L, Arrays.asList(1L, 2L, 3L));

        // Call the controller method
        String result = mainController.saveEventParticipants(payload);

        // Verify the result
        assertEquals("Success", result);

        // Verify the mapper method was called
        verify(eMapper).insertEventParticipants(1L, Arrays.asList(1L, 2L, 3L));
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
        // Create an existing event with some default values
        Events existingEvent = new Events();
        existingEvent.setId(1L);
        existingEvent.setTitle("Test Event");
        existingEvent.setDescription("This is a test event.");
        existingEvent.setLocation("Test location");
        existingEvent.setColor("red");
        existingEvent.setStart(LocalDateTime.now());
        existingEvent.setEnd(LocalDateTime.now().plusHours(1));
        
        // Create an updated event with new values
        Events updatedEvent = new Events();
        updatedEvent.setTitle("Updated Test Event");
        updatedEvent.setDescription("This is an updated test event.");
        updatedEvent.setLocation("Updated Test location");
        updatedEvent.setColor("green");
        updatedEvent.setStart(LocalDateTime.now());
        updatedEvent.setEnd(LocalDateTime.now().plusHours(2));
        
        // Mock the getEventById() method to return the existing event
        when(eMapper.getEventById(existingEvent.getId())).thenReturn(existingEvent);
        
        // Call the updateEvent() method with the existing event's ID and the updated event
        ResponseEntity<?> response = mainController.updateEvent(existingEvent.getId(), updatedEvent);
        
        // Verify that the method returns a response entity with a status of 200 OK
        assertEquals(HttpStatus.OK, response.getStatusCode());
        
        // Verify that the existing event's properties were updated with the values from the updated event
        assertEquals(existingEvent.getTitle(), updatedEvent.getTitle());
        assertEquals(existingEvent.getDescription(), updatedEvent.getDescription());
        assertEquals(existingEvent.getLocation(), updatedEvent.getLocation());
        assertEquals(existingEvent.getColor(), updatedEvent.getColor());
        assertEquals(existingEvent.getStart(), updatedEvent.getStart());
        assertEquals(existingEvent.getEnd(), updatedEvent.getEnd());
        
        // Verify that the updatedEvent() method of the EventMapper class was called with the existing event to persist the changes to the database
        verify(eMapper, times(1)).updatedEvent(existingEvent);
    }



}
