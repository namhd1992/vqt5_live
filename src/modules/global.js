export const GLOBAL_REQUEST = 'global/GLOBAL_REQUEST'
export const GLOBAL_RESPONSE = 'global/GLOBAL_RESPONSE'

const initialState = {
  title: "Splay",
  waiting: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GLOBAL_REQUEST:
      return {
        ...state,
        waiting: true
      }
    case GLOBAL_RESPONSE:
      return {
        ...state,
        title: action.title,
        waiting: false
      }
    default:
      return state
  }
}

export const changeTitle = (title) => {
  return dispatch => {
    dispatch({
      type: GLOBAL_REQUEST
    })
    dispatch({
      title: title,
      type: GLOBAL_RESPONSE
    })
  }
}

export const changeSettings = () => {
	
}