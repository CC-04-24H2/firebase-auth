import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import {
	GoogleAuthProvider,
	linkWithPopup,
	onAuthStateChanged,
	signOut,
} from "firebase/auth";
import { Button, Card } from "react-bootstrap";
import SweetAlert from "./Alert";

export default function App() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [uid, setUid] = useState("");
	const [token, setToken] = useState("");

	const navigate = useNavigate();

	useEffect(() => {
		onAuthStateChanged(auth, async (user) => {
			console.log(user);
			if (user == null) {
				navigate("/login");
				return;
			}

			const idToken = await user.getIdToken();

			setName(user.displayName);
			setEmail(user.email);
			setUid(user.uid);
			setToken(idToken);
		});
	});

	const handleLogout = async () => {
		try {
			const result = await signOut(auth);
			console.log(result);
			SweetAlert({
				title: "Logout Success",
				icon: "success",
				redirect: "/login",
			});
		} catch (error) {
			console.log(error);
			SweetAlert({ title: "Logout Failed", icon: "error", redirect: "/" });
		}
	};

	const handleLinkGoogle = async () => {
		const googleProvider = new GoogleAuthProvider();
		try {
			const linkResult = await linkWithPopup(auth.currentUser, googleProvider);
			const credential = GoogleAuthProvider.credentialFromResult(linkResult);
			const user = linkResult.user;

			console.log(credential);
			console.log(user);
			SweetAlert({
				title: "Link to Google Success",
				icon: "success",
				redirect: "/",
			});
		} catch (error) {
			console.log(error);
			SweetAlert({
				title: "Link to Google Failed",
				icon: "error",
				redirect: "/",
			});
		}
	};

	return (
		<Card style={{ width: "18rem" }}>
			<Card.Body>
				<Card.Title>Logged In User</Card.Title>
				<Card.Text>Name: {name}</Card.Text>
				<Card.Text>Email: {email}</Card.Text>
				<Card.Text>UID: {uid}</Card.Text>
				<Card.Text>ID Token: {token}</Card.Text>

				<Button onClick={handleLinkGoogle}>Link with Google</Button>
				<br />
				<Button onClick={handleLogout} className="mt-3">
					Logout
				</Button>
			</Card.Body>
		</Card>
	);
}
