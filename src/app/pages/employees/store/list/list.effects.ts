import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {AngularFirestore} from '@angular/fire/firestore';

import {Observable, of} from 'rxjs';
import {catchError, map, switchMap, take} from 'rxjs/operators';

import {User} from './list.models';

import * as fromActions from './list.actions';
import {extractDocumentChangeActionData} from '@app/shared/utils/data';

type Action = fromActions.All;

@Injectable()
export class ListEffects {

    constructor(
        private actions: Actions,
        private afs: AngularFirestore
    ) { }

    @Effect()
    read: Observable<Action> = this.actions.pipe(
        ofType(fromActions.Types.READ),
        switchMap(() =>
            this.afs.collection<User>('users', ref => ref.where('roleId', '==', 'employee')).snapshotChanges().pipe(
                take(1),
                map(changes => changes.map(x => extractDocumentChangeActionData(x, false))), // convert all incoming data
                map((items: User[]) => new fromActions.ReadSuccess(items)),
                catchError(err => of(new fromActions.ReadError(err.message)))
            ))

    );
}

