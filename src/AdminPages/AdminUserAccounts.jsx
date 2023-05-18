import { useState } from 'react';
import {
  Container,
  Table,
  Button,
  Modal,
  Form,
  FormGroup,
  FormControl,
  FormLabel,
} from 'react-bootstrap';

function AdminUserAccounts() {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'johndoe@example.com', role: 'admin' },
    { id: 2, name: 'Jane Doe', email: 'janedoe@example.com', role: 'user' },
    { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com', role: 'user' },
  ]);
  const [formUsername, setFormUsername] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formRole, setFormRole] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editUserId, setEditUserId] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');

  const handleAddUser = () => {
    // Create a new user object with the form data
    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      role,
    };

    // Add the new user to the users array
    setUsers([...users, newUser]);

    // Reset the form data
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setRole('');
    setShowAddModal(false);
  };


  const handleEditUserModalOpen = (id) => {
    // Find the user with the given id
    const user = users.find((user) => user.id === id);

    // Set the form data to the values of the user being edited
    setEditUserId(id);
    setName(user.name);
    setEmail(user.email);
    setRole(user.role);
    setShowEditModal(true);
  };

  const handleEditUser = () => {
    // Find the index of the user being edited in the users array
    const userIndex = users.findIndex((user) => user.id === editUserId);

    // Create a new user object with the updated form data
    const updatedUser = {
      ...users[userIndex],
      name,
      email,
      role,
    };

    // Update the users array with the updated user object
    setUsers([...users.slice(0, userIndex), updatedUser, ...users.slice(userIndex + 1)]);

    // Reset the form data and close the modal
    setEditUserId(null);
    setName('');
    setEmail('');
    setRole('');
    setShowEditModal(false);
  };

  const handleDeleteUser = (id) => {
    // Filter out the user with the given id from the users array
    const filteredUsers = users.filter((user) => user.id !== id);

    // Update the users array with the filtered users
    setUsers(filteredUsers);
  };

  const handleDeleteUserConfirmed = () => {
    const updatedUsers = users.filter((user) => user.id !== selectedUser.id);
    setUsers(updatedUsers);
    setShowDeleteModal(false);
    setSelectedUser({});
  };

  const isFormValid = () => {
    return formUsername.trim() !== "" && formEmail.trim() !== "" && formRole.trim() !== "";
  };

  const passwordMatch = () => {
    return password === confirmPassword;
  };

  return (
    <Container>
      <h1 className="mt-5">User Accounts</h1>

      <Button className="my-3" onClick={() => setShowAddModal(true)}>
        Add User
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <Button className='btn-sm' variant="warning" onClick={() => handleEditUserModalOpen(user.id)}>
                  Edit
                </Button>{' '}
                <Button className='btn-sm' variant="danger" onClick={() => handleDeleteUser(user.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Add User Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FormGroup controlId="formName">
              <FormLabel>Name</FormLabel>
              <FormControl type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </FormGroup>
            <FormGroup controlId="formEmail">
              <FormLabel>Email</FormLabel>
              <FormControl type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormGroup>
            <FormGroup controlId="formPassword">
              <FormLabel>Password</FormLabel>
              <FormControl
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>
            <FormGroup controlId="formConfirmPassword">
              <FormLabel>Confirm Password</FormLabel>
              <FormControl
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {!passwordMatch() && <p className="text-danger">Passwords do not match</p>}
            </FormGroup>
            <FormGroup controlId="formRole">
              <FormLabel>Role</FormLabel>
              <FormControl as="select" value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">Select a role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </FormControl>
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddUser} disabled={!passwordMatch()}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit User Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FormGroup controlId="formName">
              <FormLabel>Name</FormLabel>
              <FormControl type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </FormGroup>
            <FormGroup controlId="formEmail">
              <FormLabel>Email</FormLabel>
              <FormControl type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormGroup>
            <FormGroup controlId="formRole">
              <FormLabel>Role</FormLabel>
              <FormControl as="select" value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">Select a role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </FormControl>
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEditUser} disabled={!isFormValid()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete User Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this user?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteUserConfirmed}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminUserAccounts;

