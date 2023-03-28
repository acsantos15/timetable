package com.tgsi.timetable.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User {
     
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "firstname")
    private String firstname;
    
    @Column(name = "lastname")
    private String lastname;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;
    

    // getters and setters

      public Long getId() {
        return id;
      }
    
      public void setId(Long id) {
        this.id = id;
      }
    
      public String getFname() {
        return firstname;
      }
    
      public void setFname(String firstname) {
        this.firstname = firstname;
      }
    
      public String getLname() {
        return lastname;
      }
    
      public void setLname(String lastname) {
        this.lastname = lastname;
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

}
// @Entity
// @Table(name = "users")
// public class User {

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     @Column(nullable = false)
//     private String fname;

//     @Column(nullable = false)
//     private String lname;

//     @Column(nullable = false)
//     private String address;

//     @Column(nullable = false)
//     private String contact;
    
//     @Column(unique = true, nullable = false)
//     private String username;

//     @Column(unique = true, nullable = false)
//     private String email;

//     @Column(nullable = false)
//     private String password;


//     public Long getId() {
//         return id;
//     }

//     public void setId(Long id) {
//         this.id = id;
//     }
    
//     public String getFname() {
//         return fname;
//     }
//     public void setFname(String fname) {
//         this.fname = fname;
//     }

//     public String getLname() {
//         return lname;
//     }

//     public void setLname(String lname) {
//         this.lname = lname;
//     }

//     public String getAddress() {
//         return address;
//     }

//     public void setAddress(String address) {
//         this.address = address;
//     }

//     public String getContact() {
//         return contact;
//     }

//     public void setContact(String contact) {
//         this.contact = contact;
//     }

//     public String getUser() {
//         return username;
//     }

//     public void setUser(String username) {
//         this.username = username;
//     }

//     public String getEmail() {
//         return email;
//     }

//     public void setEmail(String email) {
//         this.email = email;
//     }

//     public String getPass() {
//         return password;
//     }

//     public void setPass(String password) {
//         this.password = password;
//     }

// }
