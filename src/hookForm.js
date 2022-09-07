import { useState } from "react";

const hookForm = (initial = {}, initialUpdateStudent = {}, listStudents) => {
  const [fullName, setFullName] = useState(initial);
  const [updateStudent, setUpdateStudent] = useState(initialUpdateStudent);
  const [isEdit, setIsEdit] = useState(false);
  const [studentsList, setStudentList] = useState(listStudents);

  const { firstName, lastName } = fullName;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!firstName.value && !lastName.value) {
      let newUser = {
        id: studentsList.length + 1,
        firstName,
        lastName
      };
      setStudentList([...studentsList, newUser]);
      handleClear();
    }
  };

  const handleDelete = (id) => {
    const deleteStudent = onDelete(studentsList, id);
    setStudentList(deleteStudent);
  };

  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setFullName({ ...fullName, [key]: value });
  };

  const SaveUpdateStudent = ({ id, firstName, lastName }) => {
    setUpdateStudent({
      id,
      firstName,
      lastName
    });
  };

  const onUpdate = (studentId) => {
    setIsEdit(true);
    const edit = editStudent(studentsList, studentId);
    SaveUpdateStudent(edit);
  };

  const handleUpdateStudent = (index) => (e) => {
    e.preventDefault();
    const [firstName, lastName] = e.target;

    setStudentList((prevState) => {
      const list = [...prevState];
      list[index] = {
        ...updateStudent,
        firstName: firstName.value,
        lastName: lastName.value
      };
      return list;
    });
    setIsEdit(false);
  };

  const handleClear = () => {
    setFullName(initial);
  };

  const editStudent = (studentsList, studentId) =>
    studentsList.find((student) => student.id === studentId);

  const onDelete = (studentsList, id) => {
    return studentsList.filter((student) => student.id !== id);
  };

  return {
    fullName,
    updateStudent,
    handleChange,
    onUpdate,
    studentsList,
    isEdit,
    handleSubmit,
    handleDelete,
    handleUpdateStudent
  };
};

export default hookForm;
