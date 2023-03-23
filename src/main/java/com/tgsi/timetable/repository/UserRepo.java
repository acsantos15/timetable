package com.tgsi.timetable.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tgsi.timetable.Entity.User;

public interface UserRepo extends JpaRepository<User, Long> {
    User findByEmail(String email);
 }
 
