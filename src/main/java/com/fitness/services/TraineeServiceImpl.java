package com.fitness.services;

import com.fitness.DTOs.TraineeDTO;
import com.fitness.models.Trainee;

import java.util.List;
import java.util.Optional;


public interface TraineeServiceImpl {
    List<Trainee> getTraineeList() ;

    Trainee getTraineeById(Long id);

    Boolean deleteTraineeById(Long id);

    Trainee addTrainee(Trainee trainee);

    Trainee getTraineeByEmail(String email);
}
