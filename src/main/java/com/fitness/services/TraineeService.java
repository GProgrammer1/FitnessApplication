package com.fitness.services;

import com.fitness.DTOs.TraineeDTO;
import com.fitness.Exceptions.UserNotFoundException;
import com.fitness.models.Trainee;
import com.fitness.repositories.TraineeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TraineeService implements TraineeServiceImpl {

    private final TraineeRepository traineeRepository;

    public TraineeService(TraineeRepository traineeRepository) {
        this.traineeRepository = traineeRepository;
    }

    @Override
    public List<Trainee> getTraineeList() {
        return traineeRepository.findAll();
    }

    @Override
    public Trainee getTraineeById(Long id) {


        return traineeRepository.findById(id).orElseThrow(
                () -> new UserNotFoundException("Trainee with id: " + id + " not found"));
    }


    @Override
    public Boolean deleteTraineeById(Long id) {
        traineeRepository.deleteById(id);
        return true;
    }

    @Override
    public Trainee addTrainee(Trainee trainee) {

        return traineeRepository.save(trainee);

    }

    @Override
    public Trainee getTraineeByEmail(String email) {
        return traineeRepository.findByEmail(email).orElseThrow(
                () -> new UserNotFoundException("Trainee with email: " + email + " not found")
        );
    }
}
