import React, { useState } from "react";

function FillForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleFormSubmission = (e) => {
    e.preventDefault();
    alert("Form submitted successfully!");
    // Implement your form submission logic here (e.g., send data to your backend)
  };

  return (
    <div className="fill-form-page">
      <h1>Fill Your Information</h1>
      <form onSubmit={handleFormSubmission}>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <textarea
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default FillForm;
