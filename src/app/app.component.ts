import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromDictionaries from './store/dictionaries';
import * as fromRoot from './store';
import * as fromUser from './store/user';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'job-site';

    isAuthorized$: Observable<boolean>;

    constructor(private store: Store<fromRoot.State>) {
    }

    ngOnInit(): void {
        this.isAuthorized$ = this.store.pipe(select(fromUser.getIsAuthorized));
        this.store.dispatch(new fromUser.Init());
        this.store.dispatch(new fromDictionaries.Read());
    }

    onSignOut(): void {
        this.store.dispatch(new fromUser.SignOut());
    }
}
