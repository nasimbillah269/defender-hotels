import React, { useState } from 'react';
import { FiUpload } from 'react-icons/fi';

function UploadCV() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState()
  const [uploadMassage, setUploadMassage] = useState('')

  const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];

//     if (file && file.type.startsWith('image/')) {
//       setIsUploading(true);

//       const reader = new FileReader();
//       reader.onload = (event) => {
//         // Simulate upload delay
//         setTimeout(() => {
//           setSelectedImage(event.target.result);
//           setIsUploading(false);
//         }, 2000); // Simulated loading time
//       };
//       reader.readAsDataURL(file);
//     } else {
//       alert('Please select an image file.');
//     }
//   };

const handleFileChange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  setIsUploading(true);

  const formData = new FormData();
  formData.append('cv', file); // Laravel expects this name

  try {
    const response = await fetch('/uploadcv', {
      method: 'POST',
      body: formData,
      credentials: 'include', // Required for Laravel session cookies
      headers: {
        'X-CSRF-TOKEN': csrfToken,
      },
    });

    if (!response.ok) throw new Error('Upload failed');

    const data = await response.json();
    setUploadStatus(data.status)
    setUploadMassage(data.message)
    
  } catch (error) {
    alert('Error: ' + error.message);
  } finally {
    setIsUploading(false);
  }
};


  return (
    <div className="uploadCVMain">

   
    <div className="cvdropDiv">
      {/* Icon + Upload or Loading */}
      <div className="text-center me-4">
        {isUploading ? (
          <div className="loadingCon">
            <div className="d-flex flex-column align-items-center">
                <div className="spinner-border text-primary mb-2" role="status" />
                <span className="text-primary">Uploading...</span>
            </div>
          </div>  
          
        ) : (
          <>
            <div className="loadingCon">
                <div className="upcion">
              <FiUpload style={{ fontSize: '24px' }} />
            </div>
            <label className="upbutton">
                Upload CV
              <input type="file" hidden  onChange={handleFileChange} />
            </label>
            </div>
          </>
        )}
      </div>

      {/* Image Preview */}
      <div>
        {uploadStatus ? <p style={{color: "green"}}>{uploadMassage}</p> : <p style={{color: "red"}}>{uploadMassage}</p>}
        <h5 className="fw-bold mb-2">Upload Your CV</h5>
        <p className="mb-2">
            Click on the button to upload
            your CV and our HR will be in
            touch with you.
        </p>

        {/* {selectedImage && !isUploading && (
          <img
            src={selectedImage}
            alt="Selected"
            className="img-thumbnail"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        )} */}
      </div>
    </div>
    
     </div>
  );
}

export default UploadCV;
