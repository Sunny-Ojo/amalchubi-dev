// ** Custom Components
import Sidebar from '@components/sidebar';

// ** Third Party Components
import { Button, FormGroup, Label, FormText } from 'reactstrap';
import { AvForm, AvInput } from 'availity-reactstrap-validation-safe';
import { useState } from 'react';

const SidebarNewUsers = ({ open, toggleSidebar }) => {
	// ** Function to handle form submit
	const [newUser, setNewUser] = useState({
		avatar: '',
		firstName: '',
		lastName: '',
		email: '',
		phone_number: '',
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
			toggleSidebar();
		}
		event.preventDefault();
	};

	return (
		<Sidebar
			size="lg"
			open={open}
			title="New User"
			headerClassName="mb-1"
			contentClassName="pt-0"
			toggleSidebar={toggleSidebar}
		>
			{JSON.stringify(newUser)}
			<AvForm onSubmit={onSubmit}>
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
				<FormGroup>
					<Label for="password">Password</Label>
					<AvInput
						name="password"
						id="password"
						placeholder="+2341223949586"
						value={newUser.password}
						onChange={(e) => handleChangeInput(e)}
						required
					/>
				</FormGroup>

				<FormGroup>
					<Label for="password_confirmation">Password Confirmation</Label>
					<AvInput
						name="password_confirmation"
						id="password_confirmation"
						placeholder="+2341223949586"
						value={newUser.password_confirmation}
						onChange={(e) => handleChangeInput(e)}
						required
					/>
				</FormGroup>

				<Button type="submit" className="mr-1" color="primary">
					Submit
				</Button>
				<Button type="reset" color="secondary" outline onClick={toggleSidebar}>
					Cancel
				</Button>
			</AvForm>
		</Sidebar>
	);
};

export default SidebarNewUsers;
