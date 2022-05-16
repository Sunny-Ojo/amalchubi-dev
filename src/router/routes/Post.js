import { lazy } from 'react';
const PostRoutes = [
	{
		path: '/posts/list',
		component: lazy(() => import('../../views/posts/list')),
	},
	{
		path: '/posts/add',
		component: lazy(() => import('../../views/posts/add')),
	},

	{
		path: '/post/edit/:id',
		component: lazy(() => import('../../views/posts/edit')),
		meta: {
			navLink: '/posts/edit',
		},
	},

	{
		path: '/post/view/:id',
		component: lazy(() => import('../../views/posts/view')),
		meta: {
			navLink: '/posts/view/',
		},
	},
];
export default PostRoutes;
