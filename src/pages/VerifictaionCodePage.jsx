import React, { useContext, useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { VerifcationCodeContext } from '../VerifictionCodeContext';
import UsersContext from '../UsersContext';
import { nanoid } from 'nanoid';

function VerificationCodePage() {
    const navigate = useNavigate()
    const [verifyCode, setVerifyCode] = useState("")
    const [errorPrompt, setErrorPrompt] = useState(false)
    const { code, generateCode } = useContext(VerifcationCodeContext)
    const { users, setUsers, gender, email, password, firstName, lastName, phone, address, setErrorMessage } = useContext(UsersContext)

    console.log(code)

    const handleVerifyCode = (e) => {
        e.preventDefault()
        if (code == verifyCode) {
            localStorage.setItem("isLoggedin", true)

            const newUser = {
                id: nanoid(),
                firstName,
                lastName,
                phone,
                address,
                gender,
                email,
                password,
            };

            setUsers([...users, newUser]);
            setErrorMessage("");
            setErrorPrompt(true)
            navigate("/appointments")
        } else {
            setErrorPrompt(true)
        }
    }

    const handleBack = () => {
        localStorage.removeItem("phone")
        navigate("/registration")
    }


    return (
        <Container className="py-5">
            <div className='d-flex justify-content-between pb-5'>
                <Button className='ms-2' variant={"danger"} onClick={handleBack}>Back</Button>
                <p>Your SmileCare Code is: <span className='fw-bold text-success'>{code}</span></p>
            </div>
            <Row className="justify-content-center">
                <Col md={6}>
                    <div className="text-center mb-4">
                        <h1 className="h3 mb-3 font-weight-normal">Dental Verification Code</h1>
                        <p>Please enter the verification code sent to your phone number.</p>
                    </div>
                    <Form>
                        <Form.Group controlId="formVerificationCode">
                            <Form.Label>Verification Code</Form.Label>
                            <div className='mx-auto' style={{ width: "100px" }}>
                                <Form.Control

                                    type="tel"
                                    maxLength="6"
                                    pattern="[0-9]*"
                                    inputMode="numeric"
                                    placeholder="Enter code"
                                    value={verifyCode}
                                    onChange={(e) => setVerifyCode(e.target.value)}
                                />
                            </div>
                        </Form.Group>
                        {errorPrompt && <h6 className='text-danger mt-3'>wrong verification code..</h6>}
                        <br />
                        <Button variant="success" type="submit" className="btn-block" onClick={handleVerifyCode}>
                            Verify
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default VerificationCodePage;
