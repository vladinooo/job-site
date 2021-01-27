import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '@app/store/user';
import {Router} from "@angular/router";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush // to prevent page rendering too often
})
export class HeaderComponent implements OnInit {

    @Input() isAuthorized: boolean;
    @Output() signOut = new EventEmitter<void>();
    @Input() user: User;

    constructor(private router: Router) {
    }

    ngOnInit(): void {
    }

    onSignOut(): void {
        this.signOut.emit();
    }

    onProfileNavigate(): void {
        const path = this.user ? this.user.uid : 'new';
        this.router.navigate(['/profile', path]);
    }

}
