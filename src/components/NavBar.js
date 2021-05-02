import { Navbar, Nav } from "react-bootstrap";
import SignOut from "./SignOut";

function NavBar(props) {
  const auth = props.auth;
  return (
    <Navbar variant="dark">
      <Navbar.Brand>🔥 Firebase TaskBoard</Navbar.Brand>
      <Navbar.Collapse>
        <Nav className="ml-auto">
          <SignOut auth={auth} />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
