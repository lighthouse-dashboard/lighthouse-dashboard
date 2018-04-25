import {
    SET_ROUTE_BRANCH,
} from '@/store/mutations';

export default {

    [SET_ROUTE_BRANCH](state, { value }) {
        state['branch'] = value;
    },
};
