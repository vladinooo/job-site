import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputModule} from '@app/shared/controls/input/input.module';
import {FormFieldModule} from '@app/shared/controls/form-field/form-field.module';
import {PasswordModule} from '@app/shared/controls/password/password.module';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        InputModule,
        FormFieldModule,
        PasswordModule
    ],
    exports: [
        InputModule,
        FormFieldModule,
        PasswordModule
    ]
})
export class ControlsModule {
}
