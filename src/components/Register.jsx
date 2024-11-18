import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { auth } from "../firebase";
import {
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithPopup,
	updateProfile,
} from "firebase/auth";
import SweetAlert from "./Alert";
import { useNavigate } from "react-router-dom";

export default function Register() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();

	useEffect(() => {
		onAuthStateChanged(auth, async (user) => {
			if (user != null) {
				navigate("/");
				return;
			}
		});
	});

	const handleRegister = async (e) => {
		e.preventDefault();

		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);

			const user = userCredential.user;

			await updateProfile(user, {
				displayName: name,
			});

			console.log(user);
			console.log(user.uid);
			SweetAlert({
				title: "Register Success",
				icon: "success",
				redirect: "/login",
			});
		} catch (error) {
			console.log(error);
			SweetAlert({
				title: "Register Failed",
				icon: "error",
				redirect: "/register",
			});
		} finally {
			setName("");
			setEmail("");
			setPassword("");
		}
	};

	const handleRegisterGoogle = async () => {
		const provider = new GoogleAuthProvider();

		try {
			const userCredential = await signInWithPopup(auth, provider);

			const user = userCredential.user;
			console.log(user);
			console.log(user.uid);
			SweetAlert({
				title: "Register Success",
				icon: "success",
				redirect: "/login",
			});
		} catch (error) {
			console.log(error);
			SweetAlert({
				title: "Register Failed",
				icon: "error",
				redirect: "/register",
			});
		}
	};

	return (
		<>
			<h2 className="text-center mb-4">Register</h2>
			<Form onSubmit={handleRegister} className="mb-3">
				<Form.Group className="mb-3" controlId="name">
					<Form.Label>Name</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter name"
						required
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</Form.Group>

				<Form.Group className="mb-3" controlId="email">
					<Form.Label>Email</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter email"
						required
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</Form.Group>

				<Form.Group className="mb-3" controlId="password">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Password"
						required
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</Form.Group>

				<Button variant="primary" type="submit">
					Register
				</Button>
			</Form>
			<p>or</p>
			<Button onClick={handleRegisterGoogle}>Register with Google</Button>
		</>
	);
}
