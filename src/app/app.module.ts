import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { UsersComponent } from './components/users/users.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HackatonService } from './services/hackaton.service';

@NgModule({
  declarations: [AppComponent, MenuComponent, UsersComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [HackatonService],
  bootstrap: [AppComponent],
})
export class AppModule {}
