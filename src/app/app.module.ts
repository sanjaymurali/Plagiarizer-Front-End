import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';


import {appRoutesModule} from './app.routes';

import {AppComponent} from './app.component';
import {LandingComponent} from './components/landing/landing.component';
import {NavbarComponent} from './components/shared/navbar/navbar.component';
import {FooterComponent} from './components/shared/footer/footer.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {UploadComponent} from './components/upload/upload.component';
import {UploadProgressComponent} from './components/shared/upload-progress/upload-progress.component';
import {AlertsComponent} from './components/shared/alerts/alerts.component';

import {NotifyService} from './services/notify.service';
import {ShowUploadedFilesComponent} from './components/show-uploaded-files/show-uploaded-files.component';
import {CompareComponent} from './components/compare/compare.component';
import {AssignmentService} from './services/assignment.service';
import {AssignmentResolver} from './services/assignment.resolver.service';
import {SelectStudentComponent} from './components/select-student/select-student.component';
import {PreviewFileComponent} from './components/preview-file/preview-file.component';
import {FilterStudentPipe} from './pipes/filter-student.pipe';
import {CompareService} from './services/compare.service';
import {ResultComponent} from './components/result/result.component';
import {ShowSelectedFilesComponent} from './components/show-selected-files/show-selected-files.component';
import {RouterModule} from "@angular/router";

@NgModule({
    declarations: [
        AppComponent,
        LandingComponent,
        NavbarComponent,
        FooterComponent,
        LoginComponent,
        RegisterComponent,
        UploadComponent,
        UploadProgressComponent,
        AlertsComponent,
        ShowUploadedFilesComponent,
        CompareComponent,
        SelectStudentComponent,
        PreviewFileComponent,
        FilterStudentPipe,
        ResultComponent,
        ShowSelectedFilesComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        appRoutesModule
    ],
    providers: [NotifyService, AssignmentService, AssignmentResolver, CompareService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
