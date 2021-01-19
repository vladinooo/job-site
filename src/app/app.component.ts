import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromDictionaries from './store/dictionaries';
import * as fromRoot from './store';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'job-site';

    constructor(private store: Store<fromRoot.State>) {
    }

    ngOnInit() {
        this.store.dispatch(new fromDictionaries.Read());
    }
}
