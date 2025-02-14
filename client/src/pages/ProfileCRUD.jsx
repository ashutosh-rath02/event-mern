import { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../atoms/FormContainer";
import { toast } from "react-toastify";
import Loader from "../atoms/Loader";
import { useUpdateUserMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import Sidebar from "../atoms/Sidebar";
import MyEvents from "./MyEvents";
import RegisteredEvents from "./RegisteredEvents";

const ProfileCRUD = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [club, setClub] = useState("");
  const [selectedComponent, setSelectedComponent] = useState("myEvents");

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    setName(userInfo?.name);
    setEmail(userInfo?.email);
    setBio(userInfo?.bio);
    setClub(userInfo?.club);
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await updateProfile({
        _id: userInfo._id,
        name,
        email,
        bio,
        club,
      }).unwrap();
      dispatch(setCredentials(res));
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error(err?.data?.message || err?.error);
    }
  };

  const handleSidebarClick = (component) => {
    setSelectedComponent(component);
  };

  const renderContent = () => {
    switch (selectedComponent) {
      case "profile":
        return (
          <div className="">
            <FormContainer>
              <h1>Update Profile</h1>
              <Form onSubmit={submitHandler}>
                <Form.Group className="my-2" controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="name"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target?.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group className="my-2" controlId="email">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target?.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group className="my-2" controlId="bio">
                  <Form.Label>Bio</Form.Label>
                  <Form.Control
                    type="textarea"
                    placeholder="Bio"
                    value={bio}
                    onChange={(e) => setBio(e.target?.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group className="my-2" controlId="club">
                  <Form.Label>Club</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Club"
                    value={club}
                    onChange={(e) => setClub(e.target?.value)}
                  ></Form.Control>
                </Form.Group>

                <Button type="submit" variant="primary" className="mt-3">
                  Update
                </Button>

                {isLoading && <Loader />}
              </Form>
            </FormContainer>
          </div>
        );
      case "myEvents":
        return <MyEvents />;
      case "registeredEvents":
        return <RegisteredEvents />;
      default:
        return null;
    }
  };

  return (
    <Row className="my-4 mx-4">
      <Col md={4}>
        <Sidebar onSidebarClick={handleSidebarClick} />
      </Col>
      <Col md={8}>{renderContent()}</Col>
    </Row>
  );
};

export default ProfileCRUD;
