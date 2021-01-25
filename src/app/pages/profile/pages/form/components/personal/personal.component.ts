import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output
} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {StepperService} from '../stepper/services';
import {markFormGroupTouched, regex, regexErrors} from '@app/shared';
import {Dictionaries} from '@app/store/dictionaries';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

export interface PersonalForm {
    name: string;
    photoURL: string;
    country: string;
}

@Component({
    selector: 'app-personal',
    templateUrl: './personal.component.html',
    styleUrls: ['./personal.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush // to prevent page rendering too often
})
export class PersonalComponent implements OnInit, OnDestroy {

    @Input() value: PersonalForm;
    @Input() dictionaries: Dictionaries;
    @Output() changed = new EventEmitter<PersonalForm>();

    form: FormGroup;
    regexErrors = regexErrors;

    private destroy = new Subject<any>();

    constructor(private stepper: StepperService,
                private fb: FormBuilder,
                private cdr: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            photoURL: [null],
            name: [null, {
                updateOn: 'blur', validators: [
                    Validators.required,
                    Validators.maxLength(128),
                    Validators.pattern(regex.latinAndSpaces)
                ]
            }],
            country: [null, {
                updateOn: 'change', validators: [
                    Validators.required
                ]
            }]
        });

        // if value came to the component it needs to be set in the form
        if (this.value) {
            this.form.patchValue(this.value);
        }

        this.stepper.check$.pipe(takeUntil(this.destroy)).subscribe((type) => {
            if (!this.form.valid) {
                markFormGroupTouched(this.form);
                this.form.updateValueAndValidity();
                this.cdr.detectChanges();
            } else {
                this.changed.emit(this.form.value); // send form data to parent component
            }

            // type === 'next'
            this.stepper[type].next(this.form.valid);
        });
    }

    ngOnDestroy(): void {
        this.destroy.next();
        this.destroy.complete();
    }

    onPhotoChanged(url: string): void {
        if (url) {
            this.form.controls.photoURL.setValue(url);
        }
    }
}
