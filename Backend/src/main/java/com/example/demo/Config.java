package com.example.demo;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class Config implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")               // Allow CORS for all endpoints
                .allowedOrigins("http://localhost:5173") // Allow specific front-end origin (replace with your front-end URL)
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Allow only specific HTTP methods
                .allowedHeaders("*")           // Allow all headers
                .allowCredentials(true)        // Allow cookies (if needed)
                .maxAge(3600);                  // Cache pre-flight request for 1 hour
    }
}