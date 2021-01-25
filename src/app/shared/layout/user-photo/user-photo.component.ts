import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {DomSanitizer, SafeStyle} from '@angular/platform-browser';

@Component({
    selector: 'app-user-photo',
    templateUrl: './user-photo.component.html',
    styleUrls: ['./user-photo.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush // to prevent page rendering too often
})
export class UserPhotoComponent implements OnInit {

    @Input() photoURL: string;

    constructor(private sanitizer: DomSanitizer) {
    }

    ngOnInit(): void {
    }

    get safePhotoURL(): SafeStyle {
        return this.photoURL ? this.sanitizer.bypassSecurityTrustStyle(`url(${this.photoURL})`) : null;
    }

}
