// ** Redux Imports
import { combineReducers } from 'redux';

// ** Reducers Imports
import auth from './auth';
import navbar from './navbar';
import layout from './layout';
import chat from '@src/views/apps/chat/store/reducer';
import todo from '@src/views/apps/todo/store/reducer';
import users from '@src/views/apps/user/store/reducer';
import email from '@src/views/apps/email/store/reducer';
import blogs from '@src/views/blogging/store/reducer';
import professions from '@src/views/professions/store/reducer';
import invoice from '@src/views/apps/invoice/store/reducer';
import calendar from '@src/views/apps/calendar/store/reducer';
import ecommerce from '@src/views/apps/ecommerce/store/reducer';
import dataTables from '@src/views/tables/data-tables/store/reducer';
import appSettings from '../../views/app-settings/store/reducer';

const rootReducer = combineReducers({
	auth,
	appSettings,
	todo,
	chat,
	email,
	users,
	blogs,
	navbar,
	professions,
	layout,
	invoice,
	calendar,
	ecommerce,
	dataTables,
});

export default rootReducer;
