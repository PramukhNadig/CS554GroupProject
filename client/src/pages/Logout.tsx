import axios from "axios"
import { useNavigate } from "react-router-dom"
import cookies from "../helpers/cookies";
import { useQuery } from "react-query";
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