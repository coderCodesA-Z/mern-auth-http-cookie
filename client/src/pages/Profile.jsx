import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import { selectCurrentUser, setCredentials } from "../slices/authSlice";
import { useUpdateUserMutation } from "../slices/usersApiSlice";

const Profile = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const dispatch = useDispatch();

	const [updateUser, { isLoading }] = useUpdateUserMutation();

	const { userInfo } = useSelector(selectCurrentUser);

	useEffect(() => {
		setName(userInfo.name);
		setEmail(userInfo.email);
	}, [userInfo.email, userInfo.name]);

	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			if (password !== confirmPassword) {
				toast.error("Passwords do not match");
				return;
			}

			const res = await updateUser({
				_id: userInfo._id,
				name,
				email,
				password,
			}).unwrap();
			dispatch(setCredentials({ ...res }));
			setName(userInfo.name);
			setEmail(userInfo.email);
			toast.success("Profile updated successfully");
			setPassword("");
			setConfirmPassword("");
		} catch (error) {
			toast.error(error?.data?.message || error?.error);
		}
	};

	if (isLoading) {
		return <Loader />;
	}

	return (
		<FormContainer>
			<h1>Profile</h1>
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
					Update
				</Button>
			</Form>
		</FormContainer>
	);
};

export default Profile;
