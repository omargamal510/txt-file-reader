import React, { useState } from 'react';

function FileUpload() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileContent, setFileContent] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.name.endsWith('.txt')) {
            setSelectedFile(file);
            setErrorMessage('');
            console.log(event);
        } else {
            setSelectedFile(null);
            setErrorMessage('Please select a .txt file');
        }
    };

    const handleUpload = () => {
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = function (event) {
                const content = event.target.result;
                console.log(reader)
            };
            reader.readAsText(selectedFile);
        } else {
            console.log('No file selected');
        }
    };

    return (
        <div>
            <input type="file" accept=".txt" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={!selectedFile}>
                Upload
            </button>
            {errorMessage && <small style={{ color: 'red' }}>{errorMessage}</small>}
            {fileContent && (
                <div>
                    <h2>File Content:</h2>
                    <pre>{fileContent}</pre>
                </div>
            )}
        </div>
    );
}

export default FileUpload;
