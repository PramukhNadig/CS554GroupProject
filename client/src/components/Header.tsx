import { useNavigate } from "react-router-dom";
import styled from "styled-components";
const HeaderBlock = styled.div`
  display: flex;
`;

function App() {
  const navigate = useNavigate();
  return (
    <HeaderBlock className="header">
      <div>Name</div>

      <div
        onClick={() => {
          navigate("/CardSubject");
        }}
      >
        Card Subject
      </div>

      <div>
        Searching <input></input>
      </div>

      <div
        onClick={() => {
          navigate("/CardMake");
        }}
      >
        Card Make
      </div>

      <div
        onClick={() => {
          navigate("/login");
        }}
      >
        Login
      </div>

      <div
        onClick={() => {
          navigate("/signup");
        }}
      >
        Signup
      </div>

      <div>User</div>
    </HeaderBlock>
  );
}

export default App;
