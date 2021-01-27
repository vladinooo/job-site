import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Recruiter} from '../../../../store/user';

@Component({
  selector: 'app-recruiter',
  templateUrl: './recruiter.component.html',
  styleUrls: ['./recruiter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush // to prevent page rendering too often
})
export class RecruiterComponent implements OnInit {

  @Input() role: Recruiter;

  constructor() { }

  ngOnInit(): void {
  }

}
