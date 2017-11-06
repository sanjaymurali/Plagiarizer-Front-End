import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import {appRoutesModule} from './app.routes';

import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UploadComponent } from './components/upload/upload.component';
import { UploadProgressComponent } from './components/shared/upload-progress/upload-progress.component';
import { ErrorDialogComponent } from './components/shared/error-dialog/error-dialog.component';
import {ProgressService} from "./services/progress.service";


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
    ErrorDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    appRoutesModule
  ],
  providers: [ProgressService],
  bootstrap: [AppComponent]
})
export class AppModule { }
