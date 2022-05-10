import { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import classnames from 'classnames';
// import Sidebar from '../BlogSidebar';
import Avatar from '@components/avatar';
import { useParams, Link, useHistory } from 'react-router-dom';
import cmtImg from '@src/assets/images/portrait/small/avatar-s-6.jpg';
import { kFormatter } from '@utils';
import {
	Share2,
	MessageSquare,
	Bookmark,
	GitHub,
	Gitlab,
	Facebook,
	Twitter,
	Linkedin,
	CornerUpLeft,
	Trash,
	PenTool,
} from 'react-feather';
import Breadcrumbs from '@components/breadcrumbs';
import {
	Row,
	Col,
	Card,
	CardBody,
	CardTitle,
	CardText,
	CardImg,
	Badge,
	Media,
	UncontrolledDropdown,
	DropdownMenu,
	DropdownItem,
	DropdownToggle,
	Form,
	Input,
	Button,
	FormGroup,
	CustomInput,
} from 'reactstrap';

import '@styles/base/pages/page-blog.scss';
import { useDispatch, useSelector } from 'react-redux';
// import { getBlog } from '../../../blogging/store/action';
import {
	deleteBlogUrl,
	deletePostUrl,
	deleteProfessionsUrl,
	getBlogDetailsUrl,
	getPostDetailsUrl,
	viewProfessionsUrl,
} from '../../../router/api-routes';
import axiosClient from '../../../services/axios';
import { swal } from '../../../utility/Utils';

const PostDetails = () => {
	const [data, setData] = useState();
	const history = useHistory();
	// const dispatch = useDispatch();
	// const store = useSelector((state) => state.blogs);
	const { id } = useParams();
	const getProfession = async () => {
		try {
			const { data } = await axiosClient(viewProfessionsUrl(id));
			console.log(data);
			setData(data?.message);
		} catch (error) {
			console.log(error);
		}
	};
	const deleteProfession = async (id) => {
		try {
			const { data } = await axiosClient.delete(deleteProfessionsUrl(id));
			swal('Deleted!', 'Deleted successfully', 'success');

			history.push('/professions/list');
		} catch (error) {
			swal('Error', error?.response?.data?.message, 'error');
			console.log(error);
		}
	};

	useEffect(() => {
		getProfession();
	}, [id]);

	const badgeColorsArr = {
		Quote: 'light-info',
		Fashion: 'light-primary',
		Gaming: 'light-danger',
		Video: 'light-warning',
		Food: 'light-success',
	};

	const renderTags = () => {
		return data.blog.tags.map((tag, index) => {
			return (
				<a key={index} href="/" onClick={(e) => e.preventDefault()}>
					<Badge
						className={classnames({
							'mr-50': index !== data.blog.tags.length - 1,
						})}
						color={badgeColorsArr[tag]}
						pill
					>
						{tag}
					</Badge>
				</a>
			);
		});
	};

	const renderComments = () => {
		return data.comments.map((comment) => {
			return (
				<Card className="mb-3" key={comment.userFullName}>
					<CardBody>
						<Media>
							<Avatar
								className="mr-75"
								img={comment.avatar}
								width="38"
								height="38"
							/>
							<Media body>
								<h6 className="font-weight-bolder mb-25">
									{comment.userFullName}
								</h6>
								<CardText>{comment.commentedAt}</CardText>
								<CardText>{comment.commentText}</CardText>
								<a href="/" onClick={(e) => e.preventDefault()}>
									<div className="d-inline-flex align-items-center">
										<CornerUpLeft size={18} className="mr-50" />
										<span>Reply</span>
									</div>
								</a>
							</Media>
						</Media>
					</CardBody>
				</Card>
			);
		});
	};

	return (
		<Fragment>
			<Breadcrumbs
				breadCrumbTitle="Professions Details"
				breadCrumbParent="Profession"
				// breadCrumbParent2="Blog"
				breadCrumbActive="Details"
			/>
			<div className="blog-wrapper">
				<div className="content-detached ">
					<div className="content-body">
						{data !== null ? (
							<Row>
								<Col sm="12">
									<Card className="mb-3">
										<CardImg src={data?.img} className="img-fluid" top />
										<CardBody>
											<CardTitle tag="h4">{data?.title}</CardTitle>

											<div
												dangerouslySetInnerHTML={{
													__html: data?.description,
												}}
											></div>

											<hr className="my-2" />
											<div className="d-flex align-items-center justify-content-between">
												<div className="d-flex align-items-center">
													<div className="d-flex align-items-center mr-1">
														<Link to={`/post/edit/${data?._id}`}>
															<PenTool
																size={21}
																className="text-body align-middle"
															/>
														</Link>
														<a href="/" onClick={(e) => e.preventDefault()}>
															<div className="text-body align-middle">
																{kFormatter(data?.comments)}
															</div>
														</a>
													</div>
													<div className="d-flex align-items-cente">
														<Link
															className="mr-50"
															href="#"
															onClick={() => deleteProfession(data?._id)}
														>
															<Trash
																title="Delete"
																size={21}
																className="text-body align-middle text-danger"
															/>
														</Link>
														<a href="/" onClick={(e) => e.preventDefault()}>
															<div className="text-body align-middle">
																{/* {data.blog.bookmarked} */}
															</div>
														</a>
													</div>
												</div>
												<UncontrolledDropdown className="dropdown-icon-wrapper">
													<DropdownToggle tag="span">
														<Share2
															size={21}
															className="text-body cursor-pointer"
														/>
													</DropdownToggle>
													<DropdownMenu right>
														<DropdownItem className="py-50 px-1">
															<GitHub size={18} />
														</DropdownItem>
														<DropdownItem className="py-50 px-1">
															<Gitlab size={18} />
														</DropdownItem>
														<DropdownItem className="py-50 px-1">
															<Facebook size={18} />
														</DropdownItem>
														<DropdownItem className="py-50 px-1">
															<Twitter size={18} />
														</DropdownItem>
														<DropdownItem className="py-50 px-1">
															<Linkedin size={18} />
														</DropdownItem>
													</DropdownMenu>
												</UncontrolledDropdown>
											</div>
										</CardBody>
									</Card>
								</Col>
							</Row>
						) : null}
					</div>
				</div>
				{/* <Sidebar /> */}
			</div>
		</Fragment>
	);
};

export default PostDetails;
