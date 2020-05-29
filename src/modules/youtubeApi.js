import axios from 'axios'
export const YOUTUBE_REQUEST = 'youtube/YOUTUBE_REQUEST'
export const YOUTUBE_RESPONSE = 'youtube/YOUTUBE_RESPONSE'

const initialState = {
	data: [],
	waiting: false
}

export default (state = initialState, action) => {
	switch (action.type) {
		case YOUTUBE_REQUEST:
			return {
				...state,
				waiting: true
			}
		case YOUTUBE_RESPONSE:
			return {
				...state,
				data: action.data,
				waiting: false
			}
		default:
			return state
	}
}

export const getData = (channel_id, search_key) => {
	return dispatch => {
		dispatch({
			type: YOUTUBE_REQUEST
		})
		var url = "https://www.googleapis.com/youtube/v3/search?key=AIzaSyBvKkN8lxCegk98cgdWgKKvDOr6Vg4Zvmk&part=snippet&maxResults=5";
		if (channel_id !== undefined) {
			url += "&channelId=" + channel_id;
		}
		if (search_key !== undefined) {
			url += "&q=" + search_key;
		}
		return axios.get(url).then(function (response) {
			dispatch({
				type: YOUTUBE_RESPONSE,
				data: response.data.items
			})
		}).catch(function (error) {
			console.log(error);
			dispatch({
				type: YOUTUBE_RESPONSE,
				data: []
			})
		})
	}
}