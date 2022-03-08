import axios from 'axios';

const data = [
	{
		id: 1,
		primary_color: 'Green',
		secondary_color: 'white',
		default_currency: 'NGN',
		logo: 'logo.png',
		name: 'App Settings',
	},
];
// ** Get all Data
export const getAllData = () => {
	return async (dispatch) => {
		await axios.get('/api/users/list/all-data').then((response) => {
			dispatch({
				type: 'GET_ALL_DATA',
				// data: response.data,
				data,
			});
		});
	};
};

// ** Get data on page or row change
export const getData = (params) => {
	return async (dispatch) => {
		await axios.get('/api/users/list/data', params).then((response) => {
			dispatch({
				type: 'GET_DATA',
				data,
				// data: response.data.users,
				// totalPages: response.data.total,
				params,
			});
		});
	};
};
