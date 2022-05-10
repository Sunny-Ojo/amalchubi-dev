// ** React Imports
import { useState, useEffect } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';

// ** Store & Actions
import { useDispatch } from 'react-redux';
// ** Styles
import '@styles/react/libs/editor/editor.scss';
import '@styles/react/libs/react-select/_react-select.scss';
import Breadcrumbs from '@components/breadcrumbs';
import { addBlogUrl, addPostUrl } from '../../../router/api-routes';
// ** Third Party Components
import {
	Card,
	CardBody,
	Row,
	Col,
	Nav,
	NavItem,
	NavLink,
	Label,
	FormGroup,
	Button,
} from 'reactstrap';

import { useSkin } from '@hooks/useSkin';

// ** Styles
import '@styles/react/apps/app-users.scss';
import { AvForm, AvInput } from 'availity-reactstrap-validation-safe';
import { Editor } from '@tinymce/tinymce-react';
import { swal } from '../../../utility/Utils';
import EditorInline from '../../forms/form-elements/editor/EditorInline';
import EditorFullFeatured from '../../forms/form-elements/editor/EditorFullFeatured';
import ImageUploader from '../../../services/ImageUploader';
import axiosClient from '../../../services/axios';

const onSubmit = (event, errors) => {
	if (!errors.length) {
		console.log(event);
		// toggleSidebar();
	}
	event.preventDefault();
};

const AddPost = () => {
	const history = useHistory();
	const [skin, setSkin] = useSkin();

	const [newPost, setNewPost] = useState({
		title: '',
		image: '',
		published_at: '',
		expired_at: '',
	});
	const handleChangeInput = (e) => {
		const { name, value } = e.target;
		setNewPost({ ...newPost, [name]: value });
	}; // ** Function to toggle tabs
	const handleNewPost = async () => {
		const updatedNewPost = {
			...newPost,
			content: tinymce.activeEditor.getContent(),
		};

		// make the axios call and save the blog
		try {
			const { data } = await axiosClient.post(addPostUrl, {
				...updatedNewPost,
			});
			console.log(updatedNewPost);
			swal('Success', 'New Post created successfully', 'success');

			history.push('/posts/list');
		} catch (error) {
			console.error(error);
		}
	}; // ** Function to toggle tabs

	const handleChangeImage = (data) => {
		setNewPost({ ...newPost, image: data });
	};
	// ** States & Vars
	const dispatch = useDispatch();
	// ** Function to toggle tabs
	// ** Function to get user on mount

	return (
		<Row className="app-user-edit">
			<Col sm="12">
				<Breadcrumbs
					breadCrumbTitle="Blogs"
					breadCrumbParent="Blog Management"
					breadCrumbActive="Create"
				/>
				<Card>
					<CardBody className="pt-2">
						<AvForm onSubmit={onSubmit}>
							<Row>
								<Col md="12">
									<FormGroup>
										<Label for="title">Title</Label>
										<AvInput
											name="title"
											id="title"
											placeholder="New Blog"
											onChange={(e) => handleChangeInput(e)}
											required
										/>
									</FormGroup>
								</Col>

								<Col md="12">
									<FormGroup>
										<Label for="content">Content</Label>
										<EditorFullFeatured />
									</FormGroup>
								</Col>
								<Col md="12">
									<FormGroup>
										{/* <Label for="logo">Featured Image</Label> */}
										<ImageUploader
											title="Featured Image"
											handleChangeImage={handleChangeImage}
										/>
									</FormGroup>
								</Col>
								<Col>
									<Button.Ripple color="primary" onClick={handleNewPost}>
										Create Post
									</Button.Ripple>
								</Col>
							</Row>
						</AvForm>
					</CardBody>
				</Card>
			</Col>
		</Row>
	);
};
export default AddPost;
