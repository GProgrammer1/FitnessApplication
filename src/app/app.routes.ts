import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MainPageComponent } from './main-page/main-page.component';

export const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'main', component: MainPageComponent },
    {path: 'register', component: RegisterComponent}
];