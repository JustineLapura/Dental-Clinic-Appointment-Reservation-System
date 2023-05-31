import React, { useState, useContext } from 'react'
import { Container, Row, Col, Button, Modal } from 'react-bootstrap'
import UsersContext from '../UsersContext'

const Profile = () => {
    const [showEditModal, setShowEditModal] = useState(false)
    const {selectedUser} = useContext(UsersContext)

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
        // selectedUser.
        setShowEditModal(false)
    }

    return (
        <Container fluid style={containerStyle}>
            <div style={overlayStyle}></div>
            <div>
                <Button variant='danger' className='mb-2'>Back</Button>
                <h1 style={headingStyle}>Profile Page</h1>
                <Row>
                    <Col md={10} className='mx-auto'>
                        <div>
                            <div style={labelStyle}>First Name:</div>
                            <div style={valueStyle}>{selectedUser.firstName}</div>
                        </div>
                        <div>
                            <div style={labelStyle}>Last Name:</div>
                            <div style={valueStyle}>{selectedUser.lastName}</div>
                        </div>
                        <div>
                            <div style={labelStyle}>Gender:</div>
                            <div style={valueStyle}>{selectedUser.gender}</div>
                        </div>
                        <div>
                            <div style={labelStyle}>Email:</div>
                            <div style={valueStyle}>{selectedUser.email}</div>
                        </div>
                        <div>
                            <div style={labelStyle}>Phone:</div>
                            <div style={valueStyle}>+63{selectedUser.phone}</div>
                        </div>
                        <div>
                            <div style={labelStyle}>Address:</div>
                            <div style={valueStyle}>{selectedUser.address}</div>
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
                        <input type="text" className="form-control" id="firstName" value={selectedUser.firstName}  />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name:</label>
                        <input type="text" className="form-control" id="lastName" value={selectedUser.lastName}  />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" className="form-control" id="email" value={selectedUser.email}  />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone:</label>
                        <input type="tel" className="form-control" id="phone" value={selectedUser.phone}  />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address:</label>
                        <input type="text" className="form-control" id="address" value={selectedUser.address} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">City:</label>
                        <input type="text" className="form-control" id="gender" value={selectedUser.gender} />
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

