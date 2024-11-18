package com.fitness.controllers;

import com.fitness.Authentication.AuthenticationRequest ;
import com.fitness.services.AuthenticationService;
import com.fitness.Authentication.RegistrationRequest;
import com.fitness.models.Response;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin("http://localhost:4200")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/authenticate")
    public ResponseEntity<Response> authenticate (@RequestBody AuthenticationRequest authenticationRequest,
                                                  HttpServletResponse response) {

        return ResponseEntity.ok(
                Response
                        .builder()
                        .timestamp(LocalDateTime.now())
                        .status(HttpStatus.OK)
                        .data(Map.of("token", authenticationService.authenticate( authenticationRequest, response )))
                        .message("Login Successful")
                        .build()
        ) ;
    }

    @PostMapping("/register")
    public ResponseEntity<Response> register(@RequestBody RegistrationRequest registrationRequest,
                                             HttpServletResponse response) {


        return ResponseEntity.ok(
                Response
                        .builder()
                        .timestamp(LocalDateTime.now())
                        .status(HttpStatus.OK)
                        .data(Map.of("token", authenticationService.register(registrationRequest, response)))
                        .message("Successfully registered")
                        .build()
        );
    }
}
