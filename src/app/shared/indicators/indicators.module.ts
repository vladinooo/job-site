import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SpinnerModule} from '@app/shared/indicators/spinner/spinner.module';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        SpinnerModule
    ],
    exports: [
        SpinnerModule
    ]
})
export class IndicatorsModule {
}
