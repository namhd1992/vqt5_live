import React from 'react'
import PropTypes from 'prop-types'
import Ultilities from '../../Ultilities/global'
import axios from 'axios'
import moment from 'moment'
import {
	getData
} from '../../modules/profile'

import {
	setStatusServer
} from '../../modules/server'

import {
	changeTitle
} from '../../modules/global'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
// import '../styles/menuAppbar.css'

class MenuAppBar extends React.Component {

	state = {
		auth: false,
		top: false,
		left: false,
		bottom: false,
		right: false,
		user: null,
	}
	loginAction = () => {
		if (typeof(Storage) !== "undefined") {
			var currentPath = window.location.pathname;
			localStorage.setItem("currentPath", currentPath);
		} else {
			console.log("Trình duyệt không hỗ trợ localStorage");
		}
		window.location.replace(`http://graph.vtcmobile.vn/oauth/authorize?client_id=58306439627cac03c8e4259a87e2e1ca&agencyid=0&redirect_uri=${window.location.protocol}//${window.location.host}/`);
		// window.location.replace(`http://sandbox.graph.vtcmobile.vn/oauth/authorize?client_id=4e7549789b14693eda4e019faaa0c446&agencyid=0&redirect_uri=${window.location.protocol}//${window.location.host}/`);
	}

	logoutAction = () => {
		this.setState({ auth: false });
		localStorage.removeItem("user");
		window.location.replace(
			`https://graph.vtcmobile.vn/oauth/authorize?client_id=58306439627cac03c8e4259a87e2e1ca&redirect_uri=${window.location.protocol}//${window.location.host}&action=logout&agencyid=0`,
		);
		// window.location.replace(
		// 	`http://sandbox.graph.vtcmobile.vn/oauth/authorize?client_id=4e7549789b14693eda4e019faaa0c446&redirect_uri=${window.location.protocol}//${window.location.host}&action=logout&agencyid=0`,
		// );
	}

	componentDidMount() {
		var {dispatch}=this.props;
		var user = JSON.parse(localStorage.getItem("user"));
		var _this = this;
		if (this.props.pathname === "/game") {
			this.props.changeTitle("Danh Sách Game");
		}
		if (this.props.pathname === "/auction") {
			this.props.changeTitle("Shop");
		}
		if (this.props.pathname === "/giftcode") {
			this.props.changeTitle("Giftcode");
		}
		if (this.props.pathname === "/lucky") {
			this.props.changeTitle("May Mắn");
		}
		if (localStorage.getItem("user") != null) {
			var now = moment(new Date()); //todays date
			var end = moment(user.expired); // another date
			var duration = moment.duration(end.diff(now));
			var millisecond = Math.floor(duration.asMilliseconds()) + 86400000;
			if (millisecond > 0) {
				_this.props.getData(user.access_token).then(function () {
					if (_this.props.data === null) {
						_this.logoutAction();
					}
				});
				this.setState({
					auth: true,
					user: JSON.parse(localStorage.getItem("user")),
				});
			} else {
				this.logoutAction();
			}
		} else {
			this.setState({ auth: false });
			var code = Ultilities.parse_query_string("code", window.location.href);
			var fb_mess = Ultilities.parse_query_string("fbmessid", window.location.href);
			var currentPath=localStorage.getItem("currentPath");
			if (code != null) {
				if (fb_mess === null) {
					var url = Ultilities.base_url() + "signin";
					var redirect = `http://graph.vtcmobile.vn/oauth/authorize?client_id=58306439627cac03c8e4259a87e2e1ca&redirect_uri=${window.location.protocol}//${window.location.host}`;
					// var redirect = `https://graph.vtcmobile.vn/oauth/authorize?client_id=4e7549789b14693eda4e019faaa0c446&redirect_uri=${window.location.protocol}//${window.location.host}&agencyid=0&imei=GEWO4536NGREGR`;
					var params = {
						"code": code,
						"redirect_uri": redirect
					};
					axios.post(url, params).then(function (response) {
						var user_save = response.data.data;
						user_save.expired = new Date();
						localStorage.setItem("user", JSON.stringify(user_save));
						_this.setState({ user: response.data.data });
						window.location.replace(`${window.location.protocol}//${window.location.host}${currentPath}`);
						// _this.props.getData(user_save.access_token, user_save.scoinAccessToken).then(function () {
						// 	window.location.replace(`${window.location.protocol}//${window.location.host}`);
						// });
					}).catch(function (error) {
						_this.props.setStatusServer();
						localStorage.removeItem("user");
						localStorage.removeItem("userInfo");
						_this.setState({ auth: false });
					})
				} else {
					var url = Ultilities.base_url() + "signin";
					var redirect = `http://graph.vtcmobile.vn/oauth/authorize?client_id=58306439627cac03c8e4259a87e2e1ca&redirect_uri=${window.location.protocol}//${window.location.host}/loginwidget`;
					// var redirect = `https://graph.vtcmobile.vn/oauth/authorize?client_id=4e7549789b14693eda4e019faaa0c446&redirect_uri=${window.location.protocol}//${window.location.host}&agencyid=0&imei=GEWO4536NGREGR`;
					var params = {
						"code": code,
						"redirect_uri": redirect
					};
					axios.post(url, params).then(function (response) {
						var user_save = response.data.data;
						user_save.expired = new Date();
						localStorage.setItem("user", JSON.stringify(user_save));
						_this.setState({ user: response.data.data });
						_this.props.getData(user_save.access_token).then(function () {
							var newurl = "https://splay.vn:3003/userinfo";
							axios.post(newurl, { account: _this.props.data.accountNumber, messid: fb_mess }).then(function (response1) {
								console.log(response1);
								// window.location.replace(`${window.location.protocol}//${window.location.host}/loginwidget1`);
							});
						});
					}).catch(function (error) {
						_this.props.setStatusServer();
						localStorage.removeItem("user");
						localStorage.removeItem("userInfo");
						_this.setState({ auth: false });
					})
				}
			}
		}
	}


	render() {
		// const { classes } = this.props;
		
		return (
			<div></div>
		);
	}
}

const mapStateToProps = state => ({
	data: state.profile.data,
	waiting: state.profile.waiting,
	title: state.global.title,
})

const mapDispatchToProps = dispatch => bindActionCreators({
	getData,
	changeTitle,
	setStatusServer
}, dispatch)

// MenuAppBar.propTypes = {
// 	classes: PropTypes.object.isRequired,
// };

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(MenuAppBar));