import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { PokemonModule } from './pokemon/pokemon.module';

import { AppComponent } from './app.component';
import { IndexModule } from './index/index.module';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PokemonModule,
    IndexModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
