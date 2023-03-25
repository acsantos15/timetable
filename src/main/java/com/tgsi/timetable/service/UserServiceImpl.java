package com.tgsi.timetable.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tgsi.timetable.Entity.User;
import com.tgsi.timetable.repository.UserRepo;


@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepo userRepo;

    @Override
    public User createUser(User user) {

        return userRepo.save(user);
    }

    @Override
    public boolean checkEmail(String email) {
        
        return userRepo.existsByEmail(email);
    }

    
    
}
