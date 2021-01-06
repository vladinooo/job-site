import { Component } from '@angular/core';

import {AngularFirestore} from '@angular/fire/firestore';
import {snapshotChanges} from '@angular/fire/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'job-site';

  constructor(private afs: AngularFirestore) {
  }

  ngOnInit() {
    this.afs.collection('test').snapshotChanges().subscribe(items => {
      console.log(items.map(x => x.payload.doc.data()));
    });
  }
}
