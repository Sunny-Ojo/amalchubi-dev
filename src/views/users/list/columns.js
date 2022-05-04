// ** React Imports
import { Link } from 'react-router-dom';

// ** Custom Components
import Avatar from '@components/avatar';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

// ** Store & Actions
import { getUser } from '../store/action';
import { store } from '@store/storeConfig/store';

// ** Third Party Components
import {
	Badge,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from 'reactstrap';
import {
	Slack,
	User,
	Settings,
	Database,
	Edit,
	MoreVertical,
	FileText,
	Trash2,
	Archive,
} from 'react-feather';

// ** Renders Client Columns
const renderClient = (row) => {
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

	if (row?.avatar?.length) {
		return (
			<Avatar
				className="mr-1"
				img={`http://${row.avatar}`}
				width="32"
				height="32"
			/>
		);
	} else {
		return (
			<Avatar
				color={color || 'primary'}
				className="mr-1"
				content={`${row.first_name} ${row.last_name}` || 'John Doe'}
				initials
			/>
		);
	}
};

// ** Renders Role Columns
const renderRole = (row) => {
	const roleObj = {
		subscriber: {
			class: 'text-primary',
			icon: User,
		},
		maintainer: {
			class: 'text-success',
			icon: Database,
		},
		editor: {
			class: 'text-info',
			icon: Edit,
		},
		author: {
			class: 'text-warning',
			icon: Settings,
		},
		admin: {
			class: 'text-danger',
			icon: Slack,
		},
	};

	const Icon = roleObj[row.role] ? roleObj[row.role].icon : Edit;

	return (
		<span className="text-truncate text-capitalize align-middle">
			<Icon
				size={18}
				className={`${roleObj[row.role] ? roleObj[row.role].class : ''} mr-50`}
			/>
			{row.role}
		</span>
	);
};

const statusObj = {
	pending: 'light-warning',
	active: 'light-success',
	inactive: 'light-secondary',
	blocked: 'light-danger',
	3: 'light-warning',
	1: 'light-success',
	0: 'light-secondary',
	2: 'light-danger',
};
const handleDeleteUser = (id) => {
	return async () => {
		await MySwal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Yes, delete it!',
			customClass: {
				confirmButton: 'btn btn-primary',
				cancelButton: 'btn btn-danger ml-1',
			},
			buttonsStyling: false,
		}).then(function (result) {
			if (result.value) {
				// axiosClient.delete()
				MySwal.fire({
					icon: 'success',
					title: 'Deleted!',
					text: 'Your file has been deleted.',
					customClass: {
						confirmButton: 'btn btn-success',
					},
				});
			} else if (result.dismiss === MySwal.DismissReason.cancel) {
				MySwal.fire({
					title: 'Cancelled',
					text: 'Action has been cancelled',
					icon: 'error',
					customClass: {
						confirmButton: 'btn btn-success',
					},
				});
			}
		});
	};
};

// first_name, last_name, phone, email, royal_title,
// [suspended, blocked, active, inactive] for status(filter for this)
export const columns = [
	{
		name: 'User',
		minWidth: '297px',
		selector: 'fullName',
		sortable: true,
		cell: (row) => (
			<div className="d-flex justify-content-left align-items-center">
				{renderClient(row)}
				<div className="d-flex flex-column">
					<Link
						to={`/user/view/${row._id}`}
						className="user-name text-truncate mb-0"
						onClick={() => store.dispatch(getUser(row._id))}
					>
						<span className="font-weight-bold">{`${row.first_name} ${row.last_name}`}</span>
					</Link>
				</div>
			</div>
		),
	},
	{
		name: 'Email',
		minWidth: '320px',
		selector: 'email',
		sortable: true,
		cell: (row) => row.email || '-',
	},
	// {
	// 	name: 'Phone Number',
	// 	minWidth: '172px',
	// 	selector: 'role',
	// 	sortable: true,
	// 	cell: (row) => row.phone_number || '-',
	// },

	{
		name: 'Status',
		minWidth: '138px',
		selector: 'status',
		sortable: true,
		cell: (row) => (
			<Badge
				className="text-capitalize"
				color={statusObj[row?.status || 'secondary']}
				pill
			>
				{row?.status || '-'}
			</Badge>
		),
	},
	{
		name: 'Actions',
		minWidth: '100px',
		selector: 'fullName',
		sortable: true,
		cell: (row) => (
			<UncontrolledDropdown>
				<DropdownToggle tag="div" className="btn btn-sm">
					<MoreVertical size={14} className="cursor-pointer" />
				</DropdownToggle>
				<DropdownMenu right>
					<DropdownItem
						tag={Link}
						to={'#'}
						// to={`/user/view/${row._id}`}
						className="w-100"
						onClick={() => store.dispatch(getUser(row._id))}
					>
						<FileText size={14} className="mr-50" />
						<span className="align-middle">Details</span>
					</DropdownItem>
					{/* <DropdownItem
						tag={Link}
						to={`/user/edit/${row._id}`}
						className="w-100"
						onClick={() => store.dispatch(getUser(row._id))}
					>
						<Archive size={14} className="mr-50" />
						<span className="align-middle">Edit</span>
					</DropdownItem> */}
					{/* <DropdownItem className="w-100" onClick={handleDeleteUser(row._id)}>
						<Trash2 size={14} className="mr-50" />
						<span className="align-middle">Delete</span>
					</DropdownItem> */}
				</DropdownMenu>
			</UncontrolledDropdown>
		),
	},
];
