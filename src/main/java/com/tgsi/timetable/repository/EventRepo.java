package com.tgsi.timetable.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.tgsi.timetable.Entity.Events;

public interface EventRepo extends JpaRepository<Events, Long>{
}