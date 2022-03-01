import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

import { swal } from '@utils';
import axiosClient from '../../../../services/axios';
// ** Get all Data
const professions = [
	{ id: 1, name: 'fvvsd', description: 'gvsdfgffg', status: 'true' },
	{ id: 2, name: 'fvdvd', description: 'gfgfdfbdregfg', status: 'true' },
	{ id: 3, name: 'fvfd', description: 'gfgffgvdv', status: 'true' },
	{ id: 4, name: 'fvsdvsdv', description: 'gfgffg', status: 'true' },
	{ id: 5, name: 'fvvsd', description: 'gfgfdvfdfg', status: 'true' },
	{ id: 6, name: 'fvf', description: 'gfgsfdvffg', status: 'false' },
];
export const getAllData = () => {
	return async (dispatch) => {
		await axios.get('/api/users/list/all-data').then((response) => {
			dispatch({
				type: 'GET_ALL_DATA',
				// data: response.data,
				data: professions,
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
				// data: response.data.users,
				data: professions,
				totalPages: response.data.total,
				params,
			});
		});
	};
};

// ** Get User
export const getProfession = (id) => {
	return async (dispatch) => {
		await axios
			.get('/api/users/user', { id })
			.then((response) => {
				dispatch({
					type: 'GET_PROFESSION',
					// selectedProfession: response.data.user,
					selectedProfession:
						professions.filter((pro) => pro.id === id)?.[0] || [],
				});
			})
			.catch((err) => console.log(err));
	};
};

// ** Delete User
export const deleteProfession = (id) => {
	return async () => {
		await MySwal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Yes, delete it!',
			customClass: {
				confirmButton: 'btn btn-primary',
				cancelButton: 'btn btn-danger ml-1',
			},
			buttonsStyling: false,
		}).then(function (result) {
			if (result.value) {
				// axiosClient.delete()
				MySwal.fire({
					icon: 'success',
					title: 'Deleted!',
					text: 'Action ran successfully.',
					customClass: {
						confirmButton: 'btn btn-success',
					},
				});
			} else if (result.dismiss === MySwal.DismissReason.cancel) {
				MySwal.fire({
					title: 'Cancelled',
					text: 'Action has been cancelled',
					icon: 'error',
					customClass: {
						confirmButton: 'btn btn-success',
					},
				});
			}
		});
	};
};
