// ** React Imports
import { Fragment, useState, useEffect } from 'react';

// ** Invoice List Sidebar
import Sidebar from './Sidebar';

// ** Columns
import { columns } from './columns';

// ** Store & Actions
import { getAllData, getData } from '../store/action';
import { useDispatch, useSelector } from 'react-redux';

// ** Third Party Components
import ReactPaginate from 'react-paginate';
import { ChevronDown } from 'react-feather';
import DataTable from 'react-data-table-component';
import { Card, CardHeader } from 'reactstrap';

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/tables/react-dataTable-component.scss';

const AppSetingsListt = () => {
	// ** Store Vars
	const dispatch = useDispatch();
	const store = useSelector((state) => state.appSettings);

	// ** States
	const [searchTerm, setSearchTerm] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [currentRole, setCurrentRole] = useState({
		value: '',
		label: 'Select Role',
	});

	const [currentStatus, setCurrentStatus] = useState({
		value: '',
		label: 'Select Status',
		number: 0,
	});

	// ** Function to toggle sidebar
	const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

	// ** Get data on mount
	useEffect(() => {
		dispatch(getAllData());
		dispatch(
			getData({
				// page: currentPage,
				// perPage: rowsPerPage,
				// role: currentRole.value,
				// status: currentStatus.value,
				// q: searchTerm,
			})
		);
	}, [dispatch]);

	// ** Function in get data on page change
	const handlePagination = (page) => {
		dispatch(
			getData({
				page: page.selected + 1,
				perPage: rowsPerPage,
				role: currentRole.value,
				status: currentStatus.value,
				q: searchTerm,
			})
		);
		setCurrentPage(page.selected + 1);
	};

	// ** Function in get data on rows per page
	const handlePerPage = (e) => {
		const value = parseInt(e.currentTarget.value);
		dispatch(
			getData({
				page: currentPage,
				perPage: value,
				role: currentRole.value,
				status: currentStatus.value,
				q: searchTerm,
			})
		);
		setRowsPerPage(value);
	};

	// ** Custom Pagination
	const CustomPagination = () => {
		const count = Number((store.total / rowsPerPage).toFixed(0));

		return (
			<ReactPaginate
				previousLabel={''}
				nextLabel={''}
				pageCount={count || 1}
				activeClassName="active"
				forcePage={currentPage !== 0 ? currentPage - 1 : 0}
				onPageChange={(page) => handlePagination(page)}
				pageClassName={'page-item'}
				nextLinkClassName={'page-link'}
				nextClassName={'page-item next'}
				previousClassName={'page-item prev'}
				previousLinkClassName={'page-link'}
				pageLinkClassName={'page-link'}
				containerClassName={
					'pagination react-paginate justify-content-end my-2 pr-1'
				}
			/>
		);
	};

	// ** Table data to render
	const dataToRender = () => {
		const filters = {
			role: currentRole.value,
			status: currentStatus.value,
			q: searchTerm,
		};

		const isFiltered = Object.keys(filters).some(function (k) {
			return filters[k].length > 0;
		});

		if (store?.data?.length > 0) {
			return store?.data;
		} else if (store?.data?.length === 0 && isFiltered) {
			return [];
		} else {
			return store.allData;
			// return store?.allData?.slice(0, rowsPerPage);
		}
	};

	return (
		<Fragment>
			<Card>
				<CardHeader>
					<h4>App Settings</h4>
				</CardHeader>
			</Card>
			<Card>
				<DataTable
					title="APP SETTINGS"
					noHeader
					pagination
					subHeader
					responsive
					paginationServer
					columns={columns}
					sortIcon={<ChevronDown />}
					className="react-dataTable"
					paginationComponent={CustomPagination}
					data={dataToRender()}
				/>
			</Card>

			<Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
		</Fragment>
	);
};

export default AppSetingsListt;
