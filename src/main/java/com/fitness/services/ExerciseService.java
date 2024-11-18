package com.fitness.services;

import com.fitness.DTOs.ExerciseDTO;
import com.fitness.models.Exercise;
import com.fitness.models.Trainee;
import com.fitness.repositories.ExerciseRepository;
import com.fitness.repositories.TraineeRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ExerciseService implements ExerciseServiceImpl {

    private final ExerciseRepository exerciseRepository;
    private final TraineeRepository traineeRepository;

    public ExerciseService(ExerciseRepository exerciseRepository, TraineeRepository traineeRepository) {
        this.exerciseRepository = exerciseRepository;
        this.traineeRepository = traineeRepository;
    }
    @Override
    public List<ExerciseDTO> getExerciseList() {

        List<Exercise> exercises =  exerciseRepository.findAll();
        return exercises.stream()
                .map(Exercise::mapToDTO).toList();
    }

    @Override
    public ExerciseDTO saveExercise(ExerciseDTO exercise) {
        Exercise exercise1 = exercise.mapToExercise() ;
        System.out.println(exercise.getId());
        Trainee trainee = traineeRepository.findById(exercise.getTraineeId()).orElseThrow(
                () -> new RuntimeException("Trainee not found")
        );
        exercise1.setTrainee(trainee);
        exerciseRepository.save(exercise1);
        return exercise1.mapToDTO();
    }

    @Override
    public List<ExerciseDTO> getExercisesByTraineeIdAndDate(Long id, LocalDate date) {

        List<Exercise> exercises = exerciseRepository.findAllByTraineeIdAndDate(id, date);
        return exercises.stream().map(Exercise::mapToDTO).toList();
    }

    @Override
    public Boolean deleteExercise(Long id) {
        exerciseRepository.deleteById(id);
        return true;
    }


}
