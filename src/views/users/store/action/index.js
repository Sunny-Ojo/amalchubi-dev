import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

import { swal } from '@utils';
import axiosClient from '../../../../services/axios';
import {
	deleteUserUrl,
	listUsersUrl,
	viewUserUrl,
} from '../../../../router/api-routes';
// ** Get all Data
export const getAllData = () => {
	return async (dispatch) => {
		try {
			const { data } = await axiosClient(listUsersUrl);
			dispatch({
				type: 'GET_ALL_DATA',
				data: data?.message?.users,
			});
		} catch (error) {
			console.error(error);
		}
	};
};

// ** Get data on page or row change
export const getData = (params) => {
	return async (dispatch) => {
		try {
			const { data } = await axiosClient(
				listUsersUrl + `?page=${params?.page}`
			);
			dispatch({
				type: 'GET_DATA',
				data: data?.message?.users,
				totalPages: data?.message?.totalItems,
				params,
			});
		} catch (error) {
			console.error(error);
		}
	};
};

// ** Get User
export const getUser = (id) => {
	return async (dispatch) => {
		try {
			const { data } = await axiosClient(viewUserUrl(id));
			dispatch({
				type: 'GET_USER',
				selectedUser: data?.message,
			});
		} catch (error) {
			console.error(error);
		}
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
