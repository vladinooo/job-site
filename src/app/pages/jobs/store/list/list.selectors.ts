import {createSelector} from '@ngrx/store';
import {getJobsState, JobsState} from '../index';

import {listAdapter} from './list.reducer';

export const getListState = createSelector(
    getJobsState,
    (state: JobsState) => state.list
);

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal
} = listAdapter.getSelectors(getListState);

export const selectEntityById = createSelector(
    selectEntities,
    (entities, properties: { id: string }) => { // properties are data passed from component
        return entities[properties.id];
    }
);
