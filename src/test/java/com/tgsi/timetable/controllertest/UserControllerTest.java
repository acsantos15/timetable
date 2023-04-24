package com.tgsi.timetable.controllertest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
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

    @Test
    void testSignUpWithValidUser() {
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
        
        // mock the encode method to return the original password
        when(bCryptPasswordEncoder.encode(user.getPass())).thenReturn(user.getPass());

        ResponseEntity<?> response = userController.signUp(user);

        verify(uMapper).insertUser(user);
        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
    }

    @Test
    void testSignUpWithExistingUsername() {
        Users user = new Users();
        user.setFname("testfname");
        user.setLname("testlname");
        user.setAddress("testaddress");
        user.setContact("testcontact");
        user.setUsername("testuser");
        user.setEmail("email@test.com");
        user.setPass("encodedpass");

        when(uMapper.findByUsername(user.getUsername())).thenReturn(user);

        ResponseEntity<?> response = userController.signUp(user);

        verify(uMapper, never()).insertUser(user);
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Username is already taken.", response.getBody());
    }

    // Test Update User
    @Test
    public void testUpdateUser() {
        // Create a test user object
        Users testUser = new Users();
        testUser.setId(1L);
        testUser.setFname("John");
        testUser.setLname("Doe");
        testUser.setAddress("123 Main St");
        testUser.setContact("555-1234");
        testUser.setUsername("johndoe");
        testUser.setEmail("johndoe@example.com");

        // Mock the UserMapper's getUserById method to return the test user
        when(uMapper.getUserById(1L)).thenReturn(testUser);

        // Create an updated user object with a new username
        Users updatedUser = new Users();
        updatedUser.setId(1L);
        updatedUser.setFname("Jane");
        updatedUser.setLname("Doe");
        updatedUser.setAddress("123 Main St");
        updatedUser.setContact("555-1234");
        updatedUser.setUsername("janedoe");
        updatedUser.setEmail("janedoe@example.com");

        // Mock the UserMapper's findByUsername method to return null (no user with the new username exists yet)
        when(uMapper.findByUsername("janedoe")).thenReturn(null);

        // Call the updateUser method with the test user ID and the updated user object
        ResponseEntity<?> responseEntity = userController.updateUser(1L, updatedUser);


        // Verify that the updateUser method returned a ResponseEntity with an OK status code and the updated user object
        assertEquals(200, responseEntity.getStatusCodeValue());
    }


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