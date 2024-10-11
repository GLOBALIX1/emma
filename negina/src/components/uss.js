import "./style.css";
import React, { useState } from "react";

// uss.js

const predefinedSubjects = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Geography",
  "History",
  "French Language",
  "English Language",
  "Citizenship",
  "Literature",
];

const MAX_SCORE = 100;

function Uss() {
  const [studentNames, setStudentNames] = useState([""]);
  const [results, setResults] = useState([{}]);
  const [reportCards, setReportCards] = useState([]);
  const [totalStudents, setTotalStudents] = useState("");
  const [studentsSat, setStudentsSat] = useState("");

  const handleNameChange = (index, value) => {
    const updatedNames = [...studentNames];
    updatedNames[index] = value;
    setStudentNames(updatedNames);
  };

  const handleScoreChange = (studentIndex, subjectIndex, value) => {
    const updatedResults = [...results];
    if (!updatedResults[studentIndex]) {
      updatedResults[studentIndex] = {};
    }
    updatedResults[studentIndex][subjectIndex] = value;
    setResults(updatedResults);
  };

  const handleAddStudent = () => {
    setStudentNames([...studentNames, ""]);
    setResults([...results, {}]);
  };

  const calculateAveragePercentage = (studentIndex) => {
    const scores = results[studentIndex];
    const total = Object.values(scores).reduce((sum, score) => sum + (Number(score) || 0), 0);
    const count = Object.values(scores).filter((score) => score !== "").length;

    return count > 0 ? ((total / (count * MAX_SCORE)) * 100).toFixed(2) : 0;
  };

  const calculateAverageOutOf20 = (studentIndex) => {
    const scores = results[studentIndex];
    const total = Object.values(scores).reduce((sum, score) => sum + (Number(score) || 0), 0);
    const count = Object.values(scores).filter((score) => score !== "").length;

    return count > 0 ? ((total / count) * (20 / MAX_SCORE)).toFixed(2) : 0;
  };

  const getRemark = (average) => {
    if (average >= 75) return "Excellent";
    if (average >= 50) return "Very Good";
    if (average >= 40) return "Good";
    return "Poor";
  };

  const handleSubmitResults = () => {
    const newReportCards = studentNames.map((name, studentIndex) => {
      const scores = results[studentIndex];
      const averagePercentage = calculateAveragePercentage(studentIndex);
      const averageOutOf20 = calculateAverageOutOf20(studentIndex);
      const remark = getRemark(averagePercentage);

      return {
        name,
        scores,
        averagePercentage,
        averageOutOf20,
        remark,
      };
    });

    setReportCards(newReportCards);
  };

  const handleDeleteReportCard = (index) => {
    const updatedReportCards = reportCards.filter((_, i) => i !== index);
    setReportCards(updatedReportCards);
  };

  return (
    <div className="result-maker">
      <h2>Manage Upper Sixth Science Results</h2>

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
        <thead>
          <tr>
            <th>Student Name</th>
            {predefinedSubjects.map((subject) => (
              <th key={subject}>{subject}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {studentNames.map((name, studentIndex) => (
            <tr key={studentIndex}>
              <td>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => handleNameChange(studentIndex, e.target.value)}
                />
              </td>
              {predefinedSubjects.map((subject, subjectIndex) => (
                <td key={subjectIndex}>
                  <input
                    type="number"
                    placeholder="Score"
                    value={results[studentIndex]?.[subjectIndex] || ""}
                    onChange={(e) => handleScoreChange(studentIndex, subjectIndex, e.target.value)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={handleAddStudent}>Add Another Student</button>
      <button onClick={handleSubmitResults}>Submit Results</button>

      <div className="report-cards-container">
        {reportCards.map((card, index) => (
          <div key={index} className="report-card">
            <h3>{card.name}'s Report Card</h3>
            <p>Total Students: {totalStudents}</p>
            <p>Students Sat for Exam: {studentsSat}</p>
            <table>
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {predefinedSubjects.map((subject, subIndex) => (
                  <tr key={subIndex}>
                    <td>{subject}</td>
                    <td className={card.scores[subIndex] < 50 ? 'red' : ''}>
                      {card.scores[subIndex] || 0}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="averages">
              <p>Average (%): <span className={card.averagePercentage < 10 ? 'red' : ''}>{card.averagePercentage}</span></p>
              <p style={{ float: 'right' }}>Average (20.00): <span className={card.averageOutOf20 < 10 ? 'red' : ''}>{card.averageOutOf20}</span></p>
              <p>Remark: <strong>{card.remark}</strong></p>
            </div>
            <button onClick={() => handleDeleteReportCard(index)}>Delete Report Card</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Uss;
