package com.fitness.repositories;

import com.fitness.DTOs.ExerciseDTO;
import com.fitness.models.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ExerciseRepository extends JpaRepository<Exercise, Long> {

        List<Exercise> findAllByTraineeIdAndDate(Long id, LocalDate date);
}
