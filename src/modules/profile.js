import axios from 'axios'
import Ultilities from '../Ultilities/global'
import {SERVER_ERROR} from './server'
export const PROFILE_REQUEST = 'profile/PROFILE_REQUEST'
export const PROFILE_RESPONSE = 'profile/PROFILE_RESPONSE'
export const PROFILE_UPDATE = 'profile/PROFILE_UPDATE'
export const PROFILE_RESPONSE_MORE = 'profile/PROFILE_RESPONSE_MORE'

const initialState = {
	data: [],
	waiting: false
}

export default (state = initialState, action) => {
	switch (action.type) {
		case PROFILE_REQUEST:
			return {
				...state,
				waiting: true
			}
		case PROFILE_UPDATE:
			return {
				...state,
				dataUpdate: action.data,
				waiting: false
			}
		case PROFILE_RESPONSE:
			return {
				...state,
				data: action.data,
				waiting: false
			}
		case PROFILE_RESPONSE_MORE:
			return {
				...state,
				data: state.data.concat(action.data),
				waiting: false
			}
		default:
			return state
	}
}

export const getData = (token) => {
	var header = {
		headers: {
			"Content-Type": "application/json",
			"Authorization": "bearer " + token,
		}
	}
	return dispatch => {
		dispatch({
			type: PROFILE_REQUEST
		})
		var url = Ultilities.base_url() + "profile";
		return axios.get(url, header).then(function (response) {
			dispatch({
				type: PROFILE_RESPONSE,
				data: response.data.data
			})
		}).catch(function (error) {
			dispatch({
				type: SERVER_ERROR
			})
		})
	}
}
export const updateProfile = (token, profile) => {
	var header = {
		headers: {
			"content-type": "application/x-www-form-urlencoded",
			"Authorization": "bearer " + token,
		}
	}
	return dispatch => {
		dispatch({
			type: PROFILE_REQUEST
		})
		var formData = new FormData();
		if(profile.phoneNumber !== undefined){
			formData.append("phoneNumber", profile.phoneNumber);
		}
		if(profile.fullname !== undefined){
			formData.append("fullName", profile.fullname);
		}
		if(profile.email !== undefined){
			formData.append("email", profile.email);
		}
		if(profile.avatar !== undefined){
			formData.append("avatar", profile.avatar);
		}
		var url = Ultilities.base_url() + "updateProfile";
		return axios.post(url, formData, header).then(function (response) {
			console.log(response);
			dispatch({
				type: PROFILE_UPDATE,
				data: response
			})
		}).catch(function (error) {
			dispatch({
				type: SERVER_ERROR
			})
		})
	}
}