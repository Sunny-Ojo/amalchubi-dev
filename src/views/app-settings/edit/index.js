import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Breadcrumbs from '@components/breadcrumbs';

import {
	Row,
	Col,
	Card,
	CardBody,
	Label,
	FormGroup,
	Button,
	Nav,
	NavItem,
	NavLink,
} from 'reactstrap';
import '@styles/react/apps/app-users.scss';

import { AvForm, AvInput } from 'availity-reactstrap-validation-safe';
import { swal } from '../../../utility/Utils';
import ImageUploader from '../../../services/ImageUploader';
import { getAllData, getData, updateSettings } from '../store/action';

const AppsettingsEdit = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const history = useHistory();
	useEffect(() => {
		dispatch(getData(parseInt(id)));
	}, [dispatch]);

	const { data } = useSelector((state) => state.appSettings);

	const [settings, setSettings] = useState({
		primary_color: data?.primary_color || '',
		secondary_color: data?.secondary_color || '',
		logo: data?.logo || '',
		name: data?.name || '',
		default_currency: data?.default_currency || '',
	});
	const handleChangeImage = (data) => {
		setSettings({ ...settings, logo: data });
	};
	const handleChangeInput = (e) => {
		const { name, value } = e.target;
		setSettings({ ...setSettings, [name]: value });
	};
	const onSubmit = async (event, errors) => {
		if (errors && !errors.length) {
			const response = await dispatch(updateSettings(settings));
			if (response) {
				swal(
					'Successfully updated',
					'App settings has been updated successfully',
					'success'
				);
				history.push('/app-settings');
			} else {
				swal('Oops!', 'An error occured', 'error');
			}
			console.log('result', response);
		} else {
			event.preventDefault();
			swal(
				'Error',
				'Validation failed, please check the form and fill all fields correctly',
				'error'
			);
		}
	};

	return (
		<div className="">
			<Breadcrumbs
				breadCrumbTitle="App Settings Edit"
				breadCrumbParent="App Setting"
				breadCrumbActive="Edit"
			/>
			<Row className="app-user-edit">
				<Col sm="12">
					<Card>
						<CardBody className="pt-2">
							<Nav pills>
								<NavItem>
									<NavLink active={'1' === '1'}>
										<span className="align-middle d-none d-sm-block">
											Update App Settings
											{JSON.stringify(settings)}
										</span>
									</NavLink>
								</NavItem>
							</Nav>
							<AvForm onSubmit={onSubmit}>
								<Row>
									<Col md="12">
										<FormGroup>
											{/* <Label for="logo">Logo</Label> */}

											<ImageUploader
												title="Change Logo"
												photo={settings?.logo}
												handleChangeImage={handleChangeImage}
											/>
										</FormGroup>
									</Col>
									<Col md="6">
										<FormGroup>
											<Label for="name">Name</Label>
											<AvInput
												id="name"
												placeholder="Setings Name"
												name="name"
												defaultValue={data.name}
												required
												onChange={(e) => handleChangeInput(e)}
											></AvInput>
										</FormGroup>
									</Col>
									<Col md="6">
										<FormGroup>
											<Label for="default_currency">Default Currency</Label>
											<AvInput
												type="select"
												id="default_currency"
												name="default_currency"
												required
												defaultValue={data.default_currency}
												onChange={(e) => handleChangeInput(e)}
											>
												<option value="NGN">NGN</option>
												<option value="USD">USD</option>
											</AvInput>
										</FormGroup>
									</Col>
									<Col md="6">
										<FormGroup>
											<Label for="primary_color">Primary Color</Label>
											<AvInput
												name="primary_color"
												id="primary_color"
												placeholder="Primary Color"
												defaultValue={data.primary_color}
												onChange={(e) => handleChangeInput(e)}
												required
											/>
										</FormGroup>
									</Col>
									<Col md="6">
										<FormGroup>
											<Label for="secondary_color">Secondary Color</Label>
											<AvInput
												name="secondary_color"
												id="secondary_color"
												defaultValue={data.secondary_color}
												placeholder="Secondary Color"
												onChange={(e) => handleChangeInput(e)}
												required
											/>
										</FormGroup>
									</Col>

									<Col>
										<Button.Ripple color="primary">
											Update Settings
										</Button.Ripple>
									</Col>
								</Row>
							</AvForm>
						</CardBody>
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export default AppsettingsEdit;
