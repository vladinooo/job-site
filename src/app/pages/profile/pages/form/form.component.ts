import {Component, OnInit, OnDestroy, ChangeDetectionStrategy} from '@angular/core';
import {StepperService} from './components/stepper/services';
import {Subject, Observable, zip} from 'rxjs';
import {takeUntil, switchMap} from 'rxjs/operators';
import {Store, select} from '@ngrx/store';
import * as fromRoot from '@app/store';
import * as fromDictionaries from '@app/store/dictionaries';
import {PersonalForm} from './components/personal/personal.component';
import {ProfessionalForm} from './components/professional/professional.component';
import * as fromUser from '@app/store/user';
import {ActivatedRoute, Router} from '@angular/router';

export interface ProfileForm {
    personal: PersonalForm;
    professional: ProfessionalForm;
}

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush // to prevent page rendering too often
})
export class FormComponent implements OnInit, OnDestroy {

    dictionaries$: Observable<fromDictionaries.Dictionaries>;
    dictionariesIsReady$: Observable<boolean>;
    private user: fromUser.User;

    private destroy = new Subject<any>();

    constructor(public stepper: StepperService,
                private store: Store<fromRoot.State>,
                private route: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit(): void {

        this.user = this.route.snapshot.data.user;

        this.dictionaries$ = this.store.pipe(select(fromDictionaries.getDictionaries));
        this.dictionariesIsReady$ = this.store.pipe(select(fromDictionaries.getIsReady));

        this.stepper.init([
            {key: 'professional', label: 'Professional'},
            {key: 'personal', label: 'Personal'}
        ]);

        this.stepper.complete$.pipe(takeUntil(this.destroy)).subscribe(() => {
            console.log('completed');
        });

        this.stepper.cancel$.pipe(takeUntil(this.destroy)).subscribe(() => {
            console.log('canceled');
        });
    }

    ngOnDestroy(): void {
        this.destroy.next();
        this.destroy.complete();
    }

    onChangedPersonal(data: PersonalForm): void {
        console.log('personal changed = ', data);
    }

    onChangedProfessional(data: ProfessionalForm): void {
        console.log('professional changed = ', data);
    }

}
