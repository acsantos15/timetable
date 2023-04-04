// Aries
package com.tgsi.timetable.entity;

import java.util.List;

import org.apache.ibatis.type.Alias;

//Users database model
@Alias("users")
public class Users {
    
    private Long id;
    private String fname;
    private String lname;
    private String address;
    private String contact;
    private String username;
    private String email;
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
