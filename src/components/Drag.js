import React, { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ['TXT'];

function DragDrop() {
    const [file, setFile] = useState(null);
    const [fileContent, setFileContent] = useState('');
    const [fileTypeErr, setFileTypeErr] = useState('');


    let repeatedCount = 0;

    const handleChange = (file) => {
        setFile(file);
        setFileTypeErr(''); // Clear any previous error message

        // Read the content of the file
        const reader = new FileReader();
        reader.onload = function (event) {
            const content = event.target.result;
            // console.log('File content:', content);
            if (content === '') {
                setFileTypeErr('Empty File please provide texted file')
                setFileContent('');
            } else {
                setFileContent(content);
            }
        };
        reader.readAsText(file);
    };

    const handleFileError = (err) => {
        if (err) {
            setFileContent('')
            setFileTypeErr(`${err}. Please upload or drag and drop files with .txt extension only.`);
        } else {
            setFileTypeErr('');
        }
    };


    function handleRepeated() {
        let wordsArr = fileContent.split(' ');
        let uniqueWords = wordsArr.filter((word, index) => {
            if (wordsArr.indexOf(word) === index) {
                return word;
            } else {
                repeatedCount++
            }
        });
        let uniqueString = uniqueWords.join(' ');
        return uniqueString;
    }




    return (
        <div>
            <FileUploader
                handleChange={handleChange}
                maxSize={1}
                onSizeError={(file) => console.log(file)}
                onTypeError={(err) => handleFileError(err)}
                onDrop={(file) => console.log(file)}
                onSelect={(file) => console.log(file)}
                name="file"
                types={fileTypes}
                hoverTitle={'Drooooop'}
                label="Upload TXT file" />
            {fileTypeErr && <p style={{ color: "#F00" }}>{fileTypeErr}</p>}
            <p>{fileContent}</p>

            <p>{handleRepeated()}</p>
            <p>Count : {repeatedCount}</p>
        </div>
    );
}

export default DragDrop;
