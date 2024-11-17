import {
	GoogleAuthProvider,
	signInWithEmailAndPassword,
	signInWithPopup,
} from "firebase/auth";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { auth } from "../firebase";
import SweetAlert from "./Alert";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);

			const user = userCredential.user;
			console.log(user);
			SweetAlert({
				title: "Login Success",
				icon: "success",
				redirect: "/",
			});
		} catch (error) {
			console.log(error);
			SweetAlert({ title: "Login Failed", icon: "error", redirect: "/login" });
		} finally {
			setEmail("");
			setPassword("");
		}
	};

	const handleSignInGoogle = async () => {
		const provider = new GoogleAuthProvider();

		try {
			const userCredential = await signInWithPopup(auth, provider);

			const user = userCredential.user;
			console.log(user);
			console.log(user.uid);
			SweetAlert({
				title: "Login Success",
				icon: "success",
				redirect: "/",
			});
		} catch (error) {
			console.log(error);
			SweetAlert({
				title: "Login Failed",
				icon: "error",
				redirect: "/login",
			});
		}
	};

	return (
		<>
			<h2 className="text-center mb-4">Login</h2>
			<Form onSubmit={handleLogin} className="mb-3">
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
					Login
				</Button>
			</Form>
			<p>or</p>
			<Button onClick={handleSignInGoogle}>Sign In with Google</Button>
		</>
	);
}
