import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';

import { HeaderComponent } from './header/header.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { ErrorInterceptor } from './error-interceptor';
import { ErrorComponent } from './error/error.component';
import { AngularMaterialModule } from './angular-material.module';
import { PostsModule } from './posts/posts.module';
import { FormsModule } from '@angular/forms';
import { RecapsModule } from './recap/recaps.module';
import { AppRoutingModule } from './app-routing.module';


import { PrayerCreateComponent } from './prayer/prayer-create/prayer-create.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { PrayerListComponent } from './prayer/prayer-list/prayer-list.component';
import { MatExpansionModule, MatButtonModule, MatToolbarModule, MatCardModule, MatInputModule } from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ErrorComponent,
    PrayerCreateComponent,
    PrayerListComponent,
    ContactListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    PostsModule,
    FormsModule,
    RecapsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule


  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule { }
