package com.tgsi.timetable.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.tgsi.timetable.entity.Users;

@Mapper
public interface UserMapper {
    @Select("SELECT * FROM Users WHERE id = #{id}")
    Users getUserById(Long id);

    @Select("SELECT * FROM users")
    List<Users> getAllUser();

    @Select("SELECT * FROM Users WHERE username = #{username}")
    Users findByUsername(String username);

    @Select("SELECT * FROM Users WHERE email = #{email}")
    Users findByEmail(String email);

    @Insert("INSERT INTO users (fname, lname, address, contact, username, email, pass) VALUES (#{fname}, #{lname}, #{address}, #{contact}, #{username}, #{email}, #{pass})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    void insertUser(Users users);

    @Update("UPDATE users SET fname = #{fname}, lname = #{lname}, email = #{email}, pass = #{pass}")
    void updatedUser(Users event);
    
    @Delete("DELETE FROM users WHERE id = #{id}")
    void deleteUserById(Long id);
}
