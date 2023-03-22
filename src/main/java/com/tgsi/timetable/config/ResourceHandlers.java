package com.tgsi.timetable.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


// Config to use static files
@Configuration
@EnableWebMvc
public class ResourceHandlers implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

    registry.addResourceHandler("/css/**").addResourceLocations("classpath:/static/css/");
    registry.addResourceHandler("/js/**").addResourceLocations("classpath:/static/js/");
    
    }
}
