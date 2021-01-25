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
import {RecruiterForm} from './roles/recruiter/recruiter.component';
import {EmployeeForm} from './roles/employee/employee.component';

export interface ProfessionalForm {
    about: string;
    roleId: string;
    role: RecruiterForm | EmployeeForm;
}

@Component({
    selector: 'app-professional',
    templateUrl: './professional.component.html',
    styleUrls: ['./professional.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush // to prevent page rendering too often
})
export class ProfessionalComponent implements OnInit, OnDestroy {

    @Input() value: ProfessionalForm;
    @Input() dictionaries: Dictionaries;

    @Output() changed = new EventEmitter<ProfessionalForm>();

    form: FormGroup;
    regexErrors = regexErrors;

    private destroy = new Subject<any>();

    constructor(private stepper: StepperService,
                private fb: FormBuilder,
                private cdr: ChangeDetectorRef) {
    }

    ngOnInit(): void {

        this.form = this.fb.group({
            roleId: [null, {
                updateOn: 'change', validators: [
                    Validators.required
                ]
            }],
            about: [null]
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

            // type === 'complete' as the 'professional' is the last step
            this.stepper[type].next(this.form.valid);
        });
    }

    ngOnDestroy(): void {
        this.destroy.next();
        this.destroy.complete();
    }

}
