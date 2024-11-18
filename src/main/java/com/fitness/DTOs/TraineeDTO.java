package com.fitness.DTOs;

import com.fitness.models.Trainee;
import lombok.Data;

import java.util.List;

@Data
public class TraineeDTO {

    private Long id;
    private String name;


    public Trainee mapToTrainee() {
        Trainee t = new Trainee();
        t.setName(name);
        return t;
    }

}
