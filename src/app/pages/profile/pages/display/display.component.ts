import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

import {Observable,} from 'rxjs';
import {map} from 'rxjs/operators';

import {select, Store} from '@ngrx/store';
import * as fromRoot from '@app/store';
import * as fromUser from '@app/store/user'; // accessing the user in the root store
import * as fromProfileUser from '../../store/user'; // accessing the user in the profile store


@Component({
    selector: 'app-display',
    templateUrl: './display.component.html',
    styleUrls: ['./display.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush // to prevent page rendering too often
})
export class DisplayComponent implements OnInit, OnDestroy {

    user$: Observable<fromProfileUser.User>; // user observable from the local store of the profile
    isOwnProfile$: Observable<boolean>;

    constructor(private route: ActivatedRoute,
                private store: Store<fromRoot.State>) {
    }

    ngOnInit(): void {
        this.user$ = this.store.pipe(select(fromProfileUser.getUser));

        this.route.params.subscribe((params: Params) => {
            const id = params.id; // get user ID from URL

            this.store.dispatch(new fromProfileUser.Read(id));

            // check authorised user ID and compare with user ID in the URL
            // if they match then page can be edited
            this.isOwnProfile$ = this.store.pipe(
                select(fromUser.getUser),
                map(user => user && user.uid === id)
            );
        });
    }

    ngOnDestroy(): void {
        // clear the store to prevent previous user's data flickering on the display page
        this.store.dispatch(new fromProfileUser.Clear());
    }

}
