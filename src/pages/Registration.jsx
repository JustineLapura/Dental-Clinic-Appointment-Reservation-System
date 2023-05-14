import { Row, Col, Form, Button } from "react-bootstrap";
import { Form as RegisterForm, useNavigate, useActionData, redirect } from "react-router-dom";

export async function action({ request }) {
  const formData = await request.formData()
  const email = formData.get("email")
  const password = formData.get("password")
  const passwordConfirm = formData.get("passwordConfirm")
  const firstName = formData.get("firstName")
  const lastName = formData.get("lastName")
  const phone = formData.get("phone")
  const address = formData.get("address")
  const city = formData.get("city")
  const province = formData.get("province")

  if(password === passwordConfirm) {
    localStorage.setItem("email", email)
    localStorage.setItem("password", password)
    localStorage.setItem("firstName", firstName)
    localStorage.setItem("lastName", lastName)
    localStorage.setItem("phone", phone)
    localStorage.setItem("address", address)
    localStorage.setItem("city", city)
    localStorage.setItem("province", province)
    console.log(email, password, passwordConfirm)
    return redirect("/login")
  }
  return "Passwords do not match..Please try again"
}

const Registration = () => {
  const errorMessage = useActionData()
  const navigate = useNavigate()
  return (
    <div className="py-5">
      <Row className="justify-content-md-center ">
        <Col md={6}>
          <h2>Registration</h2>
          <RegisterForm method="post" replace>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control name="email" type="email" placeholder="Enter email" required/>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control name="password" type="password" placeholder="Password" required/>
            </Form.Group>

            <Form.Group controlId="formBasicPasswordConfirm">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control name="passwordConfirm" type="password" placeholder="Confirm Password" required/>
            </Form.Group>

            <Form.Group controlId="formBasicFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control name="firstName" type="text" placeholder="Enter First Name" required/>
            </Form.Group>

            <Form.Group controlId="formBasicLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control name="lastName" type="text" placeholder="Enter Last Name" required/>
            </Form.Group>

            <Form.Group controlId="formBasicPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control name="phone" type="number" placeholder="Enter Phone Number" required/>
            </Form.Group>

            <Form.Group controlId="formBasicAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control name="address" type="text" placeholder="Enter Address" required />
            </Form.Group>

            <Form.Group controlId="formBasicCity">
              <Form.Label>City</Form.Label>
              <Form.Control name="city" type="text" placeholder="Enter City" required/>
            </Form.Group>

            <Form.Group controlId="formBasicState">
              <Form.Label>Province</Form.Label>
              <Form.Control name="province" type="text" placeholder="Province" required/>
            </Form.Group>
            <br />
            {errorMessage && <h6 className="text-danger">{errorMessage}</h6>}
            <Button className="mx-1" variant="danger" onClick={() => navigate("/login")} >
              Back
            </Button>
            <Button className="mx-1" variant="primary" type="submit">
              Register
            </Button>
          </RegisterForm>
        </Col>
      </Row>
    </div>
  );
};

export default Registration;
