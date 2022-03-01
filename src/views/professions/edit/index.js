// ** React Imports
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

// ** Store & Actions
import { getProfession } from '../store/action';
import { useSelector, useDispatch } from 'react-redux';

// ** Third Party Components
import { User, Info, Share2 } from 'react-feather';
import {
	Card,
	CardBody,
	Row,
	Col,
	Nav,
	NavItem,
	NavLink,
	TabContent,
	TabPane,
	Alert,
	Label,
	FormGroup,
} from 'reactstrap';

// ** Styles
import '@styles/react/apps/app-users.scss';
import { AvForm, AvInput } from 'availity-reactstrap-validation-safe';

const handleChangeInput = (e) => {
	const { name, value } = e.target;
	setProfession({ ...profession, [name]: value });
};
const onSubmit = (event, errors) => {
	if (!errors.length) {
		console.log(event);
		// toggleSidebar();
	}
	event.preventDefault();
};
const ProfessionEdit = () => {
	// ** States & Vars
	const [activeTab, setActiveTab] = useState('1'),
		store = useSelector((state) => state.professions),
		dispatch = useDispatch(),
		{ id } = useParams();

	// ** Function to toggle tabs
	const toggle = (tab) => setActiveTab(tab);

	// ** Function to get user on mount
	useEffect(() => {
		dispatch(getProfession(parseInt(id)));
	}, [dispatch]);
	const [profession, setProfession] = useState({
		name: store.selectedProfession?.name || '',
		description: store.selectedProfession?.description || '',
		status: store.selectedProfession?.status || '',
	});

	return store.selectedProfession !== null &&
		store.selectedProfession !== undefined ? (
		<Row className="app-user-edit">
			<Col sm="12">
				<Card>
					<CardBody className="pt-2">
						<Nav pills>
							<NavItem>
								<NavLink active={activeTab === '1'} onClick={() => toggle('1')}>
									<User size={14} />
									<span className="align-middle d-none d-sm-block">
										Edit Profession Details
									</span>
								</NavLink>
							</NavItem>
						</Nav>
						<AvForm onSubmit={onSubmit}>
							<Col md="6">
								<FormGroup>
									<Label for="name">Name</Label>
									<AvInput
										name="name"
										id="name"
										placeholder="Doctor"
										value={profession.name}
										onChange={(e) => handleChangeInput(e)}
										required
									/>
								</FormGroup>
							</Col>
							<Col md="6">
								<FormGroup>
									<Label for="description">Description</Label>
									<AvInput
										name="description"
										id="description"
										value={profession.description}
										onChange={(e) => handleChangeInput(e)}
										placeholder="Australia"
										required
									/>
								</FormGroup>
							</Col>
							<Col md="6">
								<FormGroup>
									<Label for="status">Status</Label>
									<AvInput
										type="select"
										id="status"
										name="status"
										required
										onChange={(e) => handleChangeInput(e)}
									>
										<option value={profession.status}>
											{profession.status}
										</option>
										<option value="false">False</option>
										<option value="true">True</option>
									</AvInput>
								</FormGroup>
							</Col>
						</AvForm>
					</CardBody>
				</Card>
			</Col>
		</Row>
	) : (
		<Alert color="danger">
			<h4 className="alert-heading">Profession not found</h4>
			<div className="alert-body">
				Profession with id: {id} doesn't exist. Check list of all Profession:{' '}
				<Link to="/app/user/list">Profession List</Link>
			</div>
		</Alert>
	);
};
export default ProfessionEdit;
