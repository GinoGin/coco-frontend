import React, { useState } from "react";
import axios from "axios";
import "./DragAndDrop.css";

function DragAndDrop() {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [resultt, setResultt] = useState('');


  

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
        if(response.data.hasDisease=='true'){
          setResultt("The leaf has Disease")
        }
        else{
          setResultt("The leaf is healthy")
        }
        handleDetectDisease()
        console.log(response.data);
      
      })
      .catch(error => {
        console.error(error);
      });
  };

  
  const handleShowPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleDetectDisease = () => {
    setShowPopup(true);
  };

  return (
    <div>
      <div 
        className={`drag-drop-container ${isDragging ? "dragging" : ""}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="drag-drop-text">
          Drag &amp; Drop your leaf image here or 
          
          <input
            id="file-input"
            type="file"
            accept="image/*"
            onChange={(event) => setSelectedFile(event.target.files[0])}
          />
        </div>
      </div>
      <div className="text-center">
      <button type="button" className="btn btn-primary" onClick={handleSubmit} disabled={!selectedFile}>
        Detect Disease
      </button>
      </div>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Disease Result</h3>
            <h3>{resultt}</h3>
            <button onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}
      
      {/* {result && (
        <div className="result-container">
          {result.hasDisease=='true' ? (
            <p>The leaf has a disease:</p>
          ) : (
            <p>The leaf is healthy.</p>
          )}
         
        </div>
      )} */}
      
    </div>
  );
}

export default DragAndDrop;