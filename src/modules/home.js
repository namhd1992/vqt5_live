import axios from 'axios'
import Ultilities from '../Ultilities/global'
import {SERVER_ERROR} from './server'
export const HOME_REQUEST = 'home/HOME_REQUEST'
export const HOME_RESPONSE = 'home/HOME_RESPONSE'
export const MISSION_HOME_RESPONSE = 'home/MISSION_HOME_RESPONSE'


const initialState = {
	data: [],
	dataMission:[],
	waiting: false
}

export default (state = initialState, action) => {
	switch (action.type) {
		case HOME_REQUEST:
			return {
				...state,
				waiting: true
			}
		case HOME_RESPONSE:
			return {
				...state,
				data: action.data,
				waiting: false
			}
		case MISSION_HOME_RESPONSE:
			return {
				...state,
				dataMission: action.dataMission,
				waiting: false
			}
		default:
			return state
	}
}

export const getData = (limit,offset) => {
	return dispatch => {
		dispatch({
			type: HOME_REQUEST
		})
		var url = Ultilities.base_url() + "/anonymous/getFileCached";
		axios.get(url).then(function (response) {
			url = response.data;
			axios.get(url).then(function(contentResponse){
				dispatch({
					type: HOME_RESPONSE,
					data: contentResponse.data
				})
			}).catch(function(error){
				dispatch({
					type: SERVER_ERROR
				})
			});
		}).catch(function (error) {
			dispatch({
				type: SERVER_ERROR
			})
		})
	}
}

export const getDataMission = (limit, offset, token) => {
	var header = {
	  headers: {
		"Content-Type": "application/json",
		"Authorization": "bearer " + token,
	  }
	}
	return dispatch => {
	  dispatch({
		type: HOME_REQUEST
	  })
	  var url = Ultilities.base_url() + "mission?limit=" + limit + "&offset=" + offset;
	  return axios.get(url, header).then(function (response) {
		dispatch({
		  type: MISSION_HOME_RESPONSE,
		  dataMission: response.data.data,
		  totalRecords: response.data.totalRecords
		})
	  }).catch(function (error) {
		dispatch({
				  type: SERVER_ERROR
			  })
	  })
	}
  }