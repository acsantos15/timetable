// Aries
package com.tgsi.timetable.entity;

import java.util.List;

import org.apache.ibatis.type.Alias;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

//Users database model
@Alias("users")
public class Users {
    
    private Long id;

    @NotBlank
    @Size(max = 50)
    private String fname;

    @NotBlank
    @Size(max = 50)
    private String lname;

    @NotBlank
    @Size(max = 100)
    private String address;

    @NotBlank
    @Size(max = 11)
    private String contact;

    @NotBlank
    @Size(max = 50)
    private String username;

    @NotBlank
    @Size(max = 50)
    private String email;

    @NotBlank
    @Size(max = 100)
    private String password;
    private List<Events> events;


    // getters and setters

      public Long getId() {
        return id;
      }
    
      public void setId(Long id) {
        this.id = id;
      }
    
      public String getFname() {
        return fname;
      }
    
      public void setFname(String fname) {
        this.fname = fname;
      }
    
      public String getLname() {
        return lname;
      }
    
      public void setLname(String lname) {
        this.lname = lname;
      }

      public String getAddress() {
        return address;
      }
    
      public void setAddress(String address) {
        this.address = address;
      }

      public String getContact() {
        return contact;
      }
    
      public void setContact(String contact) {
        this.contact = contact;
      }

      public String getUsername() {
        return username;
      }
    
      public void setUsername(String username) {
        this.username = username;
      }

      public String getEmail() {
        return email;
      }
    
      public void setEmail(String email) {
        this.email = email;
      }

      public String getPass() {
        return password;
      }
    
      public void setPass(String password) {
        this.password = password;
      }

      public List<Events> getEvents() {
        return events;
      }
    
      public void setEvents(List<Events> events) {
        this.events = events;
      }

    public static Object withDefaultPasswordEncoder() {
        return null;
    }


}
