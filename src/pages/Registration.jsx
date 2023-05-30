import React, {useContext} from "react"
import { Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import { Form as RegisterForm, useNavigate, useActionData, redirect } from "react-router-dom";
import { VerifcationCodeContext } from "../VerifictionCodeContext";

export async function action({ request }) {
  const formData = await request.formData()
  const email = formData.get("email")
  const password = formData.get("password")
  const passwordConfirm = formData.get("passwordConfirm")
  const firstName = formData.get("firstName")
  const lastName = formData.get("lastName")
  const phone = formData.get("phone")
  const address = formData.get("address")
  const gender = formData.get("gender")

  if (password === passwordConfirm) {
    localStorage.setItem("email", email)
    localStorage.setItem("password", password)
    localStorage.setItem("firstName", firstName)
    localStorage.setItem("lastName", lastName)
    localStorage.setItem("phone", phone)
    localStorage.setItem("address", address)
    localStorage.setItem("gender", gender)
    console.log(email, password, passwordConfirm)
    return redirect("/appointments")
  }
  return "Passwords do not match..Please try again"
}

const Registration = () => {
  const {code, generateCode} = useContext(VerifcationCodeContext)
  const errorMessage = useActionData()
  const navigate = useNavigate()
  console.log(code)
  
  return (
    <div className="py-5">
      <Row className="justify-content-md-center ">
        <h2 className="mb-5">Dental Registration</h2>
        <Col xs={8} md={6} className="mx-auto">

          <RegisterForm method="post" replace>
            <Row>
              <div className="col-md-6">
                <div className="form-group my-2" controlId="formBasicFirstName">
                  <label>First Name</label>
                  <input className="form-control" name="firstName" type="text" placeholder="Enter First Name" required />
                </div>

                <div className="form-group my-2" controlId="formBasicLastName">
                  <label>Last Name</label>
                  <input className="form-control" name="lastName" type="text" placeholder="Enter Last Name" required />
                </div>

                <div className="form-group my-2" controlId="formBasicPhoneNumber">
                  <label>Phone Number</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">+63</span>
                    </div>
                    <input
                      className="form-control"
                      name="phone"
                      type="tel"
                      maxLength="10"
                      pattern="[0-9]*"
                      inputMode="numeric"
                      placeholder="Enter Phone Number"
                      required
                    />

                  </div>
                </div>

                <div className="form-group my-2" controlId="formBasicAddress">
                  <label>Address</label>
                  <input className="form-control" name="address" type="text" placeholder="Enter Address" required />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group my-2">
                  <label for="gender">Gender:</label>
                  <select className="form-control text-center" id="gender" name="gender" required>
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>


                <div className="form-group my-2" controlId="formBasicEmail">
                  <label>Email address</label>
                  <input className="form-control" name="email" type="email" placeholder="Enter email" required />
                </div>

                <div className="form-group my-2" controlId="formBasicPassword">
                  <label>Password</label>
                  <input className="form-control" name="password" type="password" placeholder="Password" required />
                </div>

                <div className="form-group my-2" controlId="formBasicPasswordConfirm">
                  <label>Confirm Password</label>
                  <input className="form-control" name="passwordConfirm" type="password" placeholder="Confirm Password" required />
                </div>
              </div>

            </Row>
            <br />
            {errorMessage && <h6 className="text-danger">{errorMessage}</h6>}
            <Button className="mx-1" variant="danger" onClick={() => navigate("/login")} >
              Back
            </Button>
            <Button className="mx-1" variant="primary" type="submit" >
              Register
            </Button>
          </RegisterForm>
        </Col>
      </Row>
    </div >
  );
};

export default Registration;
