// ** React Imports
import { useState, useEffect } from 'react';

// ** Custom Components
import Avatar from '@components/avatar';
import { useHistory } from 'react-router-dom';
// ** Third Party Components
import { Lock, Edit, Trash2 } from 'react-feather';
import {
	Media,
	Row,
	Col,
	Button,
	Form,
	Input,
	Label,
	FormGroup,
	Table,
	CustomInput,
} from 'reactstrap';
import ImageUploader from '../../../services/ImageUploader';
import axiosClient from '../../../services/axios';
import { updateUserUrl } from '../../../router/api-routes';
import { swal } from '../../../utility/Utils';

const UserAccountTab = ({ selectedUser }) => {
	// ** States
	const [user, setUser] = useState({
		avatar: '',
		first_name: '',
		last_name: '',
		email: '',
		phone_number: '',
		linkedin_url: '',
		facebook_url: '',
		royal_title: '',
	});
	const [img, setImg] = useState(null);
	const history = useHistory();
	// ** Function to change user image
	const onChange = (e) => {
		const reader = new FileReader(),
			files = e.target.files;
		reader.onload = function () {
			setImg(reader.result);
			console.log(reader.result);
		};
		reader.readAsDataURL(files[0]);
	};

	const handleChangeImage = (data) => {
		setImg(data);
		setUser({ ...user, avatar: data });
	};
	const handleChangeInput = (e) => {
		const { name, value } = e.target;
		setUser({ ...user, [name]: value });
	};

	// ** Update user image on mount or change
	useEffect(() => {
		if (selectedUser !== null) {
			setUser({
				...user,
				first_name: selectedUser?.first_name,
				last_name: selectedUser?.last_name,
				email: selectedUser?.email,
				status: selectedUser?.status,
				phone_number: selectedUser?.phone_number,
				facebook_url: selectedUser?.facebook_url,
				linkedIn_url: selectedUser?.linkedIn_url,
				royal_title: selectedUser?.royal_title,
			});
			if (selectedUser.avatar.length) {
				return setImg(selectedUser.avatar);
			} else {
				return setImg(null);
			}
		}
	}, [selectedUser]);

	// ** Renders User
	const renderUserAvatar = () => {
		if (img === null) {
			const stateNum = Math.floor(Math.random() * 6),
				states = [
					'light-success',
					'light-danger',
					'light-warning',
					'light-info',
					'light-primary',
					'light-secondary',
				],
				color = states[stateNum];
			return (
				<Avatar
					initials
					color={color}
					className="rounded mr-2 my-25"
					content={`${selectedUser?.first_name} ${selectedUser?.last_name}`}
					contentStyles={{
						borderRadius: 0,
						fontSize: 'calc(36px)',
						width: '100%',
						height: '100%',
					}}
					style={{
						height: '90px',
						width: '90px',
					}}
				/>
			);
		} else {
			return (
				<img
					className="user-avatar rounded mr-2 my-25 cursor-pointer"
					src={img}
					alt="user profile avatar"
					height="90"
					width="90"
				/>
			);
		}
	};

	const handleUpdateUser = async (e) => {
		e.preventDefault();
		console.log(selectedUser?.id);
		const response = await axiosClient.patch(updateUserUrl(selectedUser?.id), {
			...user,
		});
		if (response) {
			swal(
				'Successfully updated',
				'User details has been updated successfully',
				'success'
			);
			history.push(`/user/view/${selectedUser?.id}`);
		} else {
			swal('Oops!', 'An error occured', 'error');
		}
		console.log('result', response);
	};
	return (
		<Row>
			<Col sm="12">
				{/* {JSON.stringify(user)} */}
				<Media className="mb-2">
					{renderUserAvatar()}
					<Media className="mt-50" body>
						<h4>{`${selectedUser.first_name} ${selectedUser.last_name}`} </h4>
						<div className="d-flex flex-wrap mt-1 px-0">
							<Button.Ripple
								id="change-img"
								tag={Label}
								className="mr-75 d-none mb-0"
								color="primary"
							>
								{/* <div className="">Change</div> */}
								{/* <span className="d-block d-sm-none">
									<Edit size={14} />
								</span> */}

								<input
									type="file"
									hidden
									id="change-img"
									onChange={onChange}
									accept="image/*"
								/>
							</Button.Ripple>
							<ImageUploader
								handleChangeImage={handleChangeImage}
								title="Change profile image"
							/>
							{/* <Button.Ripple color="secondary" outline>
								<span className="d-none d-sm-block">Remove</span>
								<span className="d-block d-sm-none">
									<Trash2 size={14} />
								</span>
							</Button.Ripple> */}
						</div>
					</Media>
				</Media>
			</Col>
			<Col sm="12">
				<Form onSubmit={handleUpdateUser}>
					<Row>
						<Col md="4" sm="12">
							<FormGroup>
								<Label for="fullName">Full Name</Label>
								<Input
									type="text"
									id="fullName"
									placeholder="fullName"
									defaultValue={`${user.first_name} ${user.last_name}`}
									readonly
								/>
							</FormGroup>
						</Col>
						<Col md="4" sm="12">
							<FormGroup>
								<Label for="first_name">First Name</Label>
								<Input
									type="text"
									name={'first_name'}
									onChange={(e) => handleChangeInput(e)}
									id="first_name"
									placeholder="first_name"
									defaultValue={user.first_name}
								/>
							</FormGroup>
						</Col>
						<Col md="4" sm="12">
							<FormGroup>
								<Label for="last_name">Last Name</Label>
								<Input
									type="text"
									id="last_name"
									name="last_name"
									onChange={(e) => handleChangeInput(e)}
									placeholder="last_name"
									defaultValue={user.last_name}
								/>
							</FormGroup>
						</Col>
						<Col md="4" sm="12">
							<FormGroup>
								<Label for="email">Email</Label>
								<Input
									type="text"
									id="email"
									name="email"
									onChange={(e) => handleChangeInput(e)}
									placeholder="Email"
									defaultValue={user.email}
								/>
							</FormGroup>
						</Col>
						<Col md="4" sm="12">
							<FormGroup>
								<Label for="status">Status</Label>
								<Input
									onChange={(e) => handleChangeInput(e)}
									type="select"
									name="status"
									id="status"
									value={user.status}
								>
									<option value="pending">Pending</option>
									<option value="active">Active</option>
									<option value="inactive">Inactive</option>
								</Input>
							</FormGroup>
						</Col>
						<Col md="4" sm="12">
							<FormGroup>
								<Label for="role">Role</Label>
								<Input
									type="select"
									onChange={(e) => handleChangeInput(e)}
									name="role"
									id="role"
									defaultValue={user.role}
								>
									<option value="admin">Admin</option>
									<option value="author">Author</option>
									<option value="editor">Editor</option>
									<option value="maintainer">Maintainer</option>
									<option value="subscriber">Subscriber</option>
								</Input>
							</FormGroup>
						</Col>
						<Col md="4" sm="12">
							<FormGroup>
								<Label for="phone_number">Phone Number</Label>
								<Input
									type="text"
									onChange={(e) => handleChangeInput(e)}
									name="phone_number"
									id="phone_number"
									defaultValue={user.phone_number}
									placeholder="WinDon Technologies Pvt Ltd"
								/>
							</FormGroup>
						</Col>
						<Col md="4" sm="12">
							<FormGroup>
								<Label for="linkedIn_url">LinkedIn Url</Label>
								<Input
									type="text"
									id="linkedIn_url"
									name="linkedIn_url"
									onChange={(e) => handleChangeInput(e)}
									defaultValue={user.linkedIn_url}
									placeholder="WinDon Technologies Pvt Ltd"
								/>
							</FormGroup>
						</Col>
						<Col md="4" sm="12">
							<FormGroup>
								<Label for="facebook_url">Facebook Url</Label>
								<Input
									type="text"
									id="facebook_url"
									name="facebook_url"
									onChange={(e) => handleChangeInput(e)}
									defaultValue={user.facebook_url}
									placeholder="WinDon Technologies Pvt Ltd"
								/>
							</FormGroup>
						</Col>
						<Col md="12" sm="12">
							<FormGroup>
								<Label for="royal_title">Royal Title</Label>
								<Input
									type="text"
									onChange={(e) => handleChangeInput(e)}
									id="royal_title"
									name="royal_title"
									defaultValue={user.royal_title}
									placeholder="WinDon Technologies Pvt Ltd"
								/>
							</FormGroup>
						</Col>
						{/* <Col sm="12">
							<div className="permissions border mt-1">
								<h6 className="py-1 mx-1 mb-0 font-medium-2">
									<Lock size={18} className="mr-25" />
									<span className="align-middle">Permissions</span>
								</h6>
								<Table borderless striped responsive>
									<thead className="thead-light">
										<tr>
											<th>Module</th>
											<th>Read</th>
											<th>Write</th>
											<th>Create</th>
											<th>Delete</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>Admin</td>
											<td>
												<CustomInput
													type="checkbox"
													id="admin-1"
													label=""
													defaultChecked
												/>
											</td>
											<td>
												<CustomInput type="checkbox" id="admin-2" label="" />
											</td>
											<td>
												<CustomInput type="checkbox" id="admin-3" label="" />
											</td>
											<td>
												<CustomInput type="checkbox" id="admin-4" label="" />
											</td>
										</tr>
										<tr>
											<td>Staff</td>
											<td>
												<CustomInput type="checkbox" id="staff-1" label="" />
											</td>
											<td>
												<CustomInput
													type="checkbox"
													id="staff-2"
													label=""
													defaultChecked
												/>
											</td>
											<td>
												<CustomInput type="checkbox" id="staff-3" label="" />
											</td>
											<td>
												<CustomInput type="checkbox" id="staff-4" label="" />
											</td>
										</tr>
										<tr>
											<td>Author</td>
											<td>
												<CustomInput
													type="checkbox"
													id="author-1"
													label=""
													defaultChecked
												/>
											</td>
											<td>
												<CustomInput type="checkbox" id="author-2" label="" />
											</td>
											<td>
												<CustomInput
													type="checkbox"
													id="author-3"
													label=""
													defaultChecked
												/>
											</td>
											<td>
												<CustomInput type="checkbox" id="author-4" label="" />
											</td>
										</tr>
										<tr>
											<td>Contributor</td>
											<td>
												<CustomInput
													type="checkbox"
													id="contributor-1"
													label=""
												/>
											</td>
											<td>
												<CustomInput
													type="checkbox"
													id="contributor-2"
													label=""
												/>
											</td>
											<td>
												<CustomInput
													type="checkbox"
													id="contributor-3"
													label=""
												/>
											</td>
											<td>
												<CustomInput
													type="checkbox"
													id="contributor-4"
													label=""
												/>
											</td>
										</tr>
										<tr>
											<td>User</td>
											<td>
												<CustomInput type="checkbox" id="user-1" label="" />
											</td>
											<td>
												<CustomInput type="checkbox" id="user-2" label="" />
											</td>
											<td>
												<CustomInput type="checkbox" id="user-3" label="" />
											</td>
											<td>
												<CustomInput
													type="checkbox"
													id="user-4"
													label=""
													defaultChecked
												/>
											</td>
										</tr>
									</tbody>
								</Table>
							</div>
						</Col> */}
						<Col className="d-flex flex-sm-row flex-column mt-2" sm="12">
							<Button
								className="mb-1 mb-sm-0 mr-0 mr-sm-1"
								type="submit"
								color="primary"
							>
								Save Changes
							</Button>
							<Button color="secondary" outline>
								Reset
							</Button>
						</Col>
					</Row>
				</Form>
			</Col>
		</Row>
	);
};
export default UserAccountTab;
