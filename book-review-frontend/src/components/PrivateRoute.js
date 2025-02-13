import Redirect from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
    let logged = false;
    if (localStorage.getItem("access_token")) {
        logged = true;
    }

    return <Route {...rest} render={(props) => (logged ? <Component {...props} /> : <Redirect to="/login" />)} />;
};

export default PrivateRoute;
