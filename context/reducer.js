import * as actions from './action'

export default function reducer(state, { type, payload }) {
    switch(type) {
        case actions.SET_SEARCH_RESULTS:
            return {
                ...state, 
                searchResults: payload,
            }
        default:
            return state
    }
}