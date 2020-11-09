import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { Lagre } from './lagre/lagre';
import { Svar } from './svar/svar';
import { Liste } from './liste/liste';
import { AppRoutingModule } from './app-routing.module';
import { Meny } from './Meny/meny';

@NgModule({
  declarations: [
    AppComponent,
    Lagre,
    Svar,
    Liste,
    Meny
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
