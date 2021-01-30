import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {effects, reducers} from './store';

import {UserPhotoModule} from '@app/shared/layout/user-photo/user-photo.module';

import {EmployeesRoutingModule} from './employees-routing.module';
import {EmployeesComponent} from './employees.component';
import { EmployeeComponent } from './components/employee/employee.component';


@NgModule({
    declarations: [EmployeesComponent, EmployeeComponent],
    imports: [
        CommonModule,
        EmployeesRoutingModule,
        StoreModule.forFeature('employees', reducers),
        EffectsModule.forFeature(effects),
        UserPhotoModule
    ]
})
export class EmployeesModule {
}
