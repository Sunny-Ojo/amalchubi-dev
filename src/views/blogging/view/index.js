// ** React Imports
import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

// ** Store & Actions

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
import { getBlog } from '../store/action';

const BlogView = (props) => {
	// ** Vars
	const dispatch = useDispatch();
	const store = useSelector((state) => state.blogs),
		{ id } = useParams();

	const handleDeleteBlog = (id) => {
		dispatch(deleteBlog(parseInt(id)));
	};
	// ** Get suer on mount
	useEffect(() => {
		dispatch(getBlog(parseInt(id)));
	}, [dispatch]);

	return store.selectedBlog !== null && store.selectedBlog !== undefined ? (
		<div className="app-user-view">
			<Row>
				<Col md="12">
					<Card className="-user-view">
						<CardHeader>
							<h2>Blog Details: {store.selectedBlog?.title || '-'}</h2>
						</CardHeader>

						<CardBody>
							Content:
							<div
								dangerouslySetInnerHTML={{
									__html: store.selectedBlog?.content || '-',
								}}
							></div>
							Published At: {store.selectedBlog?.published_at || '-'}
						</CardBody>
					</Card>
				</Col>
			</Row>
		</div>
	) : (
		<Alert color="danger">
			{JSON.stringify(store)}

			<h4 className="alert-heading">Blog not found</h4>
			<div className="alert-body">
				Blog with id: {id} doesn't exist. Check list of all Blogs:{' '}
				<Link to="/blogs/list">Blogs List</Link>
			</div>
		</Alert>
	);
};
export default BlogView;
