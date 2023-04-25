import axios from "axios";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  return (
    <div className="app">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await axios.post("http://localhost:4000/v1/users/signup", {
            username: (e.target as any).username.value,
            password: (e.target as any).password.value,
            email: (e.target as any).email.value,
            //add more if we need
          });
          navigate("/");
        }}
      >
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            className="form-control"
            id="username"
            placeholder="Username"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            required
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>

        {/* <div className="form-group">
          <label htmlFor="phonenumber">Phone number</label>
          <input
            type="text"
            name="phonenumber"
            className="form-control"
            id="phonenumber"
            placeholder="Phonenumber"
          />
        </div> */}

        {/* <div className="form-group">
          <label htmlFor="gender">Gender </label>
          <div className="form-check form-check-inline mb-0 me-4">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              id="femaleGender"
              value="female"
              required
            />
            <label className="form-check-label" htmlFor="femaleGender">
              Female
            </label>
          </div>

          <div className="form-check form-check-inline mb-0 me-4">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              id="maleGender"
              value="male"
            />
            <label className="form-check-label" htmlFor="maleGender">
              Male
            </label>
          </div>

          <div className="form-check form-check-inline mb-0">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              id="otherGender"
              value="other"
            />
            <label className="form-check-label" htmlFor="otherGender">
              Other
            </label>
          </div>
        </div> */}

        {/* <div className="form-group">
          <label htmlFor="age">age</label>
          <input
            type="number"
            name="age"
            className="form-control"
            id="age"
            placeholder="Age"
          />
        </div> */}

        <a href="/login">Already have an account? Click here to log-in</a>
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
