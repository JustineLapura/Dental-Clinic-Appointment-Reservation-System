import React, { useState, useContext } from 'react';
import { Table } from 'react-bootstrap';
import _ from 'lodash';
import UsersContext from '../UsersContext';

function AdminMembersPage() {
  const { users } = useContext(UsersContext)

// Sample data of members
// const [membersData, setMembersData] = useState([
// {
// id: 1,
// name: 'John Doe',
// email: 'johndoe@example.com',
// phone: '+123456789',
// address: '123 Main Street, Anytown, USA',
// dateRegistered: '2022-05-10',
// },
// {
// id: 2,
// name: 'Jane Smith',
// email: 'janesmith@example.com',
// phone: '+987654321',
// address: '456 Elm Street, Anytown, USA',
// dateRegistered: '2022-04-22',
// },
// // Add more members data as needed
// ]);

const [searchQuery, setSearchQuery] = useState('');
const [sortOrder, setSortOrder] = useState('asc');
const [sortBy, setSortBy] = useState('name');

const handleSearchChange = (event) => {
setSearchQuery(event.target.value);
};

const handleSortChange = (event) => {
setSortBy(event.target.value);
setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
};

// const filteredMembers = membersData.filter((member) => {
// return (
// member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
// member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
// member.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
// member.address.toLowerCase().includes(searchQuery.toLowerCase())
// );
// });

// const sortedMembers = _.orderBy(filteredMembers, [sortBy], [sortOrder]);

return (
<div className="container">
<h1>Members List</h1>
<div className='row d-flex my-1'>
  <div className='col'>
    <input type="text" value={searchQuery} onChange={handleSearchChange} placeholder='Search...'/>
  </div>
  <div className='col'>
    <span>Sort: </span>
    <select value={sortBy} onChange={handleSortChange}>
    <option value="name">Name</option>
    <option value="email">Email</option>
    <option value="phone">Phone</option>
    <option value="address">Address</option>
    <option value="dateRegistered">Date Registered</option>
    </select>
    {sortOrder === 'asc' ? (
    <span>↑</span>
    ) : (
    <span>↓</span>
    )}
  </div>
</div>
<Table responsive striped bordered hover>
<thead>
<tr>
<th>#</th>
<th>Name</th>
<th>Email</th>
<th>Phone</th>
<th>Address</th>
<th>Gender</th>
</tr>
</thead>
<tbody>
{users.map((member, index) => (
<tr key={member.id}>
<td>{index + 1}</td>
<td>{member.firstName} {member.lastName}</td>
<td>{member.email}</td>
<td>0{member.phone}</td>
<td>{member.address}</td>
<td>{member.gender}</td>
{/* <td>{member.dateRegistered}</td> */}
</tr>
))}
</tbody>
</Table>
</div>
);
}

export default AdminMembersPage;

// import { Table } from 'react-bootstrap';
// import { useState } from 'react';

// function AdminMembersPage() {
//   // Sample data of members
//   const membersData = [
//     {
//       id: 1,
//       name: 'John Doe',
//       email: 'johndoe@example.com',
//       phone: '+123456789',
//       address: '123 Main Street, Anytown, USA',
//       dateRegistered: '2022-05-10',
//     },
//     {
//       id: 2,
//       name: 'Jane Smith',
//       email: 'janesmith@example.com',
//       phone: '+987654321',
//       address: '456 Elm Street, Anytown, USA',
//       dateRegistered: '2022-04-22',
//     },
//     // Add more members data as needed
//   ];

//   const [searchQuery, setSearchQuery] = useState('');

//   const handleSearchChange = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   const filteredMembers = membersData.filter((member) => {
//     const query = searchQuery.toLowerCase();
//     return (
//       member.name.toLowerCase().includes(query) ||
//       member.email.toLowerCase().includes(query) ||
//       member.phone.toLowerCase().includes(query) ||
//       member.address.toLowerCase().includes(query)
//     );
//   });

//   return (
//     <div className="container">
//       <h1>Members List</h1>
//       <input type="text" value={searchQuery} onChange={handleSearchChange} placeholder="Search members by name, email, phone, or address" />
//       <Table responsive striped bordered hover>
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Phone</th>
//             <th>Address</th>
//             <th>Date Registered</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredMembers.map((member, index) => (
//             <tr key={member.id}>
//               <td>{index + 1}</td>
//               <td>{member.name}</td>
//               <td>{member.email}</td>
//               <td>{member.phone}</td>
//               <td>{member.address}</td>
//               <td>{member.dateRegistered}</td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </div>
//   );
// }

// export default AdminMembersPage;


// import { Table } from 'react-bootstrap';

// function AdminMembersPage() {
//   // Sample data of members
//   const membersData = [
//     {
//       id: 1,
//       name: 'John Doe',
//       email: 'johndoe@example.com',
//       phone: '+123456789',
//       address: '123 Main Street, Anytown, USA',
//       dateRegistered: '2022-05-10',
//     },
//     {
//       id: 2,
//       name: 'Jane Smith',
//       email: 'janesmith@example.com',
//       phone: '+987654321',
//       address: '456 Elm Street, Anytown, USA',
//       dateRegistered: '2022-04-22',
//     },
//     // Add more members data as needed
//   ];

//   return (
//     <div className="container">
//       <h1>Members List</h1>
//       <Table responsive striped bordered hover>
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Phone</th>
//             <th>Address</th>
//             <th>Date Registered</th>
//           </tr>
//         </thead>
//         <tbody>
//           {membersData.map((member, index) => (
//             <tr key={member.id}>
//               <td>{index + 1}</td>
//               <td>{member.name}</td>
//               <td>{member.email}</td>
//               <td>{member.phone}</td>
//               <td>{member.address}</td>
//               <td>{member.dateRegistered}</td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </div>
//   );
// }

// export default AdminMembersPage;
