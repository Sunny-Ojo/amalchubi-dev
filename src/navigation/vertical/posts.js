import {
	Mail,
	MessageSquare,
	CheckSquare,
	Calendar,
	FileText,
	Circle,
	ShoppingCart,
	User,
} from 'react-feather';

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
				navLink: '/pages/blog/list',
			},
			{
				id: 'newPost',
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
