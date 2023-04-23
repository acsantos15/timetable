package com.tgsi.timetable.controllertest;


import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.anyString;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.ui.Model;

import com.tgsi.timetable.controller.UserController;
import com.tgsi.timetable.entity.Users;
import com.tgsi.timetable.mapper.UserMapper;

import jakarta.servlet.http.HttpSession;

public class LoginTest {

    @Mock
    private UserMapper uMapper;

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
    
    // Test if user have a valid user
    @Test
    public void testLogin_ValidCredentials() {
        // Arrange
        String username = "testuser";
        String password = "testpass";
        String hashedPassword = "hashedtestpass";
        Users user = new Users();
        user.setUsername(username);
        user.setPass(hashedPassword);
        when(uMapper.findByUsername(username)).thenReturn(user);
        when(bCryptPasswordEncoder.matches(password, hashedPassword)).thenReturn(true);

        // Act
        String result = userController.login(username, password, session, model);

        // Assert
        verify(session).setAttribute("user", user);
        verify(model).addAttribute("success", "Login Successfully");
        assertEquals("redirect:/dashboard", result);
    }

    // test if user input wrong credentials
    @Test
    public void testLogin_InvalidCredentials() {
        // Arrange
        String username = "testuser";
        String password = "testpass";
        String hashedPassword = "hashedtestpass";
        Users user = new Users();
        user.setUsername(username);
        user.setPass(hashedPassword);
        when(uMapper.findByUsername(anyString())).thenReturn(null);
        when(bCryptPasswordEncoder.matches(password, hashedPassword)).thenReturn(false);

        // Act
        String result = userController.login(username, password, session, model);

        // Assert
        verify(model).addAttribute("error", "Invalid username or password");
        assertEquals("login", result);
    }
}
