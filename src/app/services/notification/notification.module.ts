import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NotificationService} from '@app/services/notification/notification.service';
import { NotificationComponent } from './components/notification/notification.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';


@NgModule({
    declarations: [NotificationComponent],
    imports: [
        CommonModule,
        MatSnackBarModule
    ]
})
export class NotificationModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: NotificationModule,
            providers: [
                NotificationService
            ]
        };
    }
}
