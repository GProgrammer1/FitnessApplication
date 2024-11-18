package com.fitness.services;

import com.fitness.DTOs.ExerciseDTO;
import com.fitness.models.Exercise;
import jakarta.validation.Valid;

import java.time.LocalDate;
import java.util.List;

public interface ExerciseServiceImpl {
    List<ExerciseDTO> getExerciseList();

    ExerciseDTO saveExercise(ExerciseDTO exercise);

    List<ExerciseDTO> getExercisesByTraineeIdAndDate(Long id, LocalDate date);

    Boolean deleteExercise(Long id);
}
