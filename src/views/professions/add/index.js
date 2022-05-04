// ** React Imports
import { useState, useEffect, Fragment } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';

// ** Store & Actions
import { getProfession } from '../store/action';
import { useSelector, useDispatch } from 'react-redux';
import Breadcrumbs from '@components/breadcrumbs';

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
	Button,
} from 'reactstrap';

// ** Styles
import '@styles/react/apps/app-users.scss';
import { AvForm, AvInput } from 'availity-reactstrap-validation-safe';
import { addProfessionUrl } from '../../../router/api-routes';
import { swal } from '../../../utility/Utils';
import axiosClient from '../../../services/axios';

const AddProfession = () => {
	const [profession, setProfession] = useState({
		title: '',
		content: '',
		status: '',
	});

	const handleChangeInput = (e) => {
		const { name, value } = e.target;
		setProfession({ ...profession, [name]: value });
	}; // ** Function to toggle tabs

	const history = useHistory();
	const dispatch = useDispatch();
	const [isSbumitting, setIsSbumitting] = useState(false);
	const onSubmit = async (event, errors) => {
		if (!errors.length) {
			event.preventDefault();
			const formData = new FormData();
			setIsSbumitting(true);
			formData.append('title', profession?.title);
			formData.append('description', profession?.content);
			formData.append('status', profession?.status);
			try {
				const response = await axiosClient.post(addProfessionUrl, formData);

				if (response?.status === 201 || 200) {
					swal('Great job!', 'Profession has been created', 'success');
					history.push(`/professions/list`);
				} else {
					swal(
						'Oops!',
						"if you aren't redirected, something wrong must have happened",
						'error'
					);
				}
			} catch (error) {
				setIsSbumitting(false);
				swal('Oops!', error?.response?.data?.message, 'error');
				console.error(error);
			}
		}
	};

	return (
		<Fragment>
			<Breadcrumbs
				breadCrumbTitle="Professions"
				breadCrumbParent="Professions Management"
				breadCrumbActive="Create"
			/>
			<Row className="app-user-edit">
				<Col sm="12">
					<Card>
						<CardBody className="pt-2">
							<AvForm onSubmit={onSubmit}>
								<Row>
									<Col md="6">
										<FormGroup>
											<Label for="title">Title</Label>
											<AvInput
												name="title"
												id="title"
												placeholder="Doctor"
												onChange={(e) => handleChangeInput(e)}
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
												<option value="false">False</option>
												<option value="true">True</option>
											</AvInput>
										</FormGroup>
									</Col>
									<Col md="12">
										<FormGroup>
											<Label for="content">Content</Label>
											<AvInput
												name="content"
												id="content"
												onChange={(e) => handleChangeInput(e)}
												placeholder="Content for profession"
												required
												type="textarea"
											/>
										</FormGroup>
									</Col>
									<Col>
										<Button.Ripple color="primary">
											{isSbumitting
												? 'Creating Profession'
												: 'Create Profession'}
										</Button.Ripple>
									</Col>
								</Row>
							</AvForm>
						</CardBody>
					</Card>
				</Col>
			</Row>
		</Fragment>
	);
};
export default AddProfession;
