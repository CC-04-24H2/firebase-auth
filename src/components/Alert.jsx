import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function SweetAlert(props) {
	const MySwal = withReactContent(Swal);

	MySwal.fire({
		title: props.title,
		icon: props.icon,
	}).then(() => {
		window.location = props.redirect;
	});
}
