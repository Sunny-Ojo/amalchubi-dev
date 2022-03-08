import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

import { swal } from '@utils';
import axiosClient from '../../../../services/axios';
// ** Get all Data
const blog = [
	{
		id: 1,
		title: 'Cooking',
		content: '<p><b>gvsdfgffg</b></p>',
		published_at: '12-123',
		expired_at: null,
	},
	{
		id: 2,
		title: 'fvdvd',
		content: 'gfgfdfbdregfg',
		published_at: '12-123',
		expired_at: null,
	},
	{
		id: 3,
		title: 'fvfd',
		content: 'gfgffgvdv',
		published_at: '12-123',
		expired_at: null,
	},
	{
		id: 4,
		title: 'fvsdvsdv',
		content: 'gfgffg',
		published_at: '12-123',
		expired_at: null,
	},
	{
		id: 5,
		title: 'fvvsd',
		content: 'gfgfdvfdfg',
		published_at: '12-123',
		expired_at: null,
	},
	{
		id: 6,
		title: 'fvf',
		content: 'gfgsfdvffg',
		published_at: '12-123',
		expired_at: null,
	},
];
export const getAllData = () => {
	return async (dispatch) => {
		await axios.get('/api/users/list/all-data').then((response) => {
			dispatch({
				type: 'GET_ALL_DATA',
				// data: response.data,
				data: blog,
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
				data: blog,
				// totalPages: response.data.total,
				totalPages: blog.length,
				params,
			});
		});
	};
};

// ** Get User
export const getBlog = (id) => {
	return async (dispatch) => {
		await axios
			.get('/api/users/user', { id })
			.then((response) => {
				dispatch({
					type: 'GET_BLOG',
					selectedBlog: blog.filter((pro) => pro.id === id)?.[0] || {},
				});
			})
			.catch((err) => console.log(err));
	};
};

// ** Delete User
export const deleteBlog = (id) => {
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
