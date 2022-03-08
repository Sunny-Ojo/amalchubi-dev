import {
	Mail,
	MessageSquare,
	CheckSquare,
	Calendar,
	FileText,
	Circle,
	ShoppingCart,
	User,
	Bold,
} from 'react-feather';

export default [
	// {
	// 	header: 'Blog',
	// },
	{
		id: 'blog',
		title: 'Blog',
		icon: <Bold size={12} />,

		children: [
			{
				id: 'blogList',
				title: 'List',
				permissions: ['admin', 'editor'],
				navLink: '/blogs/list',
			},
			{
				id: 'blogDetail',
				title: 'Add New',
				permissions: ['admin', 'editor'],
				navLink: '/blogs/add',
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
