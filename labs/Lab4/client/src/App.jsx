import { useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [singleFile, setSingleFile] = useState(null);
  const [displaySingleFile, setDisplaySingleFile] = useState(null);
  const [multipleFiles, setMultipleFiles] = useState([]);
  const [displayMultipleFiles, setDisplayMultipleFiles] = useState([]);
  const [displayDogImage, setDisplayDogImage] = useState("");

  const fetchSingleFile = async () => {
    try {
      const response = await fetch(`http://localhost:8000/fetch/single`);
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setDisplaySingleFile(imageUrl);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSingleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", singleFile);

    try {
      const response = await fetch(`http://localhost:8000/save/single`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setMessage(data.message || "Upload successful");
    } catch (error) {
      console.log(error);
      setMessage("Upload failed");
    }
  };

  const uploadMultipleFiles = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      multipleFiles.forEach((file) => {
        formData.append("files", file);
      });

      const response = await fetch(`http://localhost:8000/save/multiple`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        setMessage("There was a problem saving the files");
        return;
      }

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMultipleFiles = async () => {
    try {
      const response = await fetch(`http://localhost:8000/fetch/multiple`);
      const listData = await response.json();

      const filePromises = listData.map(async (filename) => {
        const fileResponse = await fetch(
          `http://localhost:8000/fetch/file/${filename}`
        );
        const blob = await fileResponse.blob();
        return URL.createObjectURL(blob);
      });

      const filePromiseResults = await Promise.all(filePromises);
      setDisplayMultipleFiles(filePromiseResults);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDogImage = async () => {
    try {
      const response = await fetch(`https://dog.ceo/api/breeds/image/random`);
      const data = await response.json();
      setDisplayDogImage(data.message);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDogUpload = async (e) => {
    e.preventDefault();
    try {
      const fileResponse = await fetch(displayDogImage);
      const blob = await fileResponse.blob();

      const formData = new FormData();
      formData.append("file", blob, "dog-image.jpg");

      const response = await fetch(`http://localhost:8000/save/single`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1 className="main-title">📁 File Upload Gallery</h1>
      {message && <p className="message-box">{message}</p>}

      <div className="container">
        <div className="section">
          <h2>Single File Uploader</h2>
          <form onSubmit={handleSingleUpload}>
            <input
              type="file"
              onChange={(e) => setSingleFile(e.target.files[0])}
              required
            />
            <br />
            <button type="submit">Upload</button>
          </form>
          <button type="button" onClick={fetchSingleFile}>
            Fetch Random Image
          </button>
          {displaySingleFile && (
            <>
              <h4>Fetched Image:</h4>
              <img src={displaySingleFile} alt="Fetched from server" />
            </>
          )}
        </div>

        <div className="section">
          <h2>Multiple File Uploader</h2>
          <form onSubmit={uploadMultipleFiles}>
            <input
              type="file"
              onChange={(e) => setMultipleFiles(Array.from(e.target.files))}
              required
              multiple
            />
            <br />
            <button type="submit">Upload</button>
          </form>
          <button type="button" onClick={fetchMultipleFiles}>
            Fetch Multiple Random Images
          </button>
          {displayMultipleFiles.length > 0 && (
            <>
              <h4>Fetched Images:</h4>
              <div className="multiple-images-grid">
                {displayMultipleFiles.map((imageURL, index) => (
                  <img key={index} src={imageURL} alt={`Fetched ${index}`} />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="section">
          <h2>Fetch the Dog</h2>
          <button onClick={fetchDogImage}>Doggy</button>
          {displayDogImage && (
            <div>
              <img src={displayDogImage} alt="Random dog" />
              <form onSubmit={handleDogUpload}>
                <button type="submit">Upload Dog Image</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
