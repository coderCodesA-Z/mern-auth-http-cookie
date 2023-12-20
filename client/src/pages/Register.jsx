import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import { selectCurrentUser, setCredentials } from "../slices/authSlice";
import { useRegisterMutation } from "../slices/usersApiSlice";

const Register = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [register, { isLoading }] = useRegisterMutation();
	const { userInfo } = useSelector(selectCurrentUser);

	useEffect(() => {
		if (userInfo) navigate("/");
	}, [navigate, userInfo]);

	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			if (password !== confirmPassword) {
				toast.error("Passwords do not match");
				return;
			}

			const res = await register({ email, password, name }).unwrap();
			dispatch(setCredentials({ ...res }));
			navigate("/");
			setEmail("");
			setPassword("");
			setConfirmPassword("");
			setName("");
		} catch (error) {
			toast.error(error?.data?.message || error?.error);
		}
	};

	if (isLoading) {
		return <Loader />;
	}

	return (
		<FormContainer>
			<h1>Sign Up</h1>
			<Form onSubmit={submitHandler}>
				<Form.Group className="my-2" controlId="name">
					<Form.Label>Username</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter username"
						value={name}
						onChange={(e) => setName(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group className="my-2" controlId="email">
					<Form.Label>Email Address</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group className="my-2" controlId="password">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Enter password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group className="my-2" controlId="confirmPassword">
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Confirm password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Button type="submit" variant="primary" className="mt-3">
					Sign Up
				</Button>
				<Row>
					<Col className="py-3">
						Already have an account? <Link to="/login">Login</Link>
					</Col>
				</Row>
			</Form>
		</FormContainer>
	);
};

export default Register;
