// ** React Imports
import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

// ** Store & Actions
import { deleteProfession, getProfession } from '../store/action';
import { useSelector, useDispatch } from 'react-redux';

// ** Reactstrap
import { Row, Col, Alert, CardBody, Card, CardHeader, Badge } from 'reactstrap';

// ** User View Components
import PlanCard from './PlanCard';
import UserInfoCard from './UserInfoCard';
import UserTimeline from './UserTimeline';
// import InvoiceList from '../../invoice/list';
import PermissionsTable from './PermissionsTable';

// ** Styles
import '@styles/react/apps/app-users.scss';

const ProfessionView = (props) => {
	// ** Vars
	const dispatch = useDispatch();
	const store = useSelector((state) => state.professions),
		{ id } = useParams();

	const handleDeleteUser = (id) => {
		dispatch(deleteUser(parseInt(id)));
	};
	// ** Get suer on mount
	useEffect(() => {
		dispatch(getProfession(parseInt(id)));
	}, [dispatch]);
	const statusObj = {
		pending: 'light-warning',
		active: 'light-success',
		inactive: 'light-secondary',
		blocked: 'light-danger',
	};
	return store.selectedProfession !== null &&
		store.selectedProfession !== undefined ? (
		<div className="app-user-view">
			<Row>
				<Col md="12">
					<Card className="-user-view">
						<CardHeader>
							<h2>
								Profession Details: {store.selectedProfession?.name || '-'}
							</h2>
						</CardHeader>

						<CardBody>
							<h4>
								Description: {store.selectedProfession?.description || '-'}
							</h4>
							Status:
							<Badge color={statusObj[store.selectedProfession?.status || '']}>
								{store.selectedProfession?.status || '-'}
							</Badge>
						</CardBody>
					</Card>
				</Col>
			</Row>
		</div>
	) : (
		<Alert color="danger">
			{JSON.stringify(store)}

			<h4 className="alert-heading">Profession not found</h4>
			<div className="alert-body">
				Profession with id: {id} doesn't exist. Check list of all Professions:{' '}
				<Link to="/professions/list">Professions List</Link>
			</div>
		</Alert>
	);
};
export default ProfessionView;
