import React, { useState } from "react";
import axios from "axios";
import "./DragAndDrop.css";

function DragAndDrop() {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleDragEnter = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    setSelectedFile(file);
  };
  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", selectedFile);
    axios.post('http://localhost:8000/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-CSRFToken': getCookie('csrftoken'),
        }
      })
      .then(response => {
        setResult(response.data)
        console.log(response.data);
        // Handle the response from the server here
      })
      .catch(error => {
        console.error(error);
        // Handle the error here
      });
  };

  return (
    <div>
       <div class="container">
  <h1 class="text-center py-4">Eriophyid Disease Identification</h1>
</div>
      <div 
        className={`drag-drop-container ${isDragging ? "dragging" : ""}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="drag-drop-text">
          Drag &amp; Drop your leaf image here or
          <label htmlFor="file-input" className="browse-label">
            browse
          </label>
          <input
            id="file-input"
            type="file"
            accept="image/*"
            onChange={(event) => setSelectedFile(event.target.files[0])}
          />
        </div>
      </div>
      <button type="button" onClick={handleSubmit} disabled={!selectedFile}>
        Detect Disease
      </button>
      {result && (
        <div className="result-container">
          {result.hasDisease=='true' ? (
            <p>The leaf has a disease:</p>
          ) : (
            <p>The leaf is healthy.</p>
          )}
          {/* <img src={result.imageURL} alt="Leaf" /> */}
        </div>
      )}
    </div>
  );
}

export default DragAndDrop;