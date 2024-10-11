import "./style.css";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

const predefinedSubjects = [
  "Mathematics",
  "English",
  "French",
  "Economics",
 
];

const MAX_SCORE = 100;

function ResultMaker() {
  const { className } = useParams();
  const [studentNames, setStudentNames] = useState([""]);
  const [studentSubjects, setStudentSubjects] = useState(
    [predefinedSubjects.map((subject) => ({ name: subject, score: "" }))] 
  );
  const [newSubject, setNewSubject] = useState("");

  const [reportCards, setReportCards] = useState([]);
  const [totalStudents, setTotalStudents] = useState("");
  const [studentsSat, setStudentsSat] = useState("");

  const handleNameChange = (index, value) => {
    const updatedNames = [...studentNames];
    updatedNames[index] = value;
    setStudentNames(updatedNames);
  };

  const handleScoreChange = (studentIndex, subjectIndex, value) => {
    const updatedSubjects = [...studentSubjects];
    updatedSubjects[studentIndex][subjectIndex].score = value;
    setStudentSubjects(updatedSubjects);
  };

  const handleAddStudent = () => {
    setStudentNames([...studentNames, ""]);
    setStudentSubjects([...studentSubjects, [...predefinedSubjects.map((subject) => ({ name: subject, score: "" }))]]);
  };

  const handleAddSubject = (studentIndex) => {
    if (!newSubject.trim()) return;

    const updatedSubjects = [...studentSubjects];
    updatedSubjects[studentIndex].push({ name: newSubject, score: "" });
    setStudentSubjects(updatedSubjects);
    setNewSubject(""); // Reset the input after adding the subject
  };

  const handleDeleteSubject = (studentIndex, subjectIndex) => {
    const updatedSubjects = [...studentSubjects];
    updatedSubjects[studentIndex].splice(subjectIndex, 1);
    setStudentSubjects(updatedSubjects);
  };

  const calculateAveragePercentage = (studentIndex) => {
    const scores = studentSubjects[studentIndex];
    const total = scores.reduce((sum, subject) => sum + (Number(subject.score) || 0), 0);
    const count = scores.filter((subject) => subject.score !== "").length;

    return count > 0 ? ((total / (count * MAX_SCORE)) * 100).toFixed(2) : 0;
  };

  const calculateAverageOutOf20 = (studentIndex) => {
    const scores = studentSubjects[studentIndex];
    const total = scores.reduce((sum, subject) => sum + (Number(subject.score) || 0), 0);
    const count = scores.filter((subject) => subject.score !== "").length;

    return count > 0 ? ((total / count) * (20 / MAX_SCORE)).toFixed(2) : 0;
  };

  const getGrade = (score) => {
    if (score >= 75) return "A";
    if (score >= 65) return "B";
    if (score >= 50) return "C";
    if (score >= 40) return "D";
    return "F";
  };

  const getRemark = (average) => {
    if (average >= 75) return "Excellent";
    if (average >= 50) return "Very Good";
    if (average >= 40) return "B.AV";
    return "Poor";
  };

  // Calculate the position of students based on their average score
  const calculatePositions = (reportCards) => {
    const sortedReportCards = [...reportCards].sort((a, b) => b.averagePercentage - a.averagePercentage);
    return sortedReportCards.map((student, index) => ({
      ...student,
      position: index + 1, // Assign position based on rank
    }));
  };

  const handleSubmitResults = () => {
    const newReportCards = studentNames.map((name, studentIndex) => {
      const subjects = studentSubjects[studentIndex];
      const averagePercentage = calculateAveragePercentage(studentIndex);
      const averageOutOf20 = calculateAverageOutOf20(studentIndex);
      const remark = getRemark(averagePercentage);

      return {
        name,
        subjects,
        averagePercentage,
        averageOutOf20,
        remark,
      };
    });

    const rankedReportCards = calculatePositions(newReportCards); // Rank students based on performance
    setReportCards(rankedReportCards);
  };

  const handleDeleteReportCard = (index) => {
    const updatedReportCards = reportCards.filter((_, i) => i !== index);
    setReportCards(updatedReportCards);
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    const reportContent = reportCards
      .map(
        (card) => `
      <div class="report-card" style="page-break-after: always;">
        <h3>${card.name}'s Report Card</h3>
        <p>Position: ${card.position}</p>
        <p>Total Students: ${totalStudents}</p>
        <p>Students Sat for Exam: ${studentsSat}</p>
        <table>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Score</th>
              <th>Grade</th>
              <th>Remark</th>
            </tr>
          </thead>
          <tbody>
            ${card.subjects
              .map(
                (subject) => `
              <tr>
                <td>${subject.name}</td>
                <td class="${subject.score < 50 ? "red" : ""}">${subject.score || 0}</td>
                <td>${getGrade(subject.score)}</td>
                <td>${getRemark(Number(subject.score) || 0)}</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
        <table>
          <tbody>
            <tr>
              <td>Average (%): <span class="${card.averagePercentage < 10 ? "red" : ""}">${card.averagePercentage}</span></td>
              <td style="float: right;">Average (20.00): <span class="${card.averageOutOf20 < 10 ? "red" : ""}">${card.averageOutOf20}</span></td>
            </tr>
            <tr>
              <td>Remark: <strong>${card.remark}</strong></td>
            </tr>
          </tbody>
        </table>
        <div class="signature">
          <p>Principal's Signature: ______________________</p>
        </div>
      </div>
    `
      )
      .join("");

    printWindow.document.write(`
      <html>
        <head>
          <title>Report Cards</title>
          <style>
            body { font-family: Arial, sans-serif; }
            .report-card { margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th, td { border: 1px solid #ccc; padding: 10px; text-align: center; }
            .red { color: red; }
            @media print {
              .report-card { page-break-after: always; }
            }
          </style>
        </head>
        <body>
          ${reportContent}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="result-maker">
      <h2>Manage Results for {className}</h2>

      <div className="input-bar">
        <label>
          Total Students in Class:
          <input
            type="number"
            value={totalStudents}
            onChange={(e) => setTotalStudents(e.target.value)}
          />
        </label>
        <label>
          Students Sat for Exam:
          <input
            type="number"
            value={studentsSat}
            onChange={(e) => setStudentsSat(e.target.value)}
          />
        </label>
      </div>

      <table>
        <tbody>
          {studentNames.map((name, studentIndex) => (
            <React.Fragment key={studentIndex}>
              <tr>
                <th colSpan={studentSubjects[studentIndex].length + 2}>
                  <strong>Student {studentIndex + 1} Information</strong>
                </th>
              </tr>
              <tr>
                <td>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => handleNameChange(studentIndex, e.target.value)}
                  />
                </td>
                {studentSubjects[studentIndex].map((subject, subjectIndex) => (
                  <td key={subjectIndex}>
                    <strong>{subject.name}</strong>
                  </td>
                ))}
              </tr>
              <tr>
                <td>Scores:</td>
                {studentSubjects[studentIndex].map((subject, subjectIndex) => (
                  <td key={subjectIndex}>
                    <input
                      type="number"
                      value={subject.score}
                      onChange={(e) => handleScoreChange(studentIndex, subjectIndex, e.target.value)}
                      max={MAX_SCORE}
                    />
                    <button onClick={() => handleDeleteSubject(studentIndex, subjectIndex)}>Delete</button>
                  </td>
                ))}
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>

      <div className="button-container">
        <button onClick={handleAddStudent}>Add Student</button>
       
        <button onClick={handleSubmitResults}>Submit Results</button>
        <input
          type="text"
          placeholder="New Subject"
          value={newSubject}
          onChange={(e) => setNewSubject(e.target.value)}
        />
        <button onClick={() => handleAddSubject(0)}>Add Subject</button> {/* Use studentIndex as needed */}
      </div>

      <div className="report-cards">
        {reportCards.map((card, index) => (
          <div key={index} className="report-card">
            <h3>{card.name}'s Report Card</h3>
            <p>Position: {card.position}</p>
            <p>Total Students: {totalStudents}</p>
            <p>Students Sat for Exam: {studentsSat}</p>
            <table>
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Score</th>
                  <th>Grade</th>
                  <th>Remark</th>
                </tr>
              </thead>
              <tbody>
                {card.subjects.map((subject) => (
                  <tr key={subject.name}>
                    <td>{subject.name}</td>
                    <td className={subject.score < 50 ? "red" : ""}>{subject.score || 0}</td>
                    <td>{getGrade(subject.score)}</td>
                    <td>{getRemark(Number(subject.score) || 0)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <table>
              <tbody>
                <tr>
                  <td>Average (%): <span className={card.averagePercentage < 10 ? "red" : ""}>{card.averagePercentage}</span></td>
                  <td style={{ float: "right" }}>Average (20.00): <span className={card.averageOutOf20 < 10 ? "red" : ""}>{card.averageOutOf20}</span></td>
                </tr>
                <tr>
                  <td>Remark: <strong>{card.remark}</strong></td>
                </tr>
              </tbody>
            </table>
            <div className="signature">
              <p>Principal's Signature: ______________________</p>
            </div>
            <button onClick={() => handleDeleteReportCard(index)}>Delete Report Card</button>
          </div>
        ))}
      </div>

      <button onClick={handlePrint}>Print Report Cards</button>
    </div>
  );
}

export default ResultMaker;
