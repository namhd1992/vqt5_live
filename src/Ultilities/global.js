class Ultilities {
	static parse_query_string = (name, url) => {
		name = name.replace(/[[\]]/g, "\\$&");
		var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
			results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, " "));
	};

	static get_by_field = (array, field, value) => {
		array.forEach((item, key) => {
			if (item[key] === value) {
				return item;
			}
		});
		return null;
	}

	static object_exist = (array, field, value) => {
		var returnval = false;
		array.forEach((item, key) => {
			if (item[field] === value) {
				returnval = true;
			}
		});
		return returnval;
	}

	static shuffle = (array) => {
		var currentIndex = array.length, temporaryValue, randomIndex;
		// While there remain elements to shuffle...
		while (0 !== currentIndex) {
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;
			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}
		return array;
	}

	static getMobileOperatingSystem = (userAgent) => {
		if (/android/i.test(userAgent)) {
			return "android";
		}
		if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
			return "ios";
		}
		return "unknown";
	}

	static base_url = () => {
		//live
			return "https://server-event.splay.vn/";
		//dev
		// 	return "http://171.244.14.44:9093/";
	}

	static splay_api_key = () => {
		return "c6abc17003bf55d1cee3ab40bd7e2683";
	}
}

export default Ultilities;