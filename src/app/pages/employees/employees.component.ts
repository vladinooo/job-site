import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

import {select, Store} from '@ngrx/store';
import * as fromRoot from '@app/store';
import * as fromList from './store/list';

import {User} from './store/list/list.models';

@Component({
    selector: 'app-employees',
    templateUrl: './employees.component.html',
    styleUrls: ['./employees.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush // to prevent page rendering too often
})
export class EmployeesComponent implements OnInit {

    employees$: Observable<User[]>;

    constructor(private store: Store<fromRoot.State>) {
    }

    ngOnInit(): void {
        this.employees$ = this.store.pipe(select(fromList.getItems));
        this.store.dispatch(new fromList.Read());
    }

}
