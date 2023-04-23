import axios from "axios";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  return (
    <div className="app">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await axios.post("http://localhost:4000/v1/users/login", {
            username: (e.target as any).username.value,
            password: (e.target as any).password.value,
            //add more if we need
          });
          navigate("/");
        }}
      >
        <div className="form-group">
          <label htmlFor="exampleInputusername1">username</label>
          <input
            type="username"
            name="username"
            className="form-control"
            id="exampleInputusername1"
            aria-describedby="usernameHelp"
            placeholder="Enter username"
          />
          <small id="usernamelHelp" className="form-text text-muted">
            We'll never share your username with anyone else.
          </small>
        </div>

        {/* <div>{{errormessage}}</div> */}

        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div>
        <a href="/signup">Need to register? Click here to sign-up</a>

        <br />
        <br />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
