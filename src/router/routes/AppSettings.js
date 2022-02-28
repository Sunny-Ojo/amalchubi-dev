import { lazy } from 'react';

const AppSettings = [
	{
		path: '/app-settings',
		exact: true,
		// className: 'email-application',
		component: lazy(() => import('../../views/app-settings/list')),
	},

	{
		path: '/app-settings/edit/:id',
		exact: true,
		appLayout: true,
		// className: 'email-application',
		component: lazy(() => import('../../views/app-settings/edit')),
		// meta: {
		// 	navLink: '/apps/email',
		// },
	},
];

export default AppSettings;
