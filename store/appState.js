const initialState = {
    title: "Top Articles"
}
const appState = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_TITLE':
            return {
                ...state,
                title: action.title
            };
        default:
            return state
    }
}

export default appState;