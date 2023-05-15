import React, { useState, useContext } from 'react';
import { Table, Button, Form, Row, Col, Modal } from 'react-bootstrap';
import AppointmentContext from ".././AppointmentContext"
import ServicesContext from '../ServicesContext';

const AdminDashboard = () => {
  const {services} = useContext(ServicesContext)
  const {
          appointments, 
          setAppointments, 
          currentAppointmentId, 
          setCurrentAppointmentId,
          showReschedModal,
          setShowReschedModal,
          handleCloseModal,
          date,
          setDate,
          time,
          setTime,
          service,
          setService,
          errorMessage,
          handleEditAppointment,
          handleReschedule
        } = useContext(AppointmentContext)
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
  const [name, setName] = useState('');
  const [status, setStatus] = useState('All');

  const [showModal, setShowModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const handleConfirmAppointment = (id) => {
    const updatedAppointments = appointments.map((appointment) => {
      if (appointment.id === id) {
        return { ...appointment, status: 'Confirmed' };
      }
      return appointment;
    });
    setAppointments(updatedAppointments);
    handleModalClose()
  };

  const handleViewAppointment = (id) => {
    const appointment = appointments.find((appointment) => appointment.id === id);
    setSelectedAppointment(appointment);
    setShowModal(true);
    setCurrentAppointmentId(id)
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedAppointment(null);
  };

  const handleFilter = () => {
    let filtered = appointments;
    // Filter by date range
    if (dateRange.startDate && dateRange.endDate) {
      filtered = filtered.filter(
        (appointment) =>
          appointment.date >= dateRange.startDate && appointment.date <= dateRange.endDate
      );
    }
    // Filter by patient name
    if (name) {
      filtered = filtered.filter((appointment) =>
        appointment.name.toLowerCase().includes(name.toLowerCase())
      );
    }
    // Filter by status
    if (status !== 'All') {
      filtered = filtered.filter((appointment) => appointment.status === status);
    }
    setFilteredAppointments(filtered);
  };

  const handleAdminReschedule = () => {
    handleModalClose()
    setShowReschedModal(true)
  }

  const statusBackground = (appointment) => {
    let background
    if (appointment.status.toLowerCase() === "confirmed") {
      background = "fw-bold text-success"
    } else if (appointment.status.toLowerCase() === "cancelled") {
      background = "fw-bold text-danger"
    } else {
      background = "fw-bold text-secondary"
    }

    return background
  }

  const appointmentModalBtns = (selected) => {
    let btnElements
    if(selected && selected.status.toLowerCase() === "pending") {
      btnElements = 
      <>
        <Button variant="primary" onClick={handleAdminReschedule}>
          Reschedule
        </Button>
        <Button variant="success" onClick={() => handleConfirmAppointment(selected.id)}>
          Confirm 
        </Button> 
      </>
    } else if (selected && selected.status.toLowerCase() === "confirmed"){
      btnElements =
      <>
        <Button variant="primary" onClick={handleAdminReschedule}>
          Reschedule
        </Button>
        <Button variant="secondary" onClick={handleModalClose}>
          Close
        </Button> 
      </>
    } else {
      btnElements =
        <Button variant="secondary" onClick={handleModalClose}>
          Close
        </Button> 
    }

    return btnElements
  }

  return (
    <>
      <Row className='d-flex align-items-center py-3 px-2 g-3'>
        <Col md={3}>
          <div className="filters">
            <h5>Filters:</h5>
            <Form.Group controlId="formBasicDate">
              <Form.Label>Date Range:</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type="date"
                  placeholder="Enter end date"
                  value={dateRange.endDate}
                  onChange={(e) =>
                    setDateRange((prev) => ({ ...prev, endDate: e.target.value }))
                  }
                />
              </div>
            </Form.Group>
            <Form.Group controlId="formBasicPatient">
              <Form.Label>Patient:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter patient name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicStatus">
              <Form.Label>Status:</Form.Label>
<Form.Select
value={status}
onChange={(e) => setStatus(e.target.value)}
>
<option value="All">All</option>
<option value="Confirmed">Confirmed</option>
<option value="Cancelled">Cancelled</option>
<option value="Pending">Pending</option>
</Form.Select>
</Form.Group>
<Button className='my-2' variant="primary" onClick={handleFilter}>
Filter
</Button>
</div>    
</Col>
  <Col md={9}>

  <Table striped bordered hover>
    <thead>
      <tr>
        <th>#</th>
        <th>Patient Name</th>
        <th>Date</th>
        <th>Time</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {(filteredAppointments.length > 0 ? filteredAppointments : appointments).map(
        (appointment, index) => (
          <tr key={appointment.id}>
            <td>{index + 1}</td>
            <td>{appointment.name}</td>
            <td>{appointment.date}</td>
            <td>{appointment.time}</td>
            <td className={statusBackground(appointment)}>{appointment.status}</td>
            <td>
              <Button variant="info" onClick={() => handleViewAppointment(appointment.id)}>
                View
              </Button>
            </td>
          </tr>
        )
      )}
    </tbody>
  </Table>
  </Col>
  </Row>

  <Modal show={showModal} onHide={handleModalClose}>
    <Modal.Header closeButton>
      <Modal.Title>Appointment Details</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {selectedAppointment && (
        <div>
          <p><strong>Patient Name:</strong> {selectedAppointment.name}</p>
          <p><strong>Date:</strong> {selectedAppointment.date}</p>
          <p><strong>Time:</strong> {selectedAppointment.time}</p>
          <p><strong>Status:</strong> {selectedAppointment.status}</p>
        </div>
      )}
    </Modal.Body>
    <Modal.Footer>
        {appointmentModalBtns(selectedAppointment)}  
    </Modal.Footer>
  </Modal>

  {/* open Reschedule modal */}
  <Modal show={showReschedModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Reschedule Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="date">
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="time">
              <Form.Label>Time</Form.Label>
              <Form.Control type="time" value={time} onChange={(e) => setTime(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="service">
              <Form.Label>Service</Form.Label>
              <Form.Control as="select" value={service} onChange={(e) => setService(e.target.value)}>
                <option value="">Select a service</option>
                {services.map(service => {
                  return <option key={service.id} value={service.name}>{service.name}</option>
                })}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        {errorMessage && <h6 className="text-danger mx-auto mb-2">{errorMessage}</h6>}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleEditAppointment(currentAppointmentId)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
</>
);
};

export default AdminDashboard;

// {selectedAppointment && selectedAppointment.status.toLowerCase() !== "cancelled" && selectedAppointment.status.toLowerCase() !== "confirmed" 
// ? <Button variant="success" onClick={() => handleConfirmAppointment(selectedAppointment.id)}>
//   Confirm 
// </Button> 
// : <Button variant="secondary" onClick={handleModalClose}>
//   Close
// </Button>
// }




// before modifictaaion

// import React, { useState, useContext } from 'react';
// import { Table, Button, Form, Row, Col, Modal } from 'react-bootstrap';
// import AppointmentContext from ".././AppointmentContext"

// const AdminDashboard = () => {
//   const {appointments} = useContext(AppointmentContext)
//   const [bookings, setBookings] = useState([]);
//   const [filteredBookings, setFilteredBookings] = useState([]);
//   const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
//   const [name, setPatientName] = useState('');
//   const [status, setStatus] = useState('All');

//   const [showModal, setShowModal] = useState(false);
//   const [selectedBooking, setSelectedBooking] = useState(null);

//   const handleCancelBooking = (id) => {
//     const updatedBookings = bookings.map((booking) => {
//       if (booking.id === id) {
//         return { ...booking, status: 'Cancelled' };
//       }
//       return booking;
//     });
//     setBookings(updatedBookings);
//   };

//   const handleViewBooking = (id) => {
//     const booking = bookings.find((booking) => booking.id === id);
//     setSelectedBooking(booking);
//     setShowModal(true);
//   };

//   const handleModalClose = () => {
//     setShowModal(false);
//     setSelectedBooking(null);
//   };

//   const handleFilter = () => {
//     let filtered = bookings;
//     // Filter by date range
//     if (dateRange.startDate && dateRange.endDate) {
//       filtered = filtered.filter(
//         (booking) =>
//           booking.date >= dateRange.startDate && booking.date <= dateRange.endDate
//       );
//     }
//     // Filter by patient name
//     if (patientName) {
//       filtered = filtered.filter((booking) =>
//         booking.patientName.toLowerCase().includes(patientName.toLowerCase())
//       );
//     }
//     // Filter by status
//     if (status !== 'All') {
//       filtered = filtered.filter((booking) => booking.status === status);
//     }
//     setFilteredBookings(filtered);
//   };

  
//   const statusBackground = (booking) => {
//     let background
//     if (booking.status.toLowerCase() === "confirmed") {
//       background = "text-success"
//     } else if (booking.status.toLowerCase() === "cancelled") {
//       background = "text-danger"
//     } else {
//       background = "text-secondary"
//     }

//     return background
//   }

//   return (
//     <>
//       <Row className='d-flex align-items-center py-3 px-2 g-3'>
//         <h1>Admin Dashboard</h1>
//         <Col md={3}>

//           <div className="filters">
//             <h5>Filters:</h5>
//             <Form.Group controlId="formBasicDate">
//               <Form.Label>Date Range:</Form.Label>
//               <div className="d-flex">
//                 <Form.Control
//                   type="date"
//                   placeholder="Enter end date"
//                   value={dateRange.endDate}
//                   onChange={(e) =>
//                     setDateRange((prev) => ({ ...prev, endDate: e.target.value }))
//                   }
//                 />
//               </div>
//             </Form.Group>
//             <Form.Group controlId="formBasicPatient">
//               <Form.Label>Patient:</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter patient name"
//                 value={patientName}
//                 onChange={(e) => setPatientName(e.target.value)}
//               />
//             </Form.Group>
//             <Form.Group controlId="formBasicStatus">
//               <Form.Label>Status:</Form.Label>
//               <Form.Control
//                 className='text-center'
//                 as="select"
//                 value={status}
//                 onChange={(e) => setStatus(e.target.value)}
//               >
//                 <option>All</option>
//                 <option>Confirmed</option>
//                 <option>Pending</option>
//                 <option>Cancelled</option>
//               </Form.Control>
//             </Form.Group>
//             <Button variant="primary" className='my-2' onClick={handleFilter}>
//               Filter
//             </Button>
//           </div>
//         </Col>

//         <Col md={9}>
//         <Table striped bordered hover>
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Patient Name</th>
//               <th>Date</th>
//               <th>Time</th> <th>Status</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredBookings.map((booking) => (
//               <tr key={booking.id}>
//                 <td>{booking.id}</td>
//                 <td>{booking.patientName}</td>
//                 <td>{booking.date}</td>
//                 <td>{booking.time}</td>
//                 <td className={`fw-bold ${statusBackground(booking)}`}>{booking.status}</td>
//                 <td>
//                   {booking.status === 'Confirmed' && (
//                     <Button variant="secondary" onClick={() => handleCancelBooking(booking.id)}>Cancel</Button>
//                   )}
//                   <Button className='mx-1 mt-1' variant="primary" onClick={() => handleViewBooking(booking.id)}>View</Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//         </Col>
//       </Row>

//       <Modal show={showModal} onHide={handleModalClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Booking Details</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p><strong>Patient Name:</strong> {selectedBooking && selectedBooking.patientName}</p>
//           <p><strong>Date:</strong> {selectedBooking && selectedBooking.date}</p>
//           <p><strong>Time:</strong> {selectedBooking && selectedBooking.time}</p>
//           <p><strong>Status:</strong> {selectedBooking && selectedBooking.status}</p>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleModalClose}>Close</Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// };

// export default AdminDashboard
    // const handleCancelBooking = async (id) => {
    //   await cancelBooking(id);
    //   const updatedBookings = await getBookings();
    //   setBookings(updatedBookings);
    // };
  
    // useEffect(() => {
    //   const fetchData = async () => {
    //     const bookingsData = await getBookings();
    //     setBookings(bookingsData);
    //     setFilteredBookings(bookingsData);
    //   };
    //   fetchData();
    // }, []);