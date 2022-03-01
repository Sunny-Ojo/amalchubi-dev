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
		path: '/users/edit/:id',
		component: lazy(() => import('../../views/users/edit')),
		meta: {
			navLink: '/users/edit',
		},
	},

	{
		path: '/users/view/:id',
		component: lazy(() => import('../../views/users/view')),
		meta: {
			navLink: '/users/view/',
		},
	},
];
export default UserRoutes;
