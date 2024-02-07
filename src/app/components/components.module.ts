import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CardComponent } from './card/card.component';
import { HeaderComponent } from './header/header.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ArrowBackComponent } from './arrow-back/arrow-back.component';
import { HeightComponent } from './height/height.component';
import { WeightComponent } from './weight/weight.component';
import { ArrowRightComponent } from './arrow-right/arrow-right.component';
import { ArrowLeftComponent } from './arrow-left/arrow-left.component';


@NgModule({
    exports: [
        CardComponent,
        HeaderComponent,
        NavigationComponent,
        ArrowBackComponent,
        HeightComponent,
        WeightComponent,
        ArrowRightComponent,
        ArrowLeftComponent
    ],
    imports: [RouterModule],
    declarations: [
        CardComponent,
        HeaderComponent,
        NavigationComponent,
        ArrowBackComponent,
        HeightComponent,
        WeightComponent,
        ArrowRightComponent,
        ArrowLeftComponent
    ],
})
export class ComponentsModule { }
