package com.tgsi.timetable.MainControllerTest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import com.tgsi.timetable.controller.MainController;
import com.tgsi.timetable.entity.Events;
import com.tgsi.timetable.entity.Users;
import com.tgsi.timetable.entity.WeatherData;
import com.tgsi.timetable.mapper.EventMapper;

import jakarta.servlet.http.HttpSession;

public class PageDataTest {

    @Mock
    private EventMapper eMapper;

    @InjectMocks
    private MainController mainController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testDashboard() {
        // Mock HttpSession and user
        HttpSession session = Mockito.mock(HttpSession.class);
        Users user = new Users();
        user.setId(1L);
        when(session.getAttribute("userSession")).thenReturn(user);

        // Mock the event list
        List<Events> allEvents = new ArrayList<>();
        Events event1 = new Events();
        event1.setId(1L);
        event1.setStart(LocalDateTime.now());
        allEvents.add(event1);
        Events event2 = new Events();
        event2.setId(2L);
        event2.setStart(LocalDateTime.now().plusDays(1));
        allEvents.add(event2);

        // Mock the getUserEvent method
        when(eMapper.getUserEvent(1L)).thenReturn(allEvents);

        // Mock the weather data
        WeatherData weatherData = new WeatherData();
        // Set weather data properties

        // Mock the RestTemplate call
        RestTemplate restTemplate = Mockito.mock(RestTemplate.class);
        when(restTemplate.getForObject(Mockito.anyString(), Mockito.eq(WeatherData.class))).thenReturn(weatherData);


        // Call the dashboard method
        ResponseEntity<Map<String, Object>> response = mainController.dashboard(session);

        // Verify the response
        assertEquals(HttpStatus.OK, response.getStatusCode());

        Map<String, Object> data = response.getBody();
        List<Events> todaysEvents = (List<Events>) data.get("today");
        List<Events> tomorrowsEvents = (List<Events>) data.get("tomorrow");

        // Verify the retrieved data
        assertEquals(1, todaysEvents.size());
        assertEquals(1L, todaysEvents.get(0).getId());
        assertEquals(1, tomorrowsEvents.size());
        assertEquals(2L, tomorrowsEvents.get(0).getId());
    }
}
