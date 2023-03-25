package com.tgsi.timetable.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tgsi.timetable.Entity.User;

public interface UserRepo extends JpaRepository<User, Long> {
    public boolean existsByEmail(String email);
 }
 
