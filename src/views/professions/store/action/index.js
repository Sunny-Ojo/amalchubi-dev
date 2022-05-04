import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

import { swal } from '@utils';
import axiosClient from '../../../../services/axios';
import { listProfessionsUrl } from '../../../../router/api-routes';
// ** Get all Data

export const getAllData = () => {
	return async (dispatch) => {
		try {
			const { data } = await axiosClient(listProfessionsUrl);
			dispatch({
				type: 'GET_ALL_DATA',
				data: data?.message?.professions,
			});
		} catch (error) {
			console.error(error);
		}
	};
};

// ** Get data on page or row change
export const getData = (params) => {
	return async (dispatch) => {
		await axiosClient(listProfessionsUrl, params).then((response) => {
			dispatch({
				type: 'GET_DATA',
				data: response?.message?.users,
				totalPages: response?.message?.totalItems,
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
