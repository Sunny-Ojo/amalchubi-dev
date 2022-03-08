import { lazy } from 'react';
const BlogRoutes = [
	{
		path: '/blogs/list',
		component: lazy(() => import('../../views/blogging/list')),
	},
	{
		path: '/blogs/add',
		component: lazy(() => import('../../views/blogging/add')),
	},

	{
		path: '/blogs/edit/:id',
		component: lazy(() => import('../../views/blogging/edit')),
		meta: {
			navLink: '/blogs/edit',
		},
	},

	{
		path: '/blogs/view/:id',
		component: lazy(() => import('../../views/blogging/view')),
		meta: {
			navLink: '/blogs/view/',
		},
	},
];
export default BlogRoutes;
