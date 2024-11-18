import { AsyncPipe, CommonModule, JsonPipe, NgOptimizedImage } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatOptionModule } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { Observable } from 'rxjs';
import { Exercise } from '../models/interfaces';
import { CommunicatorService } from '../communicator.service';
import { MatCardMdImage, MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExistsValidatorService } from '../Validators/exists-validator.service';
import { Dialog } from '@angular/cdk/dialog';


@Component({
  selector: 'app-add-exercise',
  standalone: true,
  imports: [AsyncPipe, CommonModule, JsonPipe, MatIconModule, NgOptimizedImage, MatOptionModule,
    MatSelectModule, MatDialogModule, MatCardModule,  MatInputModule, MatButtonModule
  , FormsModule, ReactiveFormsModule],
  templateUrl: './add-exercise.component.html',
  styleUrl: './add-exercise.component.css'
})
export class AddExerciseComponent {

  selectedValue: string = '' ;
  addForm:  FormGroup;

  constructor(private commService :  CommunicatorService,
    @Inject (MAT_DIALOG_DATA) public data : {exercises:  Exercise[], date: string},
    private fb: FormBuilder, private existsValidator:  ExistsValidatorService,
    private matdialogref : MatDialogRef<AddExerciseComponent>
  ){
    // this.exerciseNames$ = commService.exerciseNames$ ;
    this.addForm = this.fb.group({
      name : new FormControl<string>(this.selectedValue, {
        validators: Validators.required,
        asyncValidators: existsValidator.exerciseExists(data.exercises, this.selectedValue,
          parseInt(sessionStorage.getItem('userId')!), data.date
        ),
        nonNullable: true
      }),
      reps : new FormControl<number>(0, {
        
        nonNullable: true
      }),
      sets: new FormControl<number>(0, {
        
        nonNullable: true
      })
    });
  }

 signalNameChange() { 
  console.log("Name change signal fired!");
  console.log(this.selectedValue);
  
  
 }

  addExercise() {
    if (this.addForm.invalid) {
      return ;
    }
    console.log(this.data.date);
    
   const exercise : Exercise = {...this.addForm.getRawValue(), date: this.data.date, traineeId: parseInt(sessionStorage.getItem('id')!)} ;
   console.log(exercise);
   this.commService.addExercise(exercise) ;
   this.matdialogref.close(); 
   
   
  }

}
