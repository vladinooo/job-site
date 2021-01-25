import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {filter} from 'rxjs/operators';

export interface Step {
    key: string;
    label: string;
}

export interface ActiveStep extends Step {
    index: number;
}

@Injectable()
export class StepperService {

    steps: Step[];
    activeStep: ActiveStep;

    next = new Subject<boolean>();
    next$: Observable<boolean>;

    prev = new Subject<void>();
    prev$ = this.prev.asObservable(); // direct subscription

    complete = new Subject<boolean>();
    complete$: Observable<boolean>;

    cancel = new Subject<void>();
    cancel$ = this.cancel.asObservable(); // direct subscription

    check = new Subject<'next' | 'complete'>();
    check$ = this.check.asObservable();


    constructor() {
        // subscribing to next$ observable will only trigger if a positive value came from the Subject next
        this.next$ = this.next.asObservable().pipe(
            filter(isOk => isOk)
        );

        // subscribing to complete$ observable will only trigger if a positive value came from the Subject complete
        this.complete$ = this.complete.asObservable().pipe(
            filter(isOk => isOk)
        );
    }

    init(steps: Step[]): void {
        this.steps = steps;
        this.activeStep = {...steps[0], index: 0};
    }

    onNext(): void {
        const index = this.activeStep.index + 1;
        this.activeStep = {...this.steps[index], index};
    }

    onPrev(): void {
        const index = this.activeStep.index - 1;
        this.activeStep = {...this.steps[index], index};
    }
}
