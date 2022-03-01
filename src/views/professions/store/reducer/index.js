// ** Initial State
const initialState = {
	allData: [],
	data: [],
	total: 1,
	params: {},
	selectedProfession: null,
};

const professions = (state = initialState, action) => {
	switch (action.type) {
		case 'GET_ALL_DATA':
			return { ...state, allData: action.data };
		case 'GET_DATA':
			return {
				...state,
				data: action.data,
				total: action.totalPages,
				params: action.params,
			};
		case 'GET_PROFESSION':
			return { ...state, selectedProfession: action.selectedProfession };

		default:
			return { ...state };
	}
};
export default professions;
