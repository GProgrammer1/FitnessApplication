package com.fitness.DTOs;

import com.fitness.models.Exercise;
import lombok.Data;

import java.time.LocalDate;

@Data
public class ExerciseDTO {

    private Long id;
    private String name;
    private int sets;
    private int reps ;
    private Long traineeId;
    private LocalDate date;

    public Exercise mapToExercise() {
        Exercise exercise = new Exercise();
        exercise.setSets(sets);
        exercise.setName(name);
        exercise.setId(id);
        exercise.setReps(reps);
        exercise.setDate(date);
        return exercise;
    }
}
