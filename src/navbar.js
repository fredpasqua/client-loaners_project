import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Navbar.css";
import { Link } from "react-router-dom";
function Navigate(props) {
  return (
    <div className="navstyle">
      <Container>
        <Navbar
          collapseOnSelect
          bg="light"
          variant="light"
          expand="md"
          fixed="top"
        >
          <Container className="navbar-container">
            <Navbar.Brand>
              <Link class="brand" to="/home">
                HornTrax
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto links">
                <Link className="link" to="/register">
                  Register
                </Link>
                {props.user ? (
                  <Link className="link" to="/home" onClick={props.onLoggedOut}>
                    Log Out
                  </Link>
                ) : (
                  <Link
                    className="link"
                    to="/login"
                    onClick={props.onLoggedOut}
                  >
                    Log In
                  </Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Container>
    </div>
  );
}

export default Navigate;
