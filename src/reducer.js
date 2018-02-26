const initialState = {
  tables: []
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TABLES_INFO':
      return {
        ...state,
        tables: action.data
      }
    default:
      return state
  }
}