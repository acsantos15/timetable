//Aries
package com.tgsi.timetable.entity;

import java.time.LocalDateTime;
import java.util.List;

import org.apache.ibatis.type.Alias;
import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;


//Event database model
@Alias("events")
public class Events {
    
  
  private Long id;
  
  @NotBlank
  @Size(max = 100)
  private String title;
  
  @NotBlank
  @Size(max = 100)
  private String description;
  
  @NotBlank
  @Size(max = 100)
  private String location;

  @NotBlank
  @Size(max = 15)
  private String color;
  
  private List<Users> people;
  
  @NotNull
  @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
  private LocalDateTime start;
  
  @NotNull
  @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
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

      public String getColor() {
        return color;
      }
    
      public void setColor(String color) {
        this.color = color;
      }

      public List<Users> getPeople() {
        return people;
      }
    
      public void setPeople(List<Users> people) {
        this.people = people;
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
