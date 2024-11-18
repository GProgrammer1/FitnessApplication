package com.fitness.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fitness.DTOs.ExerciseDTO;
import jakarta.persistence.*;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;
import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor

public class Exercise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id ;

    private int reps ;

    private int sets ;

    @NotNull
    private String name ;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trainee_id")
    @JsonBackReference
    private Trainee trainee;



    @NotNull
    @FutureOrPresent(message = "Future or present date required")
    private LocalDate date;


    public ExerciseDTO mapToDTO() {
        ExerciseDTO dto = new ExerciseDTO();
        dto.setId(id);
        dto.setReps(this.reps);
        dto.setSets(this.sets);
        dto.setName(name);
        dto.setTraineeId(trainee.getId());
        dto.setDate(date);
        return dto;
    }

}
