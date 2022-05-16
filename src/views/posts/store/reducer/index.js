// ** Initial State
const initialState = {
	allData: [],
	data: [],
	total: 1,
	params: {},
	selectedBlog: null,
};

const blogs = (state = initialState, action) => {
	switch (action.type) {
		case 'GET_ALL_DATA':
			return { ...state, allData: action.data };
		case 'GET_DATA':
			return {
				...state,
				data: action.data,
				total: action.totalPages,
				// params: action.params,
			};
		case 'GET_BLOG':
			return { ...state, selectedBlog: action.selectedBlog };

		default:
			return { ...state };
	}
};
export default blogs;
