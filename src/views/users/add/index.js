// ** React Imports
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

// ** Store & Actions
import { deleteUser, getUser } from '../store/action';
import { useSelector, useDispatch } from 'react-redux';

// ** Third Party Components
import {
	Button,
	FormGroup,
	Label,
	FormText,
	Card,
	CardBody,
	CardHeader,
	Media,
	Input,
} from 'reactstrap';
import { AvForm, AvInput } from 'availity-reactstrap-validation-safe';
// ** Reactstrap
import { Row, Col, Alert } from 'reactstrap';

// ** Styles
import '@styles/react/apps/app-users.scss';

const AddUser = (props) => {
	// ** Vars
	// const dispatch = useDispatch();
	// const store = useSelector((state) => state.users),
	// 	{ id } = useParams();

	// const handleDeleteUser = (id) => {
	// 	dispatch(deleteUser(parseInt(id)));
	// };
	const dispatch = useDispatch();

	const [newUser, setNewUser] = useState({
		avatar: '',
		firstName: '',
		lastName: '',
		email: '',
		phone_number: '',
		facebook_url: '',
		linkedin_url: '',
		facebook_url: '',
		royal_title: '',
		password: '',
		password_confirmation: '',
		roles: [],
	});

	const handleChangeInput = (e) => {
		const { name, value } = e.target;
		setNewUser({ ...newUser, [name]: value });
	};
	const onSubmit = (event, errors) => {
		if (!errors.length) {
			console.log(event);
			// toggleSidebar();
		}
		event.preventDefault();
	};
	// ** Get suer on mount
	// useEffect(() => {
	// 	dispatch(getUser(parseInt(id)));
	// }, [dispatch]);

	const onChangeImage = (e) => {
		const reader = new FileReader(),
			files = e.target.files;
		reader.onload = function () {
			setNewUser({ ...newUser, avatar: reader.result });
		};
		reader.readAsDataURL(files[0]);
	};
	return (
		<Card className="-user-view">
			<CardHeader>
				<h2>Add New User</h2>
			</CardHeader>
			<CardBody>
				<AvForm onSubmit={onSubmit}>
					<Media>
						<Media className="mr-25 mb-3" left>
							<Media
								object
								className="rounded mr-50"
								src={newUser.avatar}
								alt="Generic placeholder image"
								height="150"
								width="150"
							/>
						</Media>
						<Media className="mt-75 ml-1" body>
							<Button.Ripple
								tag={Label}
								className="mr-75"
								size="sm"
								color="primary"
							>
								Upload
								<Input
									type="file"
									onChange={onChangeImage}
									hidden
									accept="image/*"
								/>
							</Button.Ripple>

							<p>Allowed JPG, GIF or PNG. Max size of 800kB</p>
						</Media>
					</Media>
					<Row>
						<Col md="6">
							<FormGroup>
								<Label for="firstName">First Name</Label>
								<AvInput
									name="firstName"
									id="firstName"
									placeholder="John"
									value={newUser.firstName}
									onChange={(e) => handleChangeInput(e)}
									required
								/>
							</FormGroup>
						</Col>
						<Col md="6">
							<FormGroup>
								<Label for="lastName">Last Name</Label>
								<AvInput
									name="lastName"
									id="lastName"
									placeholder="Doe"
									value={newUser.lastName}
									onChange={(e) => handleChangeInput(e)}
									required
								/>
							</FormGroup>
						</Col>
						<Col md="6">
							<FormGroup>
								<Label for="email">Email</Label>
								<AvInput
									type="email"
									name="email"
									id="email"
									value={newUser.email}
									onChange={(e) => handleChangeInput(e)}
									placeholder="john.doe@example.com"
									required
								/>
								<FormText color="muted">
									You can use letters, numbers & periods
								</FormText>
							</FormGroup>
						</Col>
						<Col md="6">
							<FormGroup>
								<Label for="phone_number">Phone Number</Label>
								<AvInput
									name="phone_number"
									id="phone_number"
									placeholder="+2341223949586"
									value={newUser.phone_number}
									onChange={(e) => handleChangeInput(e)}
									required
								/>
							</FormGroup>
						</Col>

						<Col md="6">
							<FormGroup>
								<Label for="facebook_url">Facebook Url</Label>
								<AvInput
									name="facebook_url"
									id="facebook_url"
									placeholder="+2341223949586"
									value={newUser.facebook_url}
									onChange={(e) => handleChangeInput(e)}
									required
								/>
							</FormGroup>
						</Col>
						<Col md="6">
							<FormGroup>
								<Label for="linkedin_url">LinkedIn Url</Label>
								<AvInput
									name="linkedin_url"
									id="linkedin_url"
									value={newUser.linkedin_url}
									onChange={(e) => handleChangeInput(e)}
									placeholder="Australia"
									required
								/>
							</FormGroup>
						</Col>

						<Col md="6">
							<FormGroup>
								<Label for="user-role">User Role</Label>
								<AvInput type="select" id="user-role" name="user-role" required>
									<option value="subscriber">Subscriber</option>
									<option value="editor">Editor</option>
									<option value="maintainer">Maintainer</option>
									<option value="author">Author</option>
									<option value="admin">Admin</option>
								</AvInput>
							</FormGroup>
						</Col>
						<Col md="6">
							<FormGroup>
								<Label for="royal_title">Royal Title</Label>
								<AvInput
									name="royal_title"
									id="royal_title"
									value={newUser.royal_title}
									onChange={(e) => handleChangeInput(e)}
									placeholder="Australia"
									required
								/>
							</FormGroup>
						</Col>
						<Col md="6">
							<FormGroup>
								<Label for="password">Password</Label>
								<AvInput
									name="password"
									id="password"
									placeholder="password"
									value={newUser.password}
									onChange={(e) => handleChangeInput(e)}
									required
									type="password"
								/>
							</FormGroup>
						</Col>

						<Col md="6">
							<FormGroup>
								<Label for="password_confirmation">Password Confirmation</Label>
								<AvInput
									name="password_confirmation"
									id="password_confirmation"
									placeholder="password confirmation"
									value={newUser.password_confirmation}
									onChange={(e) => handleChangeInput(e)}
									required
									type="password"
								/>
							</FormGroup>
						</Col>
						<Col md="12">
							<Button type="submit" className="mr-1" color="primary">
								Submit
							</Button>
						</Col>
					</Row>
				</AvForm>
			</CardBody>
		</Card>
	);
};
export default AddUser;
