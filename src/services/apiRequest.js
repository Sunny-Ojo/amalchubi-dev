import axios from 'axios';
export const apiRequest = ({ url, method, body, contentType }, dispatch) => {
	// const accessToken = Storage.getItem('nla-token');
	// console.log('accesstoken', accessToken)
	// const {accessToken} = userData
	return axios
		.request({
			url,
			method,
			// baseURL: apiUrl,
			data: body,
			headers: {
				// Authorization: `Bearer ${accessToken}`,
				Accept: 'application/json',
				'Content-Type': contentType,
			},
			responseType: 'json',
			validateStatus: (status) => {
				return status >= 200 && status < 500; // default
			},
		})
		.then((response) => {
			if (response.status === 401) {
				dispatch({
					type: 'LOGOUT',
				});
			}
			return response;
		})
		.catch((error) => {
			console.log('error', error);
		});
};
