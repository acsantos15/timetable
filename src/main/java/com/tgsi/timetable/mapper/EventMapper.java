// Aries
package com.tgsi.timetable.mapper;

import java.time.LocalDateTime;
import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.tgsi.timetable.model.Events;
import com.tgsi.timetable.model.Locations;
import com.tgsi.timetable.model.Users;

@Mapper
public interface EventMapper {
    // Return events for today
    @Select("SELECT * FROM events WHERE start = #{today}")
    List<Events> todayEvent(@Param("today") LocalDateTime today);

    // Return events by id
    @Select("SELECT * FROM events WHERE id = #{id}")
    Events getEventById(Long id);

    // Return all events
    @Select("SELECT * FROM events")
    List<Events> getAllEvents();

    // Insert event
    @Insert("INSERT INTO events (title, description, links, location, start, end, color) VALUES (#{title}, #{description}, #{links}, #{location}, #{start}, #{end}, #{color})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    Long insertEvent(Events events);

    // Update event
    @Update("UPDATE events SET title = #{title}, description = #{description}, links = #{links}, location = #{location}, start = #{start}, end= #{end}, color= #{color} WHERE id = #{id}")
    void updatedEvent(Events event);
    
    // Delete event
    @Delete("DELETE FROM events WHERE id = #{id}")
    void deleteEventById(Long id);

    // Return users by event id
    @Select("SELECT users.id, users.fname, users.lname " +
    "FROM users " +
    "INNER JOIN user_event ON users.id = user_event.user_id " +
    "WHERE user_event.event_id = #{eventId}")
    @Results({
    @Result(property = "id", column = "id"),
    @Result(property = "fname", column = "fname"),
    @Result(property = "lname", column = "lname")
    })
    List<Users> getUsersByEventId(@Param("eventId") Long eventId);

    // Return events by user id
    @Select("SELECT * " +
    "FROM events " +
    "INNER JOIN user_event ON events.id = user_event.event_id " +
    "WHERE user_event.user_id = #{userid}")
    List<Events> getUserEvent(@Param("userid") Long userid);

    // Return events by user id string
    @Select("SELECT * " +
    "FROM events " +
    "INNER JOIN user_event ON events.id = user_event.event_id " +
    "WHERE user_event.user_id IN (#{userIds}) " +
    "AND events.start >= #{startTime} AND events.end <= #{endTime}")
    List<Events> getUserbyEventId(@Param("userIds") String userIds, @Param("startTime") LocalDateTime startTime, @Param("endTime") LocalDateTime endTime);

    // Insert participant to the event
    @Insert("<script>" +
    "INSERT INTO user_event (event_id, user_id) VALUES " +
    "<foreach item='participantId' collection='participantIds' separator=','>" +
    "(#{eventId}, #{participantId})" +
    "</foreach>" +
    "</script>")
    void insertEventParticipants(@Param("eventId") Long eventId, @Param("participantIds") List<Long> participantIds);

    // // Update participant
    @Delete("DELETE FROM user_event WHERE event_id = #{eventId}")
    void deleteParticipant(Long eventId);

    // List all locations
    @Select("SELECT * FROM locations")
    List<Locations> getAllLocations();
}