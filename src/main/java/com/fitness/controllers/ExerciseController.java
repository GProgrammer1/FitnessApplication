package com.fitness.controllers;

import com.fitness.DTOs.ExerciseDTO;
import com.fitness.models.Exercise;
import com.fitness.models.Response;
import com.fitness.services.ExerciseServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/exercise")
public class ExerciseController {

    private final ExerciseServiceImpl exerciseService;

    public ExerciseController(ExerciseServiceImpl exerciseService) {
        this.exerciseService = exerciseService;
    }
    @GetMapping("/list")
    public ResponseEntity<Response> getExerciseList() {
        return ResponseEntity.ok(
                Response
                        .builder()
                        .timestamp(LocalDateTime.now())
                        .status(HttpStatus.OK)
                        .data(Map.of("exercises", exerciseService.getExerciseList()))
                        .message("Exercises retrieved successfully")
                        .build()

        );
    }

    @PostMapping("/save")
    public ResponseEntity<Response> saveExercise(@RequestBody ExerciseDTO exercise) {
        return ResponseEntity.ok(
                Response
                        .builder()
                        .timestamp(LocalDateTime.now())
                        .data(Map.of(("exercise"), exerciseService.saveExercise(exercise)))
                        .status(HttpStatus.OK)
                        .message("Exercise saved successfully")
                        .build()
        );
    }

    @GetMapping("/getbydate/{id}")
    public ResponseEntity<Response> getExercisesByTIdAndDate(@PathVariable("id") Long id,
                                                           LocalDate date) {
        return ResponseEntity.ok(
                Response
                        .builder()
                        .timestamp(LocalDateTime.now())
                        .data(Map.of("exercises", exerciseService.getExercisesByTraineeIdAndDate(id, date)))
                        .status(HttpStatus.OK)
                        .message("Exercise fetched successfully")
                        .build()
        );
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Response> deleteExercise(@PathVariable("id") Long id) {
        return ResponseEntity.ok(
                Response
                        .builder()
                        .timestamp(LocalDateTime.now())
                        .data(Map.of("deleted", exerciseService.deleteExercise(id)))
                        .status(HttpStatus.OK)
                        .message("Exercise deleted successfully")
                        .build()


        );

    }

}
