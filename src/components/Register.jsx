import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import SweetAlert from "./Alert";

export default function Register() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

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

			SweetAlert({
				title: "Register Success",
				icon: "success",
				redirect: "/login",
			});
			console.log(user);
		} catch (error) {
			SweetAlert({
				title: "Register Failed",
				icon: "error",
				redirect: "/register",
			});
			console.log(error);
		} finally {
			setName("");
			setEmail("");
			setPassword("");
		}
	};

	return (
		<>
			<h2 className="text-center mb-4">Register</h2>
			<Form onSubmit={handleRegister}>
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
		</>
	);
}