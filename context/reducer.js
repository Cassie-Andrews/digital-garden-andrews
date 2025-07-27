import * as actions from './action'

export default function reducer(state, {action, payload}) {
    switch(action) {
        case actions.SEARCH_PLANTS:
            return {...state, plantSearchResults: payload}
        default:
            return state
    }
}