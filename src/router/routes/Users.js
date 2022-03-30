import { lazy } from 'react';
import { Redirect } from 'react-router-dom';
const UserRoutes = [
	{
		path: '/users/list',
		component: lazy(() => import('../../views/users/list')),
	},
	{
		path: '/users/add',
		component: lazy(() => import('../../views/users/add')),
	},

	{
		path: '/user/edit/:id',
		component: lazy(() => import('../../views/users/edit')),
		meta: {
			navLink: '/user/edit',
		},
	},

	{
		path: '/user/view/:id',
		component: lazy(() => import('../../views/users/view')),
		meta: {
			navLink: '/user/view/',
		},
	},
];
export default UserRoutes;
