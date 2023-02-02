import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Navbar.css";
import { Link } from "react-router-dom";
function Navigate(props) {
  return (
    <div className="navstyle">
      <Navbar
        collapseOnSelect
        bg="light"
        variant="light"
        expand="md"
        fixed="top"
      >
        <Container className="navbar-container">
          <Navbar.Brand>
            <Link class="brand" to="/">
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
                <Link className="link" to="/" onClick={props.onLoggedOut}>
                  Log Out
                </Link>
              ) : (
                <Link className="link" to="/">
                  Log In
                </Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Navigate;
