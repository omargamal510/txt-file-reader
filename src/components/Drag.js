import React, { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import Design from "./design/Design";

const fileTypes = ['TXT'];

function DragDrop() {
    const [file, setFile] = useState(null);
    const [fileContent, setFileContent] = useState('');
    const [fileName, setFileName] = useState('')
    const [fileTypeErr, setFileTypeErr] = useState('');
    const [booll, setBooll] = useState(false);

    let repeatedCount = 0;

    const handleChange = (file) => {
        setFile(file);
        setFileTypeErr(''); // Clear any previous error message
        setFileName(file.name)
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
                onDrop={() => { setBooll(true) }}
                onSelect={() => { setBooll(true) }}
                name="file"
                children={<Design bool={booll} />}
                types={fileTypes}
                hoverTitle={'Drooooop'}
                label="Upload TXT file" />
            {fileTypeErr && <p style={{ color: "#F00" }}>{fileTypeErr}</p>}
            <p>Text : {fileContent}</p>
            <p>file name : {fileName}</p>

            <p>text without repeat : {handleRepeated()}</p>
            <p>Count : {repeatedCount}</p>

        </div>
    );
}

export default DragDrop;
