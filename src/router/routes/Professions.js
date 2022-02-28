import { lazy } from 'react';
import { Redirect } from 'react-router-dom';
const ProfessionsRoutes = [
	{
		path: '/professions/list',
		component: lazy(() => import('../../views/professions/list')),
	},

	{
		path: '/professions/edit/:id',
		component: lazy(() => import('../../views/professions/edit')),
		meta: {
			navLink: '/professions/edit',
		},
	},

	{
		path: '/professions/view/:id',
		component: lazy(() => import('../../views/professions/view')),
		meta: {
			navLink: '/professions/view/',
		},
	},
];
export default ProfessionsRoutes;
