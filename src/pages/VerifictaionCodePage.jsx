import React, {useContext, useState} from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { VerifcationCodeContext } from '../VerifictionCodeContext';

function VerificationCodePage() {
    const navigate = useNavigate()
    const [verifyCode, setVerifyCode] = useState("")
    const {code} = useContext(VerifcationCodeContext)

    const handleVerifyCode = (e) => {
        e.preventDefault()
        if(code == verifyCode) {
            localStorage.setItem("isLoggedin", true)
            navigate("/appointments")
        } else {
            alert("Wrong verification code.")
        }
    }


    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <div className="text-center mb-4">
                        <h1 className="h3 mb-3 font-weight-normal">Dental Verification Code</h1>
                        <p>Please enter the verification code sent to your phone number.</p>
                    </div>
                    <Form>
                        <Form.Group controlId="formVerificationCode">
                            <Form.Label>Verification Code</Form.Label>
                            <Form.Control type="number" placeholder="Enter verification code" value={verifyCode} onChange={(e) => setVerifyCode(e.target.value)} />
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
