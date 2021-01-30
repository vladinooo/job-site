import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {AngularFirestore} from '@angular/fire/firestore';

import {Observable, of} from 'rxjs';
import {catchError, map, switchMap, take} from 'rxjs/operators';

import {User} from './user.models';

import * as fromActions from './user.actions';

type Action = fromActions.All;

@Injectable()
export class UserEffects {

    constructor(
        private actions: Actions,
        private afs: AngularFirestore) {
    }

    @Effect()
    read: Observable<Action> = this.actions.pipe(
        ofType(fromActions.Types.READ),
        switchMap((action: fromActions.Read) =>
            this.afs.doc<User>(`users/${action.id}`).valueChanges().pipe(
                take(1),
                map((user) => new fromActions.ReadSuccess(user)),
                catchError(err => of(new fromActions.ReadError(err.message)))
            )
        )
    );

}
