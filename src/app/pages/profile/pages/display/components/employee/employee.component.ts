import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Employee} from '../../../../store/user';

@Component({
    selector: 'app-employee',
    templateUrl: './employee.component.html',
    styleUrls: ['./employee.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush // to prevent page rendering too often
})
export class EmployeeComponent implements OnInit {

    @Input() role: Employee;

    constructor() {
    }

    ngOnInit(): void {
    }

}
