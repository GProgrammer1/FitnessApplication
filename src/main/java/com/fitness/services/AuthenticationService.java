package com.fitness.services;

import com.fitness.Authentication.AuthenticationRequest;
import com.fitness.Authentication.RegistrationRequest;
import com.fitness.SecurityConfiguration.JWTService;
import com.fitness.models.Role;
import com.fitness.models.Trainee;
import com.fitness.repositories.TraineeRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final JWTService jwtService;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final TraineeRepository traineeRepository;

    public String authenticate(AuthenticationRequest authenticationRequest, HttpServletResponse response) {
        authenticationManager.authenticate(//provided the provider with the means to extract the username from the db
                new UsernamePasswordAuthenticationToken(
                        authenticationRequest.getEmail(), authenticationRequest.getPassword()
                )
        );
        Trainee trainee = traineeRepository.findByEmail(authenticationRequest.getEmail()).orElseThrow(()->new UsernameNotFoundException("Trainee not found"));
        String token = jwtService.generateToken(trainee);


        return token;

    }

//    private void addTokenToCookie(HttpServletResponse response, String token) {
//        Cookie cookie = new Cookie("JWT", token);
//        cookie.setPath("/");
//        cookie.setHttpOnly(true);
//        cookie.setMaxAge(24*60*60);
//
//        response.addCookie(cookie);
//        response.setHeader("Set-Cookie", "JWT=" + token + "; Path=/; HttpOnly; Max-Age=86400; Secure; SameSite=None");
//    }

    public String register(RegistrationRequest registrationRequest, HttpServletResponse response) {

        Trainee trainee = Trainee
                                .builder()
                .name(registrationRequest.getName())
                .email(registrationRequest.getEmail())
                .role(Role.USER)
                .password(passwordEncoder.encode(registrationRequest.getPassword()))
                .build();

        traineeRepository.save(trainee);
        String token = jwtService.generateToken(trainee);

        return token ;


    }
}
