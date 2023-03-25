package com.tgsi.timetable.repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tgsi.timetable.Entity.Events;

public interface EventRepo extends JpaRepository<Events, Long>{
    void deleteById(Long id);

    void save(Optional<Events> existingEvent);
}