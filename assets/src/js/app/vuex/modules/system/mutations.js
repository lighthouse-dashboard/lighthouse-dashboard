import { SET_INFO } from '../mutation-types';

export default {
    /**
     * Set info
     * @param { SystemState } state
     * @param { System.Info } info
     */
    [SET_INFO](state, { info }) {
        state.info = info;
    },
};
