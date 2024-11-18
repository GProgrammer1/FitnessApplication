import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { CustomResponse, Exercise } from '../models/interfaces';
import { HttpClient } from '@angular/common/http';
import { debounceTime, distinctUntilChanged, first, map, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExistsValidatorService {

  constructor(private http: HttpClient) { }

  exerciseExists(exercises: Exercise[], currentValue: string, userId: number, currentDate: string) : AsyncValidatorFn {
    return (control : AbstractControl)  => {

      if (!control.value || control.value === currentValue) {
        return Promise.resolve(null);
      }

      
      return control.valueChanges.pipe(
        debounceTime(500),  // Wait for user to stop typing
        distinctUntilChanged(),  // Only check if value changed
        switchMap(value => 
           {
          const exercise = exercises.find(exercise => exercise.name.toLowerCase() === value.toLowerCase());
          return exercise ? of({alreadyExists: true}) : of(null) ;
           }
          ),
        first()  // Complete after first emission
      );
    
    }
  }
}
