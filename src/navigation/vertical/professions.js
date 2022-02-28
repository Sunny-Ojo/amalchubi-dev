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
				navLink: '/professions/list',
			},
			{
				id: 'addNewProfession',
				title: 'Add New',
				permissions: ['admin', 'editor'],
				navLink: '/professions/add',
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
