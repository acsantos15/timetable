package com.tgsi.timetable.entity;

import java.util.List;

public class WeatherData {
  private MainData main;
  private WindData wind;
  private List<WeatherDescription> weather;
  // add any other properties you want to include in the JSON response

  public MainData getMain() {
      return main;
  }

  public void setMain(MainData main) {
      this.main = main;
  }

  public WindData getWind() {
      return wind;
  }

  public void setWind(WindData wind) {
      this.wind = wind;
  }

  public List<WeatherDescription> getWeather() {
      return weather;
  }

  public void setWeather(List<WeatherDescription> weather) {
      this.weather = weather;
  }

  // add any other getters/setters for additional properties

  public static class MainData {
      private double temp;
      private int humidity;

      public double getTemp() {
          return temp;
      }

      public void setTemp(double temp) {
          this.temp = temp;
      }

      public int getHumidity() {
          return humidity;
      }

      public void setHumidity(int humidity) {
          this.humidity = humidity;
      }
  }

  public static class WindData {
      private double speed;

      public double getSpeed() {
          return speed;
      }

      public void setSpeed(double speed) {
          this.speed = speed;
      }
  }

  public static class WeatherDescription {
      private String main;
      private String description;

      public String getMain() {
          return main;
      }

      public void setMain(String main) {
          this.main = main;
      }

      public String getDescription() {
          return description;
      }

      public void setDescription(String description) {
          this.description = description;
      }
  }
}
