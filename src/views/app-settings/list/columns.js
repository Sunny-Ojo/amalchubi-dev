// ** React Imports
import { Link } from 'react-router-dom';

// ** Custom Components
import Avatar from '@components/avatar';

// ** Store & Actions
// import { getUser } from '../store/action';
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

export const columns = [
	{
		name: 'Logo',
		minWidth: '297px',
		selector: 'fullName',
		sortable: true,
		cell: (row) => (
			<div className="d-flex justify-content-left align-items-center">
				{renderClient(row)}
				<div className="d-flex flex-column">
					<small className="text-truncate text-muted mb-0">{row.name}</small>
				</div>
			</div>
		),
	},
	{
		name: 'Default Currency',
		minWidth: '320px',
		selector: 'default_currency',
		sortable: true,
		cell: (row) => row.default_currency || 'NGN',
	},
	{
		name: 'Primary Color',
		minWidth: '172px',
		selector: 'primary_color',
		sortable: true,
		cell: (row) => row.primary_color || 'Green',
	},
	{
		name: 'Secondary Color',
		minWidth: '172px',
		selector: 'secondary_color',
		sortable: true,
		cell: (row) => row.secondary_color || 'Black',
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
						to={`/app-settings/edit/${row.id}`}
						className="w-100"
					>
						<Archive size={14} className="mr-50" />
						<span className="align-middle">Edit</span>
					</DropdownItem>
				</DropdownMenu>
			</UncontrolledDropdown>
		),
	},
];
