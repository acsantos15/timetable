package com.tgsi.timetable.Entity;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

//event database model
@Entity
@Table(name = "events")
public class Events {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "title")
    private String title;
    
    @Column(name = "description")
    private String description;

    @Column(name = "location")
    private String location;
    
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    @Column(name = "start")
    private LocalDateTime start;
    
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    @Column(name = "end")
    private LocalDateTime end;


    // getters and setters

      public Long getId() {
        return id;
      }
    
      public void setId(Long id) {
        this.id = id;
      }
    
      public String getTitle() {
        return title;
      }
    
      public void setTitle(String title) {
        this.title = title;
      }
    
      public String getDescription() {
        return description;
      }
    
      public void setDescription(String description) {
        this.description = description;
      }

      public String getLocation() {
        return location;
      }
    
      public void setLocation(String location) {
        this.location = location;
      }

      public LocalDateTime getStart() {
        return start;
      }
    
      public void setStart(LocalDateTime start) {
        this.start = start;
      }

      public LocalDateTime getEnd() {
        return end;
      }
    
      public void setEnd(LocalDateTime end) {
        this.end = end;
      }

}
