// ** React Imports
import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

// ** Store & Actions
import { deleteUser, getUser } from '../store/action';
import { useSelector, useDispatch } from 'react-redux';

// ** Reactstrap
import { Row, Col, Alert } from 'reactstrap';

// ** User View Components
import PlanCard from './PlanCard';
import UserInfoCard from './UserInfoCard';
import UserTimeline from './UserTimeline';
// import InvoiceList from '../../invoice/list';
import PermissionsTable from './PermissionsTable';
import { useHistory } from 'react-router-dom';
// ** Styles
import '@styles/react/apps/app-users.scss';

const UserView = (props) => {
	// ** Vars
	const history = useHistory();
	const dispatch = useDispatch();
	const store = useSelector((state) => state.users),
		{ id } = useParams();

	const handleDeleteUser = async (id) => {
		const action = await dispatch(deleteUser(parseInt(id)));
		if (action) {
			history.push('/users/list');
		}
	};
	// ** Get suer on mount
	useEffect(() => {
		dispatch(getUser(parseInt(id)));
		console.log(store.selectedUser);
	}, [dispatch]);

	return store.selectedUser !== null && store.selectedUser !== undefined ? (
		<div className="app-user-view">
			<Row>
				<Col xl="9" lg="8" md="7">
					<UserInfoCard
						selectedUser={store.selectedUser}
						deleteUser={handleDeleteUser}
					/>
				</Col>
				<Col xl="3" lg="4" md="5">
					<PlanCard selectedUser={store.selectedUser} />
				</Col>
			</Row>
			<Row>
				<Col md="6">
					<UserTimeline />
				</Col>
				<Col md="6">
					<PermissionsTable />
				</Col>
			</Row>
			{/* <Row>
				<Col sm="12">
				<InvoiceList/>
				</Col>
			</Row> */}
		</div>
	) : (
		<Alert color="danger">
			<h4 className="alert-heading">Users not found</h4>
			<div className="alert-body">
				Users with id: {id} doesn't exist. Check list of all Users:{' '}
				<Link to="/users/list">Users List</Link>
			</div>
		</Alert>
	);
};
export default UserView;
