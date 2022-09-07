import { useState } from "react";
import hookForm from "./hookForm";
import "./styles.css";

const DEFAULT_LIST_STUDENT = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe"
  },
  {
    id: 2,
    firstName: "John",
    lastName: "Doe"
  }
];

export default function App() {
  const {
    fullName,
    updateStudent,
    handleChange,
    onUpdate,
    studentsList,
    isEdit,
    handleSubmit,
    handleDelete,
    handleUpdateStudent
  } = hookForm(
    {
      firstName: "",
      lastName: ""
    },
    {
      id: "",
      firstName: "",
      lastName: ""
    },
    DEFAULT_LIST_STUDENT
  );

  return (
    <div className="App">
      <h1>Students List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="firstName"
          value={fullName.firstName}
          onChange={handleChange}
          name="firstName"
        />
        <input
          type="text"
          placeholder="lastName"
          value={fullName.lastName}
          onChange={handleChange}
          name="lastName"
        />
        <button type="submit"> add </button>
      </form>
      <div className="students-list">
        {studentsList.map((student, idx) => (
          <div key={idx} className="student">
            <div> {student.id} </div>
            <div> {student.firstName} </div>
            <div> {student.lastName} </div>
            {isEdit && updateStudent.id === student.id ? (
              <form onSubmit={handleUpdateStudent(idx)}>
                <input
                  type="text"
                  placeholder="firstName"
                  defaultValue={updateStudent.firstName}
                />
                <input
                  type="text"
                  placeholder="lastName"
                  defaultValue={updateStudent.lastName}
                />
                <button type="submit"> Update </button>
              </form>
            ) : (
              <div>
                <button onClick={() => handleDelete(student.id)}> X </button>
                <button onClick={() => onUpdate(student.id)}> update </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
