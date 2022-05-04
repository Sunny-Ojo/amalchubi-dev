import { useState, useContext, Fragment } from 'react';
import Avatar from '@components/avatar';
import { useSkin } from '@hooks/useSkin';
import useJwt from '@src/auth/jwt/useJwt';
import { useDispatch } from 'react-redux';
import { toast, Slide } from 'react-toastify';
import { handleLogin } from '@store/actions/auth';
import { AbilityContext } from '@src/utility/context/Can';
import { Link, useHistory } from 'react-router-dom';
import InputPasswordToggle from '@components/input-password-toggle';
import { getHomeRouteForLoggedInUser } from '@utils';
import {
	Facebook,
	Twitter,
	Mail,
	GitHub,
	HelpCircle,
	Coffee,
} from 'react-feather';
import { AvForm, AvInput } from 'availity-reactstrap-validation-safe';
import {
	Alert,
	Row,
	Col,
	CardTitle,
	CardText,
	FormGroup,
	Label,
	CustomInput,
	Button,
	UncontrolledTooltip,
} from 'reactstrap';

import '@styles/base/pages/page-auth.scss';
import axiosClient from '../../../services/axios';
import { loginUserUrl } from '../../../router/api-routes';
import Axios from 'axios';
const logo = require('@src/assets/images/logo/logo-ama.png').default;
const ToastContent = ({ name, role }) => (
	<Fragment>
		<div className="toastify-header">
			<div className="title-wrapper">
				<Avatar size="sm" color="success" icon={<Coffee size={12} />} />
				<h6 className="toast-title font-weight-bold">Welcome,</h6>
			</div>
		</div>
		<div className="toastify-body">
			<span>You have successfully logged in to your account</span>
		</div>
	</Fragment>
);

const Login = (props) => {
	const [skin, setSkin] = useSkin();
	const ability = useContext(AbilityContext);
	const dispatch = useDispatch();
	const history = useHistory();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const illustration = skin === 'dark' ? 'login-v2-dark.svg' : 'login-v2.svg',
		source = require(`@src/assets/images/pages/${illustration}`).default;

	const handleSubmit = (event, errors) => {
		if (errors && !errors.length) {
			Axios.post(`${process.env.REACT_APP_API_URL}${loginUserUrl}`, {
				email,
				password,
			})
				.then((res) => {
					const userData = {
						...res.data?.message,
						ability: [{ action: 'manage', subject: 'all' }],
					};
					dispatch(handleLogin(userData));
					history.push('/');
					toast.success(<ToastContent />, {
						transition: Slide,
						hideProgressBar: true,
						autoClose: 3000,
					});
					ability.update(userData.ability);
				})
				.catch((error) => {
					toast.error(error?.response?.data?.message);
				});
		}
		// console.log(data);
		// useJwt
		// 	.login({ email, password })
		// 	.then((res) => {
		// 		const data = {
		// 			...res.data.userData,
		// 			accessToken: res.data.accessToken,
		// 			refreshToken: res.data.refreshToken,
		// 		};
		// 		dispatch(handleLogin(data));
		// ability.update(res.data.userData.ability);
		// history.push(getHomeRouteForLoggedInUser(data.role));

		// 	})
		// 	.catch((err) => console.log(err));
		// }
	};

	return (
		<div className="auth-wrapper auth-v2">
			<Row className="auth-inner m-0">
				<Link className="brand-logo" to="/" onClick={(e) => e.preventDefault()}>
					<img
						className="img-fluid"
						height={120}
						width={120}
						src={logo}
						alt="Login V2"
					/>
				</Link>
				<Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
					<div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
						<img className="img-fluid" src={source} alt="Login V2" />
					</div>
				</Col>
				<Col
					className="d-flex align-items-center auth-bg px-2 p-lg-5"
					lg="4"
					sm="12"
				>
					<Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
						<CardTitle tag="h2" className="font-weight-bold mb-1">
							Welcome to Almachubi!
						</CardTitle>
						<CardText className="mb-2">Please sign-in to your account</CardText>

						<AvForm className="auth-login-form mt-2" onSubmit={handleSubmit}>
							<FormGroup>
								<Label className="form-label" for="login-email">
									Email
								</Label>
								<AvInput
									required
									autoFocus
									type="email"
									value={email}
									id="login-email"
									name="login-email"
									placeholder="john@example.com"
									onChange={(e) => setEmail(e.target.value)}
								/>
							</FormGroup>
							<FormGroup>
								<div className="d-flex justify-content-between">
									<Label className="form-label" for="login-password">
										Password
									</Label>
									<Link to="/forgot-password">
										<small>Forgot Password?</small>
									</Link>
								</div>
								<InputPasswordToggle
									required
									tag={AvInput}
									value={password}
									id="login-password"
									name="login-password"
									className="input-group-merge"
									onChange={(e) => setPassword(e.target.value)}
								/>
							</FormGroup>
							<FormGroup>
								<CustomInput
									type="checkbox"
									className="custom-control-Primary"
									id="remember-me"
									label="Remember Me"
								/>
							</FormGroup>
							<Button.Ripple
								color="primary"
								block
								disabled={!email.length || !password.length}
							>
								Sign in
							</Button.Ripple>
						</AvForm>
						{/* <p className="text-center mt-2">
							<span className="mr-25">New on our platform?</span>
							<Link to="/register">
								<span>Create an account</span>
							</Link>
						</p> */}
						{/* <div className="divider my-2">
							<div className="divider-text">or</div>
						</div>
						<div className="auth-footer-btn d-flex justify-content-center">
							<Button.Ripple color="facebook">
								<Facebook size={14} />
							</Button.Ripple>
							<Button.Ripple color="twitter">
								<Twitter size={14} />
							</Button.Ripple>
							<Button.Ripple color="google">
								<Mail size={14} />
							</Button.Ripple>
							<Button.Ripple className="mr-0" color="github">
								<GitHub size={14} />
							</Button.Ripple>
						</div> */}
					</Col>
				</Col>
			</Row>
		</div>
	);
};

export default Login;
