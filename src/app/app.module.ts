import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireStorageModule} from '@angular/fire/storage';
// Date
import {MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDateFormats, MatNativeDateModule} from '@angular/material/core';
import {environment} from '@src/environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HeaderComponent} from './components/header/header.component';

// Services
import {NotificationModule} from './services';

// FIX for - Generic type 'ModuleWithProviders<T>' requires 1 type argument(s) error
declare module '@angular/core' {
    interface ModuleWithProviders<T = any> {
        ngModule: Type<T>;
        providers?: Provider[];
    }
}

// Store
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
const StoreDevtools = !environment.production ? StoreDevtoolsModule.instrument({maxAge: 50}) : [];
import {reducers, effects} from '@app/store';

const APP_DATE_FORMATS: MatDateFormats = {
    parse: {
        dateInput: {day: 'numeric', month: 'numeric', years: 'numeric'}
    },
    display: {
        dateInput: {day: 'numeric', month: 'short', year: 'numeric'},
        monthYearLabel: {year: 'numeric', month: 'short'},
        dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
        monthYearA11yLabel: {year: 'numeric', month: 'long'}
    }
};

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebase.config),
        AngularFirestoreModule,
        AngularFireAuthModule,
        AngularFireStorageModule,
        BrowserAnimationsModule,
        MatNativeDateModule,
        StoreModule.forRoot(reducers, {
            runtimeChecks: {
                strictStateImmutability: true,
                strictActionImmutability: true
            }
        }),
        EffectsModule.forRoot(effects),
        StoreDevtools,
        NotificationModule.forRoot(),
    ],
    providers: [
        {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
        {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
