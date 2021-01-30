import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

import {MatDialog} from '@angular/material/dialog';
import {FormComponent} from './components/form/form.component';

import {select, Store} from '@ngrx/store';
import * as fromRoot from '@app/store';
import * as fromUser from '@app/store/user';
import * as fromList from './store/list';

import {Job} from './store/list/list.models';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-jobs',
    templateUrl: './jobs.component.html',
    styleUrls: ['./jobs.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobsComponent implements OnInit {

    jobs$: Observable<Job[]>;
    isEditable$: Observable<boolean>;

    constructor(private store: Store<fromRoot.State>,
                private dialog: MatDialog) {
    }

    ngOnInit(): void {

        this.jobs$ = this.store.pipe(select(fromList.selectAll));
        this.isEditable$ = this.store.pipe(
            select(fromUser.getRoleId),
            map(roleId => ['recruiter', 'employee'].includes(roleId))
        );

        this.store.dispatch(new fromList.Read());
    }

    onAdd(): void {
        this.dialog.open(FormComponent, {
            width: '650px',
            height: '220px',
            data: {}
        });
    }

    onEdit(value: Job): void {
        this.dialog.open(FormComponent, {
            width: '650px',
            height: '220px',
            data: {value}
        });
    }

    onDelete(id: string): void {
        this.store.dispatch(new fromList.Delete(id));
    }

}
