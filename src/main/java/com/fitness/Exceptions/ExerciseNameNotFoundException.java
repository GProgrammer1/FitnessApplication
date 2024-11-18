package com.fitness.Exceptions;

public class ExerciseNameNotFoundException extends RuntimeException {
    public ExerciseNameNotFoundException(String message) {
        super(message);
    }
}
