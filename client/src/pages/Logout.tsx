import axios from "axios"
import { useNavigate } from "react-router-dom"
import cookies from "../helpers/cookies";

const Logout = () => {
    const navigate = useNavigate();
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