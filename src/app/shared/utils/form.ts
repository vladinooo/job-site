import {ControlItem} from '@app/models/frontend';

export const markFormGroupTouched = (formGroup) => {
    (Object as any).values(formGroup.controls).forEach(control => {
        control.markAsTouched();

        if (control.controls) {
            markFormGroupTouched(control);
        }
    });
};

// used for interconnected controls
export interface Control {
    items?: ControlItem[];
    changed?: () => void; // action attached to a control
    map?: () => void; // changes a state of  the control caused by external actions
}

// a group of controls
export interface ControlEntities {
    [key: string]: Control;
}

// call the map() method for all controls passed in
export const mapControls = (controls: ControlEntities): void => {
    Object.keys(controls).forEach(key => {
       if (controls[key].map) {
           controls[key].map();
       }
    });
};
