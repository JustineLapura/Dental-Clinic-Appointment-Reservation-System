import React, { useContext, useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { VerifcationCodeContext } from '../VerifictionCodeContext';

function VerificationCodePage() {
    const navigate = useNavigate()
    const [verifyCode, setVerifyCode] = useState("")
    const { code, generateCode } = useContext(VerifcationCodeContext)

    const handleVerifyCode = (e) => {
        e.preventDefault()
        if (code == verifyCode) {
            localStorage.setItem("isLoggedin", true)
            navigate("/appointments")
        } else {
            alert("Wrong verification code.")
        }
    }

    const handleBack = () => {
        localStorage.removeItem("phone")
        navigate("/registration")
    }


    return (
        <Container className="py-5">
            <div style={{width: "400px"}} className='d-flex justify-content-start ms-5 ps-5'>
                <Button className='ms-5' variant={"danger"} onClick={handleBack}>Back</Button>
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
