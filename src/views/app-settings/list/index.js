// ** User List Component
import Table from './Table';

// ** Styles
import '@styles/react/apps/app-users.scss';
import Breadcrumbs from '@components/breadcrumbs';

const AppsettingsList = () => {
	return (
		<div className="app-user-list">
			<Breadcrumbs
				breadCrumbTitle="App Settings"
				breadCrumbParent="App Settings"
				breadCrumbActive="List"
			/>
			<Table />
		</div>
	);
};

export default AppsettingsList;
