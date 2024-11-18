import { Component, ElementRef, OnInit, TrackByFunction, ViewChild } from '@angular/core';
import { concatMap, map, Observable, tap } from 'rxjs';
import { CommunicatorService } from '../communicator.service';
import { Exercise } from '../models/interfaces';
import { AsyncPipe, CommonModule, JsonPipe, NgOptimizedImage } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AddExerciseComponent } from '../add-exercise/add-exercise.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-workout',
  standalone: true,
  imports: [AsyncPipe, CommonModule,
     JsonPipe, MatIconModule,
      MatButtonModule, NgOptimizedImage,
       MatOptionModule, MatSelectModule, MatInputModule, MatDialogModule],
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css']
})
export class WorkoutComponent {
  exercises$: Observable<Exercise[] | null>;
  allowedEdit = false;

  @ViewChild('exerciseBox') exerciseBox! : ElementRef<HTMLDivElement> ;

  constructor(
    private commService: CommunicatorService,
    private matDialog: MatDialog
  
  ) {
    this.exercises$ = this.commService.exercises$;
  }

  openDialog() {
    const exercises = this.commService.exercisesSubject.value;
    console.log(exercises);

    this.matDialog.open(AddExerciseComponent, {
      data: {
        exercises: exercises,
        date: this.commService.selectedDateSubject.value
      }
    });
  }

  allowEdit() {
    this.allowedEdit = true;
    this.exerciseBox.nativeElement.focus() ;
  }

  save(exercise: Exercise) {
    console.log(exercise.id);
    this.commService.addExercise(exercise);
    this.allowedEdit = false; // Disable edit mode after saving
  }

  increment(exercise: Exercise, type: 'sets' | 'reps') {
    if (this.allowedEdit) {
      exercise[type]++;
    }
  }

  decrement(exercise: Exercise, type: 'sets' | 'reps') {
    if (this.allowedEdit && exercise[type] > 0) {
      exercise[type]--;
    }
  }

  deleteExercise(exerciseId: number) {
    const dialogRef = this.matDialog.open(DeleteConfirmationComponent) ;

    dialogRef.afterClosed().subscribe(deleted => {
      if (deleted){
        this.commService.deleteExercise(exerciseId);
      }
    });
    
  }
}
