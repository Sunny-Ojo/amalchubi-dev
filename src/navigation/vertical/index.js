// ** Navigation sections imports
import apps from './apps';
import pages from './pages';
import forms from './forms';
import tables from './tables';
import blogs from './blogs';
import others from './others';
import dashboards from './dashboards';
import uiElements from './ui-elements';
import chartsAndMaps from './charts-maps';
import posts from './posts';
import appSettings from './app-settings';
import professions from './professions';
import users from './users';

// ** Merge & Export
export default [
	...dashboards,
	...appSettings,
	...users,
	...professions,
	...blogs,
	...posts,

	// ...pages,
	// ...uiElements,
	// ...forms,
	// ...tables,
	// ...chartsAndMaps,
	// ...others,
];
