package com.fitness.models;

import lombok.Data;
import lombok.experimental.SuperBuilder;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

@SuperBuilder
@Data
public class Error {
    private LocalDateTime timestamp;
    private String message;
    private HttpStatus status;

}
