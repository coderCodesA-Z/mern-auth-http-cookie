import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";

import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { logOut, selectCurrentUser } from "../slices/authSlice";
import { useLogoutMutation } from "../slices/usersApiSlice";

const Header = () => {
	const { userInfo } = useSelector(selectCurrentUser);
	const [logoutApiCall] = useLogoutMutation();

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const logoutHandler = async () => {
		try {
			await logoutApiCall().unwrap();
			dispatch(logOut());
			navigate("/");
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<header>
			<Navbar bg="dark" data-bs-theme="dark" expand="lg" collapseOnSelect>
				<Container>
					<LinkContainer to={"/"}>
						<Navbar.Brand>Mern Auth</Navbar.Brand>
					</LinkContainer>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ms-auto">
							{userInfo ? (
								<>
									<NavDropdown title={userInfo.name} id="username">
										<LinkContainer to="/profile">
											<NavDropdown.Item>Profile</NavDropdown.Item>
										</LinkContainer>
										<NavDropdown.Item onClick={logoutHandler}>
											Logout
										</NavDropdown.Item>
									</NavDropdown>
								</>
							) : (
								<>
									<LinkContainer to="/login">
										<Nav.Link>
											<FaSignInAlt /> Sign In
										</Nav.Link>
									</LinkContainer>
									<LinkContainer to="/register">
										<Nav.Link>
											<FaSignOutAlt /> Sign Up
										</Nav.Link>
									</LinkContainer>
								</>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
