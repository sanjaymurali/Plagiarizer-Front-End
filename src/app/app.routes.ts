import {RouterModule, Routes} from '@angular/router';
import {LandingComponent} from './components/landing/landing.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {UploadComponent} from "./components/upload/upload.component";
import {CompareComponent} from "./components/compare/compare.component";
import {ShowUploadedFilesComponent} from "./components/show-uploaded-files/show-uploaded-files.component";
import {SelectStudentComponent} from "./components/select-student/select-student.component";
import {AssignmentResolver} from "./services/assignment.resolver.service";

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
        path: 'select',
        component: CompareComponent,
        resolve: {
            assignment: AssignmentResolver
        }
    },
    {
        path: '**',
        component: LandingComponent
    }
];

export const appRoutesModule = RouterModule.forRoot(appRoutes);
