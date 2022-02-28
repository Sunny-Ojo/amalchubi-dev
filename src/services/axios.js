import axios from 'axios';

const axiosClient = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	// baseURL: 'https://back.happymall.ng/api',
	headers: {
		'Content-Type': 'application/json',
		// 'Authorization': `Bearer ${cookie.get('jwt')}`
	},
});

export default axiosClient;
