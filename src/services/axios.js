import axios from 'axios';
const accessToken = JSON.parse(localStorage.getItem('userData'))?.accessToken;
const refreshToken = JSON.parse(localStorage.getItem('userData'))?.refreshToken;
// console.log('accesstoke', accessToken);
// console.log('accesstokekkk', refreshToken);
const axiosClient = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	headers: {
		Authorization: `Bearer ${accessToken}`,
		'x-refresh-token': `${refreshToken}`,
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
	responseType: 'json',
});

export default axiosClient;
