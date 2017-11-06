import {RouterModule, Routes} from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {UploadComponent} from "./components/upload/upload.component";

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'upload',
    component: UploadComponent
  },
  {
    path: '',
    component: LandingComponent
  }
];

export const appRoutesModule = RouterModule.forRoot(appRoutes);
