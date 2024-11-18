package com.fitness.models;

import lombok.Data;
import lombok.experimental.SuperBuilder;
import org.springframework.http.HttpStatus;


import java.time.LocalDateTime;
import java.util.Map;

@SuperBuilder
@Data
public class Response {

    private LocalDateTime timestamp ;
    private String message;
    private HttpStatus status;
    private Map<?, ?> data;

}
