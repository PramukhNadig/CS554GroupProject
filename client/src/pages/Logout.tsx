import axios from "axios"
import cookies from "../helpers/cookies";
import { Navigate } from "react-router-dom";

const Logout = () => {
    
    if (cookies.doesExist("username") === false) {
        return (<Navigate to="/" />);
    }

    axios.get("http://localhost:4000/v1/users/logout")
    cookies.deleteCookie("username");
    cookies.deleteCookie("id");
    return (
        <div>
            <h1>Logged out</h1>
        </div>    
    )
}
    
export default Logout;