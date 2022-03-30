// ** Initial State
const initialState = {
	allData: [],
	data: [],
	total: 1,
	selectedData: null,
};

const appSettings = (state = initialState, action) => {
	switch (action.type) {
		case 'GET_ALL_DATA':
			return { ...state, allData: action.data };
		case 'GET_DATA':
			return {
				...state,
				data: action.data,
				// total: action.totalPages,
			};
		case 'UPDATE_SETTINGS':
			return { ...state, data: action.data };
		default:
			return { ...state };
	}
};
export default appSettings;
