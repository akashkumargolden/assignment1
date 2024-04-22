import React, { useState } from 'react';
import './App.css';

function App() {
  const [employees, setEmployees] = useState([
    { id: 1, name: "John Doe", age: 30, email: "john@example.com", phone: "123-456-7890" },
    { id: 2, name: "Jane Smith", age: 35, email: "jane@example.com", phone: "987-654-3210" },
    { id: 3, name: "Alice Johnson", age: 25, email: "alice@example.com", phone: "555-555-5555" },
    { id: 4, name: "Bob Brown", age: 40, email: "bob@example.com", phone: "111-222-3333" },
    { id: 5, name: "Emily Wilson", age: 28, email: "emily@example.com", phone: "999-888-7777" }
  ]);

  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [showDeleteEmployeeModal, setShowDeleteEmployeeModal] = useState(false);
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState([]);
  const [editedEmployee, setEditedEmployee] = useState(null);

  const [newEmployee, setNewEmployee] = useState({
    name: "",
    age: "",
    email: "",
    phone: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  const handleAddEmployee = () => {
    setShowAddEmployeeModal(true);
  };

  const handleAddEmployeeSubmit = () => {
    const id = employees.length + 1;
    const employeeToAdd = { ...newEmployee, id };
    setEmployees([...employees, employeeToAdd]);
    setShowAddEmployeeModal(false);
    setNewEmployee({ name: "", age: "", email: "", phone: "" });
  };

  const handleDeleteEmployee = (id) => {
    const updatedEmployees = employees.filter(emp => emp.id !== id);
    setEmployees(updatedEmployees);
  };

  const handleDeleteEmployeeSelection = () => {
    setShowDeleteEmployeeModal(true);
  };

  const handleConfirmDelete = () => {
    const updatedEmployees = employees.filter(emp => !selectedEmployeeIds.includes(emp.id));
    setEmployees(updatedEmployees);
    setShowDeleteEmployeeModal(false);
    setSelectedEmployeeIds([]);
  };

  const handleToggleEmployeeSelection = (id) => {
    if (selectedEmployeeIds.includes(id)) {
      setSelectedEmployeeIds(selectedEmployeeIds.filter(empId => empId !== id));
    } else {
      setSelectedEmployeeIds([...selectedEmployeeIds, id]);
    }
  };

  const handleEditEmployee = (employee) => {
    setEditedEmployee({ ...employee });
  };

  const handleSaveEditEmployee = () => {
    const updatedEmployees = employees.map(emp => {
      if (emp.id === editedEmployee.id) {
        return editedEmployee;
      }
      return emp;
    });
    setEmployees(updatedEmployees);
    setEditedEmployee(null);
  };

  return (
    <div className="container">
      <h1 className="nav-title">Manage Employee</h1>
      <div className="nav-buttons">
        <button onClick={handleDeleteEmployeeSelection}>Delete Employee</button>
        <button onClick={handleAddEmployee}>Add Employee</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.age}</td>
              <td>{employee.email}</td>
              <td>{employee.phone}</td>
              <td>
                <button onClick={() => handleEditEmployee(employee)}>Edit</button>
                <button onClick={() => handleDeleteEmployee(employee.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showAddEmployeeModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={() => setShowAddEmployeeModal(false)}>X</span>
            <h2>Add New Employee</h2>
            <input type="text" name="name" placeholder="Name" value={newEmployee.name} onChange={handleChange} /><br />
            <input type="number" name="age" placeholder="Age" value={newEmployee.age} onChange={handleChange} /><br />
            <input type="email" name="email" placeholder="Email" value={newEmployee.email} onChange={handleChange} /><br />
            <input type="tel" name="phone" placeholder="Phone" value={newEmployee.phone} onChange={handleChange} /><br />
            <button onClick={handleAddEmployeeSubmit}>Add Employee</button>
          </div>
        </div>
      )}

      {editedEmployee && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={() => setEditedEmployee(null)}>X</span>
            <h2>Edit Employee</h2>
            <input type="text" name="name" placeholder="Name" value={editedEmployee.name} onChange={(e) => setEditedEmployee({ ...editedEmployee, name: e.target.value })} /><br />
            <input type="number" name="age" placeholder="Age" value={editedEmployee.age} onChange={(e) => setEditedEmployee({ ...editedEmployee, age: e.target.value })} /><br />
            <input type="email" name="email" placeholder="Email" value={editedEmployee.email} onChange={(e) => setEditedEmployee({ ...editedEmployee, email: e.target.value })} /><br />
            <input type="tel" name="phone" placeholder="Phone" value={editedEmployee.phone} onChange={(e) => setEditedEmployee({ ...editedEmployee, phone: e.target.value })} /><br />
            <button onClick={handleSaveEditEmployee}>Save Changes</button>
          </div>
        </div>
      )}

      {showDeleteEmployeeModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={() => setShowDeleteEmployeeModal(false)}>X</span>
            <h2>Delete Employees</h2>
            <p>Select the employees you want to delete:</p>
            <ul>
              {employees.map(employee => (
                <li key={employee.id}>
                  <input
                    type="checkbox"
                    checked={selectedEmployeeIds.includes(employee.id)}
                    onChange={() => handleToggleEmployeeSelection(employee.id)}
                  />
                  <label>{employee.name}</label>
                </li>
              ))}
            </ul>
            <button onClick={handleConfirmDelete}>Confirm Delete</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
