import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

import { swal } from '@utils';
import axiosClient from '../../../../services/axios';
import { deleteUserUrl } from '../../../../router/api-routes';
// ** Get all Data
export const getAllData = () => {
	return async (dispatch) => {
		await axios.get('http://localhost:4000/users').then((response) => {
			dispatch({
				type: 'GET_ALL_DATA',
				data: response.data,
			});
		});
	};
};

// ** Get data on page or row change
export const getData = (params) => {
	return async (dispatch) => {
		await axios.get('http://localhost:4000/users', params).then((response) => {
			dispatch({
				type: 'GET_DATA',
				data: response.data,
				totalPages: response.data.length,
				params,
			});
		});
	};
};

// ** Get User
export const getUser = (id) => {
	return async (dispatch) => {
		await axios
			// .get(`http://localhost/users/${id}`, { id })
			.get(`http://127.0.0.1:4000/users/${id}`)
			.then((response) => {
				dispatch({
					type: 'GET_USER',
					selectedUser: response.data,
				});
			})
			.catch((err) => console.log(err));
	};
};

// ** Delete User
export const deleteUser = (id) => {
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
				const response = axiosClient.delete(deleteUserUrl(id));
				MySwal.fire({
					icon: 'success',
					title: 'Deleted!',
					text: 'Action ran successfully.',
					customClass: {
						confirmButton: 'btn btn-success',
					},
				});
				return response;
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
