package com.tgsi.timetable.controllertest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.ui.ConcurrentModel;
import org.springframework.ui.Model;

import com.tgsi.timetable.controller.UserController;
import com.tgsi.timetable.entity.Events;
import com.tgsi.timetable.entity.Users;
import com.tgsi.timetable.mapper.EventMapper;
import com.tgsi.timetable.mapper.UserMapper;

import jakarta.servlet.http.HttpSession;

public class UserControllerTest {

    @Mock
    private UserMapper uMapper;

    @Mock
    private EventMapper eMapper;

    @Mock
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Mock
    private HttpSession session;

    @Mock
    private Model model;

    @InjectMocks
    private UserController userController;
    
    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    
    // Test Creating User
    @Test
    public void testSignUp() {
        // create a mock user
        Users user = new Users();
        user.setFname("testfname");
        user.setLname("testlname");
        user.setAddress("testaddress");
        user.setContact("testcontact");
        user.setUsername("testuser");
        user.setEmail("email@test.com");
        user.setPass("encodedpass");

        // mock the findByUsername method to return null, indicating that the username is not taken
        when(uMapper.findByUsername(user.getUsername())).thenReturn(null);
        
        // // mock the encode method to return the original password, as we are not testing the password encryption here
        when(bCryptPasswordEncoder.encode(user.getPass())).thenReturn(user.getPass());
        
        // call the signUp method

        // call the signUp() method
        ResponseEntity<?> responseEntity = userController.signUp(user);

        // check that the user was registered successfully
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals("User registered successfully.", responseEntity.getBody());

        // verify that the uMapper.insertUser() method was called with the correct argument
        ArgumentCaptor<Users> userCaptor = ArgumentCaptor.forClass(Users.class);
        verify(uMapper).insertUser(userCaptor.capture());
        Users capturedUser = userCaptor.getValue();
        assertNotNull(capturedUser);
        assertEquals(user.getFname(), capturedUser.getFname());
        assertEquals(user.getLname(), capturedUser.getLname());
        assertEquals(user.getAddress(), capturedUser.getAddress());
        assertEquals(user.getContact(), capturedUser.getContact());
        assertEquals(user.getUsername(), capturedUser.getUsername());
        assertEquals(user.getEmail(), capturedUser.getEmail());
        assertEquals(user.getPass(), capturedUser.getPass());
    }
    
    // Test Updating User
    // @Test
    // public void testUpdateEvent() {
    //     // create a mock user
    //     Users user = new Users();
    //     user.setFname("John");
    //     user.setLname("Doe");
    //     user.setAddress("123 Main St");
    //     user.setContact("555-1234");
    //     user.setUsername("johndoe");
    //     user.setEmail("johndoe@example.com");

    //     // id yo update
    //     Long userId = uMapper.insertUser(user);

    //     // create an updated event
    //     Users updatedUser = new Users();
    //     updatedUser.setFname("updatedfname");
    //     updatedUser.setLname("updatedlname");
    //     updatedUser.setAddress("updatedaddress");
    //     updatedUser.setContact("09123456789");
    //     updatedUser.setUsername("updatedusername");
    //     updatedUser.setEmail("updated@email.com");

    //     // call the updateEvent method
    //     ResponseEntity<?> responseEntity = userController.updateUser(userId, updatedUser);

    //     // check that the event was updated
    //     assertEquals(HttpStatus.OK, responseEntity.getStatusCode());

    //     // retrieve the event from the database and check that it matches the updated event
    //     Users updatedDbUser = uMapper.getUserById(userId);
    //     assertEquals(updatedUser.getFname(), updatedDbUser.getFname());
    //     assertEquals(updatedUser.getLname(), updatedDbUser.getLname());
    //     assertEquals(updatedUser.getAddress(), updatedDbUser.getAddress());
    //     assertEquals(updatedUser.getContact(), updatedDbUser.getContact());
    //     assertEquals(updatedUser.getUsername(), updatedDbUser.getUsername());
    //     assertEquals(updatedUser.getEmail(), updatedDbUser.getEmail());
    // }


    // Test search function
    @Test
    void testSearchUsers() {
        // create a mock user session
        HttpSession session = mock(HttpSession.class);
        Users loggedUser = new Users();
        loggedUser.setId(1L);
        loggedUser.setUsername("testuser");
        when(session.getAttribute("user")).thenReturn(loggedUser);

        // create mock data for users and events
        List<Users> users = Arrays.asList(new Users(), new Users());
        List<Events> events = Arrays.asList(new Events(), new Events());

        // mock user and event mappers
        when(uMapper.searchUser(anyString())).thenReturn(users);
        when(eMapper.getUserbyEventId(anyString(), any(LocalDateTime.class), any(LocalDateTime.class))).thenReturn(events);

        // call the searchUsers method
        String searchWord = "test";
        Model model = new ConcurrentModel();
        String result = userController.searchUsers(searchWord, model, session);

        // check that the method returns the correct view name
        assertEquals("searchresult", result);

        // check that the model contains the expected data
        assertTrue(model.containsAttribute("user"));
        assertEquals(loggedUser, model.getAttribute("user"));
        assertTrue(model.containsAttribute("users"));
        assertEquals(users, model.getAttribute("users"));
        assertTrue(model.containsAttribute("events"));
        assertEquals(events, model.getAttribute("events"));
    }

    
}
