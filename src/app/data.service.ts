import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomResponse, Exercise, Trainee  } from './models/interfaces';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './env';
import * as JWT from 'jwt-decode'

interface JwtPayload {
  sub: string; // Username or subject claim
  // Other fields in your JWT, if needed
}
@Injectable({
  providedIn: 'root'
})

export class DataService {
  deleteExercise(exerciseId: number) {
    return this.http.delete<CustomResponse<{deleted: Boolean }>>(`${this.exerciseUrl}/delete/${exerciseId}`);
  }

  constructor(private http : HttpClient) { }

  exerciseUrl = `${environment}/exercise` ;
  traineeUrl = `${environment}/trainee` ;
  exerciseNameUrl = `${environment}/exerciseName` ;

  getUser() : string {
    const token : string = sessionStorage.getItem('token')!;
    const decodedToken = JWT.jwtDecode<JwtPayload>(token) ;
    return decodedToken.sub ;
  }

  getUserByEmail(email: string) : Observable<CustomResponse<{trainee: Trainee}>> {
    return this.http.get<CustomResponse<{trainee: Trainee}>>(`${this.traineeUrl}/get/email/${email}`) ;
  }

  getExerciseByDateAndId(date: string, id: string) {
    return this.http.get<CustomResponse<{trainee: Trainee}>>(`${this.exerciseUrl}/get/${id}`) ;
  }

  saveExercise(exercise : Exercise)  {
    return this.http.post<CustomResponse<{exercise: Exercise}>>(`${this.exerciseUrl}/save`, exercise) ;
  }

  getExercisesByTraineeIdAndDate(id: number, date: string) {
    const params = new HttpParams().set('date', date); 
    return this.http.get<CustomResponse<{exercises: Exercise[]}>>(`${this.exerciseUrl}/getbydate/${id}`, {params: params}); 
  }

  
}