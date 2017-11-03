import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {appRoutesModule} from './app.routes';

import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    appRoutesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
