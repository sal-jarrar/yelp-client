import { useContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { UserContext } from "../context/UserContext";
import img from "../images/triskit copy.svg";

const Header = () => {
  const {
    state: { user },
    logout,
  } = useContext(UserContext);
  return (
    <header>
      <Navbar variant="dark" expand="lg" collapseOnSelect>
        <Container style={{ maxWidth: "60vw" }} className="d-flex">
          <div className="flex-md-grow-1">
            <Navbar.Brand href="/">
              <img
                src={img}
                width="30"
                height="30"
                className="d-inline-block align-top px-1"
                alt="React Bootstrap logo"
              />
              YelpCamp
            </Navbar.Brand>
          </div>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <div className="">
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/campgrounds" className="active">
                  Cmapgrounds
                </Nav.Link>
                <Nav.Link href="/campground/create">Create</Nav.Link>
                {user ? (
                  <>
                    <Nav.Link href="/" onClick={() => logout()}>
                      Logout
                    </Nav.Link>
                    <Navbar.Text>
                      Signed in as: <a href="#login">{user.name}</a>
                    </Navbar.Text>
                  </>
                ) : (
                  <Nav.Link href="/login">Login</Nav.Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </div>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
