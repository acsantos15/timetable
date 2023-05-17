package com.tgsi.timetable.MainControllerTest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.tgsi.timetable.controller.MainController;
import com.tgsi.timetable.mapper.EventMapper;
import com.tgsi.timetable.model.Events;

public class EventCrudTest {

    @Mock
    private EventMapper eMapper;

    @InjectMocks
    private MainController mainController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }
    
    // Test Saving of event
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

        // Call the saveEventParticipants method
        ResponseEntity<Map<String, String>> response = mainController.saveEventParticipants(payload);

        // Verify the response
        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Success", response.getBody().get("message"));

        // Verify that the eMapper.insertEventParticipants method was called with the correct arguments
        verify(eMapper).insertEventParticipants(1L, Arrays.asList(1L, 2L, 3L));
    }

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

}
