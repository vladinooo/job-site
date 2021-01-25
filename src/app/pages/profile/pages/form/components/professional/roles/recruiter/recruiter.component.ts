import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Dictionaries} from '@app/store/dictionaries';

export interface RecruiterForm {
    companyName: string;
    employeesCount: number;
}

@Component({
    selector: 'app-recruiter',
    templateUrl: './recruiter.component.html',
    styleUrls: ['./recruiter.component.scss']
    // no detection strategy onPush, this will allow the component to register on the parent form and respond to it's
    // changes
})
export class RecruiterComponent implements OnInit, OnDestroy {

    @Input() parent: FormGroup;
    @Input() name: string;
    @Input() value: RecruiterForm;
    @Input() dictionaries: Dictionaries;
    form: FormGroup;


    constructor(private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            companyName: [null, {
                updateOn: 'blur', validators: [
                    Validators.required
                ]
            }],
            employeesCount: [null, {
                updateOn: 'blur', validators: [
                    Validators.required
                ]
            }]
        });

        if (this.value) {
          this.form.patchValue(this.value);
        }

        // add new controls to a parent form group
        // parent form will be extended with a new form group
        this.parent.addControl(this.name, this.form);
    }

    ngOnDestroy(): void {
      this.parent.removeControl(this.name);
    }

}
