import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const PrivateRoute = ({ role, roles, element }) => {
	const { logged, currentUser } = useSelector((state) => state.auth);

	if (!logged) {
		return <Navigate to="/" />;
	}
	if (!currentUser) {
		return <Navigate to="/dang-nhap" />;
	}

	return element;
};
export const GuestOnlyRoute = (props) => {
	const { logged } = useSelector((state) => state.auth);
	if (!logged) {
		return props.element;
	}
	return <Navigate to="/bang-dieu-khien" />;
};
export default PrivateRoute;