import {Injectable} from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanActivateChild,
    CanLoad,
    Route,
    Router,
    RouterStateSnapshot,
    UrlSegment,
    UrlTree
} from '@angular/router';
import {Observable} from 'rxjs';
import {filter, map, take, tap} from 'rxjs/operators';

import {select, Store} from '@ngrx/store';
import * as fromRoot from '@app/store';
import * as fromUser from '@app/store/user';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

    constructor(private router: Router, private store: Store<fromRoot.State>) {
    }

    private check(): Observable<boolean> {
        return this.store.pipe(select(fromUser.getUserState)).pipe(
            filter(state => !state.loading),
            take(1),
            tap(state => {
                if (!state.uid) {
                    this.router.navigate(['auth/login']);
                }
            }),
            map(state => !!state.uid)
        );
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.check();
    }

    canActivateChild(
        childRoute: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.check();
    }

    canLoad(
        route: Route,
        segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.check();
    }
}
