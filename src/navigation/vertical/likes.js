import { User, Bold, Circle } from 'react-feather';

export default [
	// {
	// 	header: 'Blog',
	// },
	{
		id: 'users',
		title: 'Users',
		icon: <User size={20} />,
		children: [
			{
				id: 'list',
				title: 'List',
				icon: <Circle size={12} />,
				navLink: '/apps/user/list',
			},
			{
				id: 'view',
				title: 'New User',
				icon: <Circle size={12} />,
				navLink: '/apps/user/view',
			},
		],
	},
];
