// ** React Imports
import { Link } from 'react-router-dom';

// ** Custom Components
import Avatar from '@components/avatar';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

// ** Store & Actions
import { getProfession } from '../store/action';
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
// import { get } from 'sortablejs';

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

	if (row.avatar.length) {
		return <Avatar className="mr-1" img={row.avatar} width="32" height="32" />;
	} else {
		return (
			<Avatar
				color={color || 'primary'}
				className="mr-1"
				content={row.fullName || 'John Doe'}
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
	true: 'light-success',
	false: 'light-danger',
};
const handleDeleteProfession = (id) => {
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
		name: 'ID',
		minWidth: '320px',
		selector: 'id',
		sortable: true,
		cell: (row) => row.id || 'ID',
	},
	{
		name: 'Name',
		minWidth: '320px',
		selector: 'name',
		sortable: true,
		cell: (row) => row.name || 'Profession',
	},
	{
		name: 'Description',
		minWidth: '172px',
		selector: 'description',
		sortable: true,
		cell: (row) =>
			`${
				(row.description &&
					row.description.split(' ').splice(0, 12).join(' ') + '...') ||
				'description'
			}`,
	},

	{
		name: 'Status',
		minWidth: '138px',
		selector: 'status',
		sortable: true,
		cell: (row) => (
			<Badge
				className="text-capitalize"
				color={statusObj[row?.status || '-']}
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
						to={`/professions/view/${row.id}`}
						className="w-100"
						onClick={() => store.dispatch(getProfession(row.id))}
					>
						<FileText size={14} className="mr-50" />
						<span className="align-middle">Details</span>
					</DropdownItem>
					<DropdownItem
						tag={Link}
						to={`/professions/edit/${row.id}`}
						className="w-100"
						onClick={() => store.dispatch(getProfession(row.id))}
					>
						<Archive size={14} className="mr-50" />
						<span className="align-middle">Edit</span>
					</DropdownItem>
					<DropdownItem
						className="w-100"
						onClick={handleDeleteProfession(row.id)}
					>
						<Trash2 size={14} className="mr-50" />
						<span className="align-middle">Delete</span>
					</DropdownItem>
				</DropdownMenu>
			</UncontrolledDropdown>
		),
	},
];
