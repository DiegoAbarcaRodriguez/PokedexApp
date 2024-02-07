import { NgModule } from '@angular/core';

import { MainComponent } from './pages/main/main.component';
import { CardComponent } from './components/card/card.component';
import { HeaderComponent } from './components/header/header.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        SharedModule,
        RouterModule,
        CommonModule
    ],
    exports: [MainComponent],
    declarations: [
        MainComponent,
        CardComponent,
        HeaderComponent,
        NavigationComponent
    ],
})
export class IndexModule { }
