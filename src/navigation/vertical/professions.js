import { Circle } from 'react-feather';

export default [
	// {
	// 	header: 'Blog',
	// },
	{
		id: 'professions',
		title: 'Professions',
		icon: <Circle size={12} />,
		children: [
			{
				id: 'professionsList',
				title: 'List',
				permissions: ['admin', 'editor'],
				navLink: '/pages/blog/list',
			},
			{
				id: 'addNewProfession',
				title: 'Add New',
				permissions: ['admin', 'editor'],
				navLink: '/pages/blog/detail',
			},
			// {
			// 	id: 'blogEdit',
			// 	title: 'Edit',
			// 	permissions: ['admin', 'editor'],
			// 	navLink: '/pages/blog/edit',
			// },
		],
	},
];
