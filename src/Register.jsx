import { Form, Button } from "react-bootstrap";

export default function Register() {
	return (
		<>
			<h2 className="text-center mb-4">Register</h2>
			<Form>
				<Form.Group className="mb-3" controlId="name">
					<Form.Label>Name</Form.Label>
					<Form.Control type="text" placeholder="Enter name" required />
				</Form.Group>

				<Form.Group className="mb-3" controlId="email">
					<Form.Label>Email</Form.Label>
					<Form.Control type="email" placeholder="Enter email" required />
				</Form.Group>

				<Form.Group className="mb-3" controlId="password">
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" placeholder="Password" required />
				</Form.Group>

				<Button variant="primary" type="submit">
					Register
				</Button>
			</Form>
		</>
	);
}
