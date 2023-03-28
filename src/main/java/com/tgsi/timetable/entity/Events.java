//Aries
package com.tgsi.timetable.entity;

import java.time.LocalDateTime;
import org.apache.ibatis.type.Alias;
import com.fasterxml.jackson.annotation.JsonFormat;


//Event database model
@Alias("events")
public class Events {
    
    private Long id;
    
    private String title;
    
    private String description;

    private String location;
    
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private LocalDateTime start;
    
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
