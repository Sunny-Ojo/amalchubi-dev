// ** Routes Imports

import DashboardRoutes from './Dashboards';

import AppSettings from './AppSettings';
import Users from './Users';
import ProfessionsRoutes from './Professions';
import UserRoutes from './Users';
import BlogRoutes from './Blog';
import PagesRoutes from './Pages';
import AppRoutes from './Apps';
import PostRoutes from './Post';
// ** Document title
const TemplateTitle = '%s - Admin Dashboard';
// ** Default Route
const DefaultRoute = '/dashboard';

// ** Merge Routes
const Routes = [
	...AppRoutes,
	...BlogRoutes,
	...AppSettings,
	...ProfessionsRoutes,
	...DashboardRoutes,
	...UserRoutes,
	...Users,
	...PostRoutes,
	...PagesRoutes,
	// ...PagesRoutes,
	// ...UiElementRoutes,
	// ...ExtensionsRoutes,
	// ...PageLayoutsRoutes,
	// ...FormRoutes,
	// ...TablesRoutes,
	// ...ChartMapsRoutes,
];

export { DefaultRoute, TemplateTitle, Routes };
