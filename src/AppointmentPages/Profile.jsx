import React, { useState, useNavigate } from 'react'
import { Container, Row, Col, Button, Modal } from 'react-bootstrap'

const Profile = () => {
    const [showEditModal, setShowEditModal] = useState(false)
    const [firstName, setFirstName] = useState(localStorage.getItem('firstName'))
    const [lastName, setLastName] = useState(localStorage.getItem('lastName'))
    const [email, setEmail] = useState(localStorage.getItem('email'))
    const [phone, setPhone] = useState(localStorage.getItem('phone'))
    const [address, setAddress] = useState(localStorage.getItem('address'))
    const [city, setCity] = useState(localStorage.getItem('city'))
    const [province, setProvince] = useState(localStorage.getItem('province'))

    const containerStyle = {
        background: 'linear-gradient(to bottom, #1b2735 0%, #090a0f 100%)',
        color: '#fff',
        paddingTop: '50px',
        paddingBottom: '50px',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    }

    const overlayStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(to bottom, rgba(27, 39, 53, 0.8) 0%, rgba(9, 10, 15, 0.8) 100%)',
        zIndex: -1,
    }

    const headingStyle = {
        fontSize: '3rem',
        marginBottom: '30px',
    }

    const labelStyle = {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginBottom: '10px',
    }

    const valueStyle = {
        fontSize: '1.2rem',
        marginBottom: '30px',
    }

    const handleEdit = () => {
        setShowEditModal(true)
    }

    const handleSave = () => {
        localStorage.setItem('firstName', firstName)
        localStorage.setItem('lastName', lastName)
        localStorage.setItem('email', email)
        localStorage.setItem('phone', phone)
        localStorage.setItem('address', address)
        localStorage.setItem('city', city)
        localStorage.setItem('province', province)
        setShowEditModal(false)
    }

    return (
        <Container fluid style={containerStyle}>
            <div style={overlayStyle}></div>
            <div>
                <Button variant='danger' className='mb-2'>Back</Button>
                <h1 style={headingStyle}>Profile Page</h1>
                <Row>
                    <Col md={6}>
                        <div>
                            <div style={labelStyle}>First Name:</div>
                            <div style={valueStyle}>{firstName}</div>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div>
                            <div style={labelStyle}>Last Name:</div>
                            <div style={valueStyle}>{lastName}</div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <div>
                            <div style={labelStyle}>Email:</div>
                            <div style={valueStyle}>{email}</div>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div>
                            <div style={labelStyle}>Phone:</div>
                            <div style={valueStyle}>{phone}</div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <div style={labelStyle}>Address:</div>
                        <div style={valueStyle}>{address}</div>
                    </Col>
                    <Col md={6}>
                        <div>
                            <div style={labelStyle}>City:</div>
                            <div style={valueStyle}>{city}</div>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div>
                            <div style={labelStyle}>Province:</div>
                            <div style={valueStyle}>{province}</div>
                        </div>
                    </Col>
                </Row>
                <Button variant="primary" onClick={handleEdit}>Edit Account</Button>
            </div>
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Profile Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name:</label>
                        <input type="text" className="form-control" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name:</label>
                        <input type="text" className="form-control" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone:</label>
                        <input type="tel" className="form-control" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address:</label>
                        <input type="text" className="form-control" id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">City:</label>
                        <input type="text" className="form-control" id="city" value={city} onChange={(e) => setCity(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="province">Province:</label>
                        <input type="text" className="form-control" id="province" value={province} onChange={(e) => setProvince(e.target.value)} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container >
    )
}

export default Profile

