import axios from 'axios';
import { apiRequest } from '../../../../services/apiRequest';
// ** Get all Data
export const getAllData = () => {
	return async (dispatch) => {
		await axios.get('http://localhost:4000/app-settings').then((response) => {
			dispatch({
				type: 'GET_ALL_DATA',
				data: response.data,
				// data,
			});
		});
	};
};

// ** Get data on page or row change
export const getData = ({ id = 1 }) => {
	return async (dispatch) => {
		await axios
			.get(`http://localhost:4000/app-settings/${id}`)
			.then((response) => {
				console.log(response.data);
				dispatch({
					type: 'GET_DATA',
					data: response.data,
					// data: response.data.users,
					// totalPages: response.data.total,
				});
			});
	};
};
// ** Get data on page or row change
export const updateSettings = (params) => {
	const { primary_color, secondary_color, default_currency, logo, name, id } =
		params;
	const formData = new FormData();
	formData.append('name', name);
	formData.append('primary_color', primary_color);
	formData.append('secondary_color', secondary_color);
	formData.append('default_currency', default_currency);
	formData.append('logo', logo);
	return async (dispatch) => {
		const response = await axios.patch(
			'http://localhost:4000/app-settings/1',
			{
				name,
				primary_color,
				secondary_color,
				default_currency,
				logo,
				id,
			},
			{
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			}
		);
		dispatch({
			type: 'UPDATE_SETTINGS',
			data: response.data,
		});
		return response;
	};
};
