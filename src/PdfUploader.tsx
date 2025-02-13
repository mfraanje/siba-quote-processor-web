import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const PdfUploader: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setSelectedFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
    },
    maxFiles: 1,
  });

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('pdfFile', selectedFile);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('File uploaded successfully!');
      } else {
        alert('File upload failed.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('File upload failed.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-md p-4 w-64 text-center cursor-pointer ${
          isDragActive ? 'border-blue-500' : 'border-gray-400'
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
      {selectedFile && (
        <div className="mt-4">
          <p>Selected file: {selectedFile.name}</p>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleUpload}
          >
            Upload
          </button>
        </div>
      )}
    </div>
  );
};

export default PdfUploader;