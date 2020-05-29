export const SERVER_ERROR = 'server/SERVER_ERROR'
export const SERVER_ERROR_OTHER = 'server/SERVER_ERROR_OTHER'
export const CLOSE_POPUP = 'server/CLOSE_POPUP'

const initialState = {
	serverError: false,
	serverErrorOther:false
}

export default (state = initialState, action) => {
	switch (action.type) {
		case SERVER_ERROR:
			return {
				...state,
				serverError: true
			}
		case SERVER_ERROR_OTHER:
			return {
				...state,
				serverErrorOther: true
			}
		case CLOSE_POPUP:
			return {
				...state,
				serverErrorOther: false
			}
		default:
			return state
	}
}

export const setStatusServer = () => {
	return dispatch => {
		dispatch({
			type: SERVER_ERROR
		})
	}
}
export const closePopup = () => {
	return dispatch => {
		dispatch({
			type: CLOSE_POPUP
		})
	}
}