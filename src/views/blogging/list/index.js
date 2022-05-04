// // ** User List Component
// import Table from './Table';

// // ** Styles
// import '@styles/react/apps/app-users.scss';

// const BlogList = () => {
// 	return (
// 		<div className="app-user-list">
// 			<Table />
// 		</div>
// 	);
// };

// export default BlogList;

import { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import classnames from 'classnames';
// import Sidebar from '../BlogSidebar';
import Avatar from '@components/avatar';
import { Link } from 'react-router-dom';
import { MessageSquare } from 'react-feather';
import Breadcrumbs from '@components/breadcrumbs';
import {
	Row,
	Col,
	Card,
	CardBody,
	CardText,
	CardTitle,
	CardImg,
	Badge,
	Media,
	Pagination,
	PaginationItem,
	PaginationLink,
} from 'reactstrap';

import '@styles/base/pages/page-blog.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getAllData } from '../store/action';

const BlogList = () => {
	const [data, setData] = useState(null);

	const dispatch = useDispatch();
	const store = useSelector((state) => state.blogs);
	useEffect(() => {
		dispatch(getAllData());
		setData(store?.allData);
	}, []);

	const badgeColorsArr = {
		Quote: 'light-info',
		Fashion: 'light-primary',
		Gaming: 'light-danger',
		Video: 'light-warning',
		Food: 'light-success',
	};
	const renderRenderList = () => {
		return data.map((item) => {
			const renderTags = () => {
				return item.tags.map((tag, index) => {
					return (
						<a key={index} href="/" onClick={(e) => e.preventDefault()}>
							<Badge
								className={classnames({
									'mr-50': index !== item.tags.length - 1,
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

			return (
				<Col key={item.title} md="4">
					<Card>
						<Link to={`/blogs/view/${item?._id}`}>
							<CardImg
								className="img-fluid"
								src={item?.img || 'https://source.unsplash.com/random'}
								alt={item?.title}
								top
							/>
						</Link>
						<CardBody>
							<CardTitle tag="h4">
								<Link
									className="blog-title-truncate text-body-heading"
									to={`/pages/blog/detail/${item?._id}`}
								>
									{item?.title}
								</Link>
							</CardTitle>
							{/* 	<Media>
								<Avatar
									className="mr-50"
									img={item?.avatar}
									imgHeight="24"
									imgWidth="24"
								/>
							<Media body>
									<small className="text-muted mr-25">by</small>
									<small>
										<a
											className="text-body"
											href="/"
											onClick={(e) => e.preventDefault()}
										>
											{item?.userFullName}
										</a>
									</small>
									<span className="text-muted ml-50 mr-25">|</span>
									<small className="text-muted">{item?.blogPosted}</small>
								</Media>
							</Media> */}
							{/* <div className="my-1 py-25">{renderTags()}</div> */}
							<CardText className="blog-content-truncate">
								{item?.content}
							</CardText>
							<hr />
							<div className="d-flex justify-content-center align-items-center">
								{/* <Link to={`/pages/blog/detail/${item?._id}`}>
									<MessageSquare size={15} className="text-body mr-50" />
									<span className="text-body font-weight-bold">
										{item?.comment} Comments
									</span>
								</Link> */}
								<Link
									className="font-weight-bold btn btn-primary"
									to={`/pages/blog/detail/${item?._id}`}
								>
									Read More
								</Link>
							</div>
						</CardBody>
					</Card>
				</Col>
			);
		});
	};

	return (
		<Fragment>
			<Breadcrumbs
				breadCrumbTitle="Blog List"
				// breadCrumbParent="Pages"
				breadCrumbParent="Blog"
				breadCrumbActive="List"
			/>
			<div className="blog-wrapper">
				<div className="content-dtached content-lft">
					<div className="content-body">
						{data !== null ? (
							<div className="blog-list-wrapper">
								<Row>{renderRenderList()}</Row>
								<Row>
									<Col sm="12">
										<Pagination className="d-flex justify-content-center mt-2">
											<PaginationItem className="prev-item">
												<PaginationLink
													href="#"
													onClick={(e) => e.preventDefault()}
												></PaginationLink>
											</PaginationItem>
										</Pagination>
									</Col>
								</Row>
							</div>
						) : null}
					</div>
				</div>
				{/* <Sidebar /> */}
			</div>
		</Fragment>
	);
};

export default BlogList;
