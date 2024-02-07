import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PokemonComponent } from './pages/pokemon/pokemon.component';
import { HeaderComponent } from './components/header/header.component';
import { SharedModule } from '../shared/shared.module';
import { FeaturesComponent } from './components/features/features.component';
import { StatsComponent } from './components/stats/stats.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule
    ],
    exports: [PokemonComponent],
    declarations: [
        PokemonComponent,
        HeaderComponent,
        FeaturesComponent,
        StatsComponent
    ],
})
export class PokemonModule { }
