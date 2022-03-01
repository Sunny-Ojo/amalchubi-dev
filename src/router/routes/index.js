// ** Routes Imports
import FormRoutes from './Forms';
import PagesRoutes from './Pages';
import TablesRoutes from './Tables';
import ChartMapsRoutes from './ChartsMaps';
import DashboardRoutes from './Dashboards';
import UiElementRoutes from './UiElements';
import ExtensionsRoutes from './Extensions';
import PageLayoutsRoutes from './PageLayouts';
import AppSettings from './AppSettings';
import Users from './Users';
import ProfessionsRoutes from './Professions';
import UserRoutes from './Users';
// ** Document title
const TemplateTitle = '%s - Vuexy React Admin Template';

// ** Default Route
const DefaultRoute = '/dashboard/ecommerce';

// ** Merge Routes
const Routes = [
	...AppSettings,
	...ProfessionsRoutes,
	...DashboardRoutes,
	...UserRoutes,
	...Users,
	...PagesRoutes,
	...UiElementRoutes,
	...ExtensionsRoutes,
	...PageLayoutsRoutes,
	...FormRoutes,
	...TablesRoutes,
	...ChartMapsRoutes,
];

export { DefaultRoute, TemplateTitle, Routes };
