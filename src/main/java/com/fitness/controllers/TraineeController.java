package com.fitness.controllers;

import com.fitness.DTOs.TraineeDTO;
import com.fitness.models.Response;
import com.fitness.models.Trainee;
import com.fitness.services.TraineeServiceImpl;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;

@RequestMapping("/trainee")
@RestController
public class TraineeController {

    private final TraineeServiceImpl traineeService ;

    public TraineeController(TraineeServiceImpl traineeService) {
        this.traineeService = traineeService;
    }

    @GetMapping("/list")
    public ResponseEntity<Response> getTraineeList() {
        return ResponseEntity.ok(
                Response
                        .builder()
                        .timestamp(LocalDateTime.now())
                        .message("Trainees' list delivered successfully")
                        .status(HttpStatus.OK)
                        .data(Map.of("trainees", traineeService.getTraineeList() ))
                        .build()
        ) ;
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Response> getTraineeById(@PathVariable("id") Long id) {

        return ResponseEntity.ok(
                Response
                        .builder()
                        .timestamp(LocalDateTime.now())
                        .message("Trainee with id: " + id + " delivered successfully")
                        .status(HttpStatus.OK)
                        .data(Map.of("trainee", traineeService.getTraineeById(id) ))
                        .build()
        ) ;
    }

    @GetMapping("/get/email/{email}")
    public ResponseEntity<Response> getTraineeById(@PathVariable("email") String email) {

        return ResponseEntity.ok(
                Response
                        .builder()
                        .timestamp(LocalDateTime.now())
                        .message("Trainee with email: " + email + " delivered successfully")
                        .status(HttpStatus.OK)
                        .data(Map.of("trainee", traineeService.getTraineeByEmail(email) ))
                        .build()
        ) ;
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Response> deleteTraineeById(@PathVariable("id") Long id) {
        traineeService.deleteTraineeById(id);
        return ResponseEntity.ok(
                Response
                        .builder().
                        timestamp(LocalDateTime.now())
                        .status(HttpStatus.OK)
                        .data(Map.of("deleted", true ))
                        .message("User Deleted Successfully")
                        .build());
    }

    @PostMapping("/add")
    public ResponseEntity<Response> addTrainee(@RequestBody Trainee trainee) {
        ResponseEntity<Response> response = ResponseEntity.ok(
                Response
                        .builder()
                        .timestamp(LocalDateTime.now())
                        .status(HttpStatus.OK)
                        .data(Map.of("trainee",traineeService.addTrainee(trainee)))
                        .message("Trainee added successfully")
                        .build()
        );
        System.out.println(response);
        return response;
    }

}
