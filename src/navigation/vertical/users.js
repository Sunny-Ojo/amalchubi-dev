import { User, Bold, Circle } from 'react-feather';

export default [
	{
		id: 'users',
		title: 'Users',
		icon: <User size={20} />,
		children: [
			{
				id: 'list',
				title: 'List',
				icon: <Circle size={12} />,
				navLink: '/users/list',
			},
			{
				title: 'New User',
				icon: <Circle size={12} />,
				navLink: '/users/add/',
			},
		],
	},
];
