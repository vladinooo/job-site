import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FormRoutingModule} from './form-routing.module';
import {FormComponent} from './form.component';
import {StepperModule} from './components';
import {PersonalComponent} from './components/personal/personal.component';
import {ProfessionalComponent} from './components/professional/professional.component';

import {
    AutocompleteModule,
    ButtonModule,
    CheckboxesModule,
    DateRangeModule,
    FilesUploadModule,
    FormFieldModule,
    InputModule,
    RadiosModule,
    SelectModule,
    SpinnerModule,
    UserPhotoModule
} from '@app/shared';
import {ReactiveFormsModule} from '@angular/forms';
import {EmployeeComponent} from './components/professional/roles/employee/employee.component';
import {RecruiterComponent} from './components/professional/roles/recruiter/recruiter.component';
import {ExperiencesComponent} from './components/professional/roles/employee/experiences/experiences.component';

@NgModule({
    declarations: [FormComponent, PersonalComponent, ProfessionalComponent, EmployeeComponent, RecruiterComponent, ExperiencesComponent],
    imports: [
        CommonModule,
        FormRoutingModule,
        StepperModule,
        FormFieldModule,
        ReactiveFormsModule,
        InputModule,
        AutocompleteModule,
        FilesUploadModule,
        SpinnerModule,
        UserPhotoModule,
        SelectModule,
        CheckboxesModule,
        RadiosModule,
        DateRangeModule,
        ButtonModule
    ]
})
export class FormModule {
}
