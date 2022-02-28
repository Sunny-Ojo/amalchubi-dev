import { lazy } from 'react';
import { Redirect } from 'react-router-dom';
const AppRoutes = [
	{
		path: '/users/list',
		component: lazy(() => import('../../views/users/list')),
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
export default AppRoutes;
