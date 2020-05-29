import axios from 'axios'
import {SERVER_ERROR} from './server'
import Ultilities from '../Ultilities/global'
export const HELP_REQUEST = 'help/HELP_REQUEST'
export const HELP_RESPONSE = 'help/HELP_RESPONSE'

const initialState = {
	data: [],
	waiting: false
}

export default (state = initialState, action) => {
	switch (action.type) {
		case HELP_REQUEST:
			return {
				...state,
				waiting: true
			}
		case HELP_RESPONSE:
			return {
				...state,
				data: action.data,
				waiting: false
			}
		default:
			return state
	}
}

export const getData = () => {
	return dispatch => {
		dispatch({
			type: HELP_REQUEST
		})
		var url = Ultilities.base_url() + "/anonymous/helpSplay";
		return axios.get(url).then(function (response) {
			dispatch({
				type: HELP_RESPONSE,
				data: [response.data.dataObj]
			})
		}).catch(function (error) {
			dispatch({
				type: SERVER_ERROR
			})
		})
	}
}