import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatIconModule, MatInputModule, MatToolbarModule } from '@angular/material';


import { AppComponent } from './app.component';
import { MessagesComponent } from './messages/messages.component';
import { UsersComponent } from './users/users.component';
import { ChatService } from './chat.service';


@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule
  ],
  providers: [ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
