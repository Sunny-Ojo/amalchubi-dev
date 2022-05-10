import { Circle } from 'react-feather';

export default [
	// {
	// 	header: 'Posts',
	// },
	{
		id: 'posts',
		title: 'Posts',
		icon: <Circle size={12} />,
		children: [
			{
				id: 'postsList',
				title: 'List',
				permissions: ['admin', 'editor'],
				navLink: '/posts/list',
			},
			{
				id: 'newPost',
				title: 'Add New',
				permissions: ['admin', 'editor'],
				navLink: '/posts/add',
			},
		],
	},
];
