import { Container, Row, Col } from "react-bootstrap";
import { Outlet } from "react-router-dom";

export default function Layout() {
	return (
		<Container>
			<Row className="justify-content-center align-items-center vh-100">
				<Col lg="4">
					<Outlet />
				</Col>
			</Row>
		</Container>
	);
}
