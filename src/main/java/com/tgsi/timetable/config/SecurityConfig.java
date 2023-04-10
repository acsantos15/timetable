// package com.tgsi.timetable.config;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.core.userdetails.User;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.security.web.SecurityFilterChain;
// import org.springframework.stereotype.Component;

// @Component
// @Configuration
// public class SecurityConfig {

//     @Bean
//     public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//         http
//                 .authorizeHttpRequests(requests -> requests
//                         .requestMatchers(PathRequest.toStaticResources().atCommonLocations()).permitAll() // Allow access to static resources
//                         .requestMatchers("/", "/signup").permitAll() // Allow access to the home page and signup page
//                         .anyRequest().authenticated())
//                 .formLogin(login -> login
//                         .loginPage("/login") // Use custom login page
//                         .permitAll())
//                 .logout(logout -> logout
//                         .permitAll());

//         return http.build();
//     }

//     @Autowired
//     public void configure(AuthenticationManagerBuilder auth, BCryptPasswordEncoder bCryptPasswordEncoder) throws Exception {
//         auth.inMemoryAuthentication()
//             .withUser(User.withUsername("user")
//             .password(bCryptPasswordEncoder.encode("password")));
//     }
// }
// @Component
// @Configuration
// public class SecurityConfig {

//     @Bean
//     public BCryptPasswordEncoder bCryptPasswordEncoder() {
//         return new BCryptPasswordEncoder();
//     }

//     @Bean
//     public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//         http
//             .authorizeRequests()
//                 .requestMatchers("/", "/signup").permitAll()
//                 .anyRequest().authenticated()
//                 .and()
//             .formLogin()
//                 .loginPage("/login")
//                 .and()
//             .logout()
//                 .permitAll();

//         return http.build();
//     }

//     protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//         auth.inMemoryAuthentication()
//             .withUser(User.withUsername("user")
//             .password(bCryptPasswordEncoder().encode("password"))
//             .build());
//     }
// }

