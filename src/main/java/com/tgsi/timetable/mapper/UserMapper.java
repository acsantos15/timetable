// Aries
package com.tgsi.timetable.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.tgsi.timetable.entity.Users;

@Mapper
public interface UserMapper {
    // Return users by id
    @Select("SELECT * FROM users WHERE id = #{id}")
    Users getUserById(Long id);

    // Return all users
    @Select("SELECT * FROM users")
    List<Users> getAllUser();

    // Return user by username
    @Select("SELECT * FROM users WHERE username = #{username}")
    Users findByUsername(String username);

    // Return user by email
    @Select("SELECT * FROM users WHERE email = #{email}")
    Users findByEmail(String email);

    // Insert user
    @Insert("INSERT INTO users (fname, lname, address, contact, username, email, pass) VALUES (#{fname}, #{lname}, #{address}, #{contact}, #{username}, #{email}, #{pass})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    void insertUser(Users users);

    // Update user
    @Update("UPDATE users SET fname = #{fname}, lname = #{lname}, email = #{email}, pass = #{pass}")
    void updatedUser(Users event);
    
    // Delete User
    @Delete("DELETE FROM users WHERE id = #{id}")
    void deleteUserById(Long id);

    // Return user by email and password (Login)
    @Select("SELECT * FROM users WHERE username = #{username} AND pass = #{pass}")
    Users findByUsernameAndPassword(@Param("username") String username, @Param("password") String password);

    // Search User Details
    @Select("SELECT * FROM users WHERE fname LIKE CONCAT('%',#{fname},'%') OR lname LIKE CONCAT('%',#{lname},'%') OR username LIKE CONCAT('%',#{username},'%')")
    List<Users> searchUser(String searchWord);
    
}
