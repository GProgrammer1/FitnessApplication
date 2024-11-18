import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, EMPTY, Observable, of, switchMap, tap } from 'rxjs';
import { DataService } from './data.service';
import { Exercise } from './models/interfaces';


@Injectable({
  providedIn: 'root'
})
export class CommunicatorService {
  deleteExercise(exerciseId: number) {
    this.dataService.deleteExercise(exerciseId).subscribe(
      {
        next: response => {
          const deleted : Boolean = response.data.deleted ;
          if (deleted) {
            this.exercisesSubject.next(this.exercisesSubject.value!.filter(exercise => exercise.id !== exerciseId));
          };
        },
        error: err => {
          console.error("Error deleting exercise: ", err);
          
        }
      }
    )
  }

  addExercise(exercise: Exercise) {
    const id = exercise.id ;
    this.dataService.saveExercise(exercise).subscribe(
      {
        next: (response) => {
          const exercise = response.data.exercise ;
          if (exercise.id !== id) {
            this.exercisesSubject.next([...this.exercisesSubject.value!, exercise]);
          }
          
        },
        error: err => {
          this.exercisesSubject.next(null) ;
          console.error("Error adding exercise: ", err);
        }
      }
    )
  }

  exercisesSubject = new BehaviorSubject<Exercise[] | null>(null); 
  exercises$ = this.exercisesSubject.asObservable() ;
  selectedDateSubject!: BehaviorSubject<string> ;
  selectedDate$! : Observable<string> ;

  constructor(private dataService: DataService) {
    this.selectedDateSubject = new BehaviorSubject<string>(this.getCurrentDateAsString()) ;
    this.selectedDate$ = this.selectedDateSubject.asObservable();
    this.loadworkout(); 
  }
  

  signalchange(date: string) {
    this.selectedDateSubject.next(date) ;
    this.loadworkout() ;
  }

  private getCurrentDateAsString(): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  loadworkout() {
    const email : string = this.dataService.getUser() ;
    console.log(email);
    
    this.dataService.getUserByEmail(email).pipe(
      switchMap( response1 => {
        const id = response1.data.trainee.id!; 
        console.log(id);
        
        return this.dataService.getExercisesByTraineeIdAndDate(id, this.selectedDateSubject.value!); 
      }),
      tap (response4 => {
        const exercises = response4.data.exercises ;
        console.log(exercises);
        
        this.exercisesSubject.next(exercises) ;

      }),
      catchError(err => {
        this.exercisesSubject.next(null) ;
        console.log("Error: ", err);
        
        return of(null) ;
      })
    ).subscribe(
      
      {
        next: response => console.log(response),
        
        error : err => {
          console.error("Error: ", err);
          
        }
      }
    );
    
  }

  get dataservice() {
    return this.dataService; 
  }
  
}