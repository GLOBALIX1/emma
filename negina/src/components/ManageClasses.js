import React, { useState, useEffect } from "react";
import "./style.css";

function ManageClasses() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [teacherInfo, setTeacherInfo] = useState({
    name: "",
    email: "",
    subject: "",
  });

  const [students, setStudents] = useState(
    Array.from({ length: 20 }, () => ({ name: "", marks: "" }))
  );

  const [submittedFiles, setSubmittedFiles] = useState([]); // State for submitted files

  // Load submitted files from local storage on component mount
  useEffect(() => {
    const savedFiles = JSON.parse(localStorage.getItem("submittedFiles")) || [];
    setSubmittedFiles(savedFiles);
  }, []);

  // Save submitted files to local storage whenever they are updated
  useEffect(() => {
    localStorage.setItem("submittedFiles", JSON.stringify(submittedFiles));
  }, [submittedFiles]);

  const openDialog = (className) => {
    setSelectedClass(className);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedClass(null);
  };

  const handleTeacherInputChange = (e) => {
    const { name, value } = e.target;
    setTeacherInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleStudentChange = (index, e) => {
    const { name, value } = e.target;
    const updatedStudents = [...students];
    updatedStudents[index] = { ...updatedStudents[index], [name]: value };
    setStudents(updatedStudents);
  };

  const handleAddStudent = () => {
    setStudents([...students, { name: "", marks: "" }]);
  };

  const handleRemoveStudent = (index) => {
    const updatedStudents = students.filter((_, i) => i !== index);
    setStudents(updatedStudents);
  };

  const generateCSV = () => {
    const rows = [
      ["Teacher Name", "Email", "Subject", "Student Name", "Marks"],
      [teacherInfo.name, teacherInfo.email, teacherInfo.subject],
      ...students.map((student) => [student.name, student.marks]),
    ];

    // Convert rows to CSV format
    return rows.map((row) => row.join(",")).join("\n");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const csvData = generateCSV();
    const fileName = `${selectedClass.replace(/\s+/g, "_")}_grades.csv`;

    // Create a Blob from the CSV data
    const blob = new Blob([csvData], { type: "text/csv" });
    const fileUrl = URL.createObjectURL(blob);

    // Add file information to submitted files state and local storage
    const newFile = { name: fileName, url: fileUrl };
    setSubmittedFiles((prevFiles) => [...prevFiles, newFile]);

    alert(`Information submitted for ${selectedClass}`);
    closeDialog();
  };

  const classes = [
    "Form One Grammar", "Form One Commercial", "Form One Technical",
    "Form Two Grammar", "Form Two Commercial", "Form Two Technical",
    "Form Three Grammar", "Form Three Commercial", "Form Three Technical",
    "Form Four Grammar", "Form Four Commercial", "Form Four Technical",
    "Form Five Grammar", "Form Five Commercial", "Form Five Technical",
    "Lower Sixth Science", "Lower Sixth Arts", "Lower Sixth Commercial",
    "Upper Sixth Science", "Upper Sixth Arts", "Upper Sixth Commercial",
  ];

  const generateWhatsAppLink = (className) => {
    const message = `Please fill in your details for ${className}`;
    return `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
  };

  const generateTelegramLink = (className) => {
    const message = `Please fill in your details for ${className}`;
    return `https://t.me/share/url?url=${encodeURIComponent(
      "http://your-app-link.com"
    )}&text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="manage-classes-page">
      <h1>Manage Classes</h1>
      <p>Here you can manage your classes, assign students, and handle their progress.</p>

      <h2>Classes</h2>
      <div className="class-table-container">
        <table className="class-table">
          <thead>
            <tr>
              <th>Class Name</th>
              <th>Actions</th>
              <th>WhatsApp</th>
              <th>Telegram</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((className) => (
              <tr key={className}>
                <td>{className}</td>
                <td>
                  <button onClick={() => openDialog(className)} className="open-class-btn">
                    Open Class List
                  </button>
                </td>
                <td>
                  <a
                    href={generateWhatsAppLink(className)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-button whatsapp-link"
                  >
                    WhatsApp Link
                  </a>
                </td>
                <td>
                  <a
                    href={generateTelegramLink(className)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-button telegram-link"
                  >
                    Telegram Link
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isDialogOpen && (
        <div className="dialog-overlay">
          <div className="dialog-box">
            <h2>Submit Information for {selectedClass}</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Teacher Name:</label>
                <input
                  type="text"
                  name="name"
                  value={teacherInfo.name}
                  onChange={handleTeacherInputChange}
                  required
                />
              </div>
              <div>
                <label>Teacher Email:</label>
                <input
                  type="email"
                  name="email"
                  value={teacherInfo.email}
                  onChange={handleTeacherInputChange}
                  required
                />
              </div>
              <div>
                <label>Subject:</label>
                <input
                  type="text"
                  name="subject"
                  value={teacherInfo.subject}
                  onChange={handleTeacherInputChange}
                  required
                />
              </div>
              <h3>Students List</h3>
              <div className="student-table-container">
                <table className="student-table">
                  <thead>
                    <tr>
                      <th>Student Name</th>
                      <th>Marks</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student, index) => (
                      <tr key={index}>
                        <td>
                          <input
                            type="text"
                            name="name"
                            placeholder={`Student ${index + 1}`}
                            value={student.name}
                            onChange={(e) => handleStudentChange(index, e)}
                            required
                          />
                        </td>
                        <td>
                          <input
                            className="marks-input"
                            type="number"
                            name="marks"
                            placeholder="Marks"
                            value={student.marks}
                            onChange={(e) => handleStudentChange(index, e)}
                            required
                          />
                        </td>
                        <td>
                          <button type="button" onClick={() => handleRemoveStudent(index)}>
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="student-actions">
                <button type="button" onClick={handleAddStudent}>
                  Add Another Student
                </button>
              </div>
              <button type="submit">Submit</button>
              <button type="button" onClick={closeDialog}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      <h2>Submitted Files</h2>
      <div className="submitted-files">
        {submittedFiles.length > 0 ? (
          <ul>
            {submittedFiles.map((file, index) => (
              <li key={index}>
                <a href={file.url} download={file.name}>
                  {file.name}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No files submitted yet.</p>
        )}
      </div>
    </div>
  );
}

export default ManageClasses;
