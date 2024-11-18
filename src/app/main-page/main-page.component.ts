import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { WorkoutComponent } from '../workout/workout.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [NavbarComponent, WorkoutComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {

}
