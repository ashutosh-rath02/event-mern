import { Navbar, Nav, Container, NavDropdown, Image } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { useEffect, useState } from "react";
import "../index.css";

const NavbarContainer = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();
  const [avatar, setAvatar] = useState(userInfo?.avatar);

  useEffect(() => {
    if (userInfo?.avatar) {
      setAvatar(userInfo.avatar);
    }
  }, [userInfo?.avatar]);

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Navbar
      className="h-full w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 font-bold"
      expand="lg"
      collapseOnSelect
      sticky="top"
      style={{
        backdropFilter: "blur(10px)",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
      }}
    >
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand className="text-black font-poppins font-extrabold">
            Brain Buzz
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer
              to="/"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "10px",
                color: "gray",
                cursor: "pointer",
              }}
            >
              <span className="nav-link">Home</span>
            </LinkContainer>
            {userInfo ? (
              <>
                <div className="d-flex align-items-center">
                  {avatar && (
                    <Image
                      src={avatar}
                      roundedCircle
                      fluid
                      width="30"
                      height="30"
                      className="me-2"
                    />
                  )}
                </div>
                <NavDropdown
                  className="font-bold text-black"
                  title={userInfo.name}
                  id="username"
                >
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <LinkContainer to="/login" className="text-black button">
                  <Nav.Link>Sign In</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register" className="text-black button">
                  <Nav.Link>Sign Up</Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarContainer;
