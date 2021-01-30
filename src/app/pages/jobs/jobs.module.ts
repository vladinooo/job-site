import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {effects, reducers} from './store';

import {JobsRoutingModule} from './jobs-routing.module';
import {JobsComponent} from './jobs.component';
import {MatDialogModule} from '@angular/material/dialog';
import {ButtonModule} from '@app/shared/buttons';
import { JobComponent } from './components/job/job.component';
import {FormModule} from './components/form/form.module';

@NgModule({
    declarations: [JobsComponent, JobComponent],
    imports: [
        CommonModule,
        JobsRoutingModule,
        StoreModule.forFeature('jobs', reducers),
        EffectsModule.forFeature(effects),
        MatDialogModule,
        ButtonModule,
        FormModule
    ]
})
export class JobsModule {
}
