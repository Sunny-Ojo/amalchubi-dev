// ** React Imports
import { useState, useEffect } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';

// ** Store & Actions
import { useDispatch } from 'react-redux';
// ** Styles
import '@styles/react/libs/editor/editor.scss';
import '@styles/react/libs/react-select/_react-select.scss';
import Breadcrumbs from '@components/breadcrumbs';

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

const onSubmit = (event, errors) => {
	if (!errors.length) {
		console.log(event);
		// toggleSidebar();
	}
	event.preventDefault();
};

const AddBlog = () => {
	const history = useHistory();
	const [skin, setSkin] = useSkin();

	const [newBlog, setNewBlog] = useState({
		title: '',
		published_at: '',
		expired_at: '',
	});
	const handleChangeInput = (e) => {
		const { name, value } = e.target;
		setNewBlog({ ...newBlog, [name]: value });
	}; // ** Function to toggle tabs
	const handleNewBlog = () => {
		const updatedNewBlog = {
			...newBlog,
			content: tinymce.activeEditor.getContent(),
		};
		// make the axios call and save the blog

		console.log(updatedNewBlog);
		swal('Success', 'New Blog created successfully', 'success');

		history.push('/blogs/list');
	}; // ** Function to toggle tabs

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
											value={newBlog.title}
											onChange={(e) => handleChangeInput(e)}
											required
										/>
									</FormGroup>
								</Col>

								<Col md="12">
									<FormGroup>
										<Label for="content">Content</Label>
										<EditorFullFeatured />
										<Editor
											apiKey="emjshh1tafcjgizkmk6eofcmmcxc2cmugajs9l2ordjyca64"
											initialValue={''}
											init={{
												height: 350,
												selector: 'textarea#full-featured',
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
									<Button.Ripple color="primary" onClick={handleNewBlog}>
										Create Blog
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
export default AddBlog;
