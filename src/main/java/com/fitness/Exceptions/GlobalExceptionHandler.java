package com.fitness.Exceptions;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import com.fitness.models.Error ;


import java.time.LocalDateTime;

@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler{

  @ExceptionHandler(UserNotFoundException.class)
  public ResponseEntity<Error> handleUserNotFoundException(UserNotFoundException ex){
    System.out.println("exception occured");
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
            Error
                    .builder()
                    .timestamp(LocalDateTime.now())
                    .status(HttpStatus.BAD_REQUEST)
                    .message(ex.getMessage())
                    .build()
    );
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<Error> handleMethodArgumentNotValidException(MethodArgumentNotValidException ex){
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
            Error
                    .builder()
                    .timestamp(LocalDateTime.now())
                    .status(HttpStatus.BAD_REQUEST)
                    .message(ex.getMessage())
                    .build()
    );
  }

  @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
  public ResponseEntity<Error> handleHttpRequestMethodNotSupportedException(HttpRequestMethodNotSupportedException ex){
    log.info("exception occured");

    return ResponseEntity.status(HttpStatus.METHOD_NOT_ALLOWED).body(
            Error
                    .builder()
                    .timestamp(LocalDateTime.now())
                    .status(HttpStatus.METHOD_NOT_ALLOWED)
                    .message(ex.getMessage())
                    .build()
    );
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<Error> handleInternalServerError(Exception ex){
    ex.printStackTrace();
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
            Error
                    .builder()
                    .timestamp(LocalDateTime.now())
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .message(ex.toString())
                    .build()
    );
  }
}
