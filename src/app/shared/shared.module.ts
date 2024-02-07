import { NgModule } from '@angular/core';

import { ArrowBackComponent } from './components/svg-icons/arrow-back/arrow-back.component';
import { HeightComponent } from './components/svg-icons/height/height.component';
import { WeightComponent } from './components/svg-icons/weight/weight.component';
import { ArrowRightComponent } from './components/svg-icons/arrow-right/arrow-right.component';
import { ArrowLeftComponent } from './components/svg-icons/arrow-left/arrow-left.component';


@NgModule({
    exports: [
        ArrowBackComponent,
        HeightComponent,
        WeightComponent,
        ArrowRightComponent,
        ArrowLeftComponent
    ],
    declarations: [
        ArrowBackComponent,
        HeightComponent,
        WeightComponent,
        ArrowRightComponent,
        ArrowLeftComponent
    ],
})
export class SharedModule { }
