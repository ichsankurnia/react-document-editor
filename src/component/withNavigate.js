import { useLocation, useNavigate, useParams } from "react-router-dom";

const withNavigate = Component => props => {
	const params = useParams();
	const navigate = useNavigate()
    const location = useLocation()

	// etc... other react-router-dom v6 hooks
	return (
		<Component
			{...props}
			params={params}
			navigate={navigate}
            location={location}
		// etc...
		/>
	);
};

export default withNavigate