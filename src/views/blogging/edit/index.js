// ** React Imports
import { useState, useEffect } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';

// ** Store & Actions
import { useSelector, useDispatch } from 'react-redux';
import { useSkin } from '@hooks/useSkin';

// ** Third Party Components
import { User } from 'react-feather';
import {
	Card,
	CardBody,
	Row,
	Col,
	Nav,
	NavItem,
	NavLink,
	Alert,
	Label,
	FormGroup,
	Button,
} from 'reactstrap';

import { swal } from '../../../utility/Utils';
// ** Styles
import '@styles/react/apps/app-users.scss';
import { AvForm, AvInput } from 'availity-reactstrap-validation-safe';
import { Editor } from '@tinymce/tinymce-react';
import {
	getBlogDetailsUrl,
	updateBlogDetailsUrl,
} from '../../../router/api-routes';
import axiosClient from '../../../services/axios';

const BlogEdit = () => {
	const history = useHistory();
	const [skin, setSkin] = useSkin();

	// ** States & Vars
	const [activeTab, setActiveTab] = useState('1'),
		store = useSelector((state) => state.blogs),
		{ id } = useParams();

	const [blog, setBlog] = useState({
		title: '',
		content: '',
		// status: store.selectedBlog?.status || '',
	});
	const handleChangeInput = (e) => {
		const { name, value } = e.target;
		setBlog({ ...blog, [name]: value });
	}; // ** Function to toggle tabs
	const toggle = (tab) => setActiveTab(tab);
	const getBlog = async () => {
		try {
			const { data } = await axiosClient(getBlogDetailsUrl(id));
			console.log(data);
			setBlog({
				...blog,
				title: data?.message?.title || '',
				content: data?.message?.content || '',
			});
		} catch (error) {
			console.log(error);
		}
	};
	// ** Function to get user on mount
	useEffect(() => {
		getBlog();
	}, [id]);
	const onSubmit = async (event, errors) => {
		if (!errors.length) {
			const updatedBlog = {
				...blog,
				content: tinymce.activeEditor.getContent(),
			};

			// make the axios call and save the blog
			try {
				const { data } = await axiosClient.put(
					updateBlogDetailsUrl(id, { ...updatedBlog })
				);
				console.log(data);
				swal('Success', ' Blog updated successfully', 'success');
				history.push('/blogs/list');
			} catch (error) {
				swal('Error', error?.response?.data?.message, 'error');
				console.log(error);
			}
		} else {
			event.preventDefault();
			swal(
				'Error',
				'Validation failed, please check the form and fill all fields correctly',
				'error'
			);
		}
	};
	return blog !== undefined ? (
		<Row className="app-user-edit">
			<Col sm="12">
				<Card>
					<CardBody className="pt-2">
						<Nav pills>
							<NavItem>
								<NavLink active={activeTab === '1'} onClick={() => toggle('1')}>
									<span className="align-middle d-none d-sm-block">
										Edit Blog Details
									</span>
								</NavLink>
							</NavItem>
						</Nav>
						<AvForm onSubmit={onSubmit}>
							<Row>
								<Col md="12">
									<FormGroup>
										<Label for="name">Title</Label>
										<AvInput
											name="title"
											id="title"
											placeholder="Doctor"
											value={blog?.title}
											onChange={(e) => handleChangeInput(e)}
											required
										/>
									</FormGroup>
								</Col>
								<Col md="12">
									<FormGroup>
										<Label for="content">Content</Label>

										<Editor
											apiKey="emjshh1tafcjgizkmk6eofcmmcxc2cmugajs9l2ordjyca64"
											initialValue={''}
											init={{
												height: 350,
												selector: 'textarea#full-featured',
												setup: function (editor) {
													editor.on('init', function (e) {
														editor.setContent(blog?.content);
													});
												},
												plugins:
													'print preview importcss tinydrive searchreplace autolink autosave save directionality visualblocks visualchars fullscreen image link media  template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
												mobile: {
													plugins:
														'print preview importcss tinydrive searchreplace autolink autosave save directionality visualblocks visualchars fullscreen image link media  template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount textpattern noneditable help charmap quickbars emoticons',
												},
												menu: {
													tc: {
														items:
															'addcomment showcomments deleteallconversations',
													},
												},
												menubar:
													'file edit view insert format tools table tc help',
												toolbar:
													'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor casechange removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | a11ycheck ltr rtl | showcomments addcomment',
												autosave_ask_before_unload: true,
												autosave_interval: '30s',
												autosave_prefix: '{path}{query}-{id}-',
												autosave_restore_when_empty: false,
												autosave_retention: '2m',
												image_advtab: true,
												importcss_append: true,
												template_cdate_format:
													'[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
												template_mdate_format:
													'[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
												image_caption: true,
												quickbars_selection_toolbar:
													'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
												noneditable_noneditable_class: 'mceNonEditable',
												toolbar_mode: 'sliding',
												spellchecker_whitelist: ['Ephox', 'Moxiecode'],
												_mode: 'embedded',
												content_style: '.mymention{ color: gray; }',
												contextmenu: 'link image imagetools table configur',
												a11y_advanced_options: true,
												skin: skin === 'dark' ? 'dark' : undefined,
												content_css: skin === 'dark' ? 'dark' : undefined,
											}}
										/>
										{/* <AvInput
											name="content"
											id="content"
											value={newBlog.content}
											onChange={(e) => handleChangeInput(e)}
											placeholder="Content for the blog"
											required
											type="textarea"
										/> */}
									</FormGroup>
								</Col>
								<Col>
									<Button.Ripple color="primary">Update Blog</Button.Ripple>
								</Col>
							</Row>
						</AvForm>
					</CardBody>
				</Card>
			</Col>
		</Row>
	) : (
		<Alert color="danger">
			<h4 className="alert-heading">Blog not found</h4>
			<div className="alert-body">
				Blog with id: {id} doesn't exist. Check list of all Blog:{' '}
				<Link to="/blogs/list">Blog List</Link>
			</div>
		</Alert>
	);
};
export default BlogEdit;
