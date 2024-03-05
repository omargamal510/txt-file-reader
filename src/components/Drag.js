import React, { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import Design from "./design/Design";
import styles from './Drag.module.css'
import { BeatLoader } from "react-spinners";

/**
 * @typedef {Object} File
 * @property {string} name - The name of the file.
 * @property {string} type - The MIME type of the file.
 * @property {number} size - The size of the file in bytes.
 */

/**
 * @typedef {Object} Props
 * @property {function} handleChange - Function to handle file change.
 * @property {number} maxSize - Maximum allowed file size in MB.
 * @property {function} onSizeError - Function to handle size error.
 * @property {function} onTypeError - Function to handle type error.
 * @property {function} onSelect - Function to handle file selection.
 * @property {function} onDrop - Function to handle file drop.
 * @property {Object} dropMessageStyle - Style object for drop message.
 * @property {string} name - Name of the file.
 * @property {JSX.Element} children - Child component to display.
 * @property {string[]} types - Allowed file types.
 * @property {string} label - Label for file uploader.
 */

/**
 * Component function for handling file uploads and displaying file content.
 * @function DragDrop
 * @returns {JSX.Element} The JSX element representing the DragDrop component.
 */





const fileTypes = ['TXT'];

function DragDrop() {
    const [file, setFile] = useState(null);
    const [fileContent, setFileContent] = useState('');
    const [fileName, setFileName] = useState('')
    const [fileTypeErr, setFileTypeErr] = useState('');
    const [booll, setBooll] = useState(false);
    const [loading, setLoading] = useState(false)
    let repeatedCount = 0;

    const handleChange = (file) => {
        setTimeout(() => {
            setFile(file);
            setFileTypeErr(''); // Clear any previous error message
            setFileName(file.name);

            // Read the content of the file
            const reader = new FileReader();
            reader.onload = function (event) {
                const content = event.target.result;
                if (content === '') {
                    setFileTypeErr('Empty File please provide texted file');
                    setFileContent('');
                } else {
                    setFileContent(content);
                }
            };
            reader.readAsText(file);
            handleBool();
            setLoading(false)
        }, 2000)
    };

    const handleFileError = (err) => {
        if (err) {
            setBooll(false);
            setFileContent('');
            setFileTypeErr(`${err}. Please upload or drag and drop files with .txt extension only.`);
        } else {
            setBooll(true);
            setFileTypeErr('');
        }
    };

    function handleRepeated() {
        let wordsArr = fileContent.split(' ');
        let wordCountMap = {};

        wordsArr.forEach(word => {
            word = word.trim();
            if (word !== '') {
                if (wordCountMap[word]) {
                    wordCountMap[word]++;
                    repeatedCount++;
                } else {
                    wordCountMap[word] = 1;
                }
            }
        });

        // Create JSX representation of the word count table
        const tableRows = Object.keys(wordCountMap).map((word, index) => (
            <tr key={index}>
                <td>{word}</td>
                <td>{wordCountMap[word]}</td>
            </tr>
        ));

        return <>
            {!fileTypeErr && <div>
                <table border={1} className={styles.table}>
                    <thead>
                        <tr>
                            <th>Word</th>
                            <th>Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableRows}
                    </tbody>
                </table></div>}
        </>;
    }

    function handleBool() {
        if (fileTypeErr !== '') {
            setBooll(false);
        } else {
            setBooll(true);
            setFileTypeErr('');
        }
    }

    return (
        <div className={styles.maindiv}>
            <FileUploader
                handleChange={handleChange}
                maxSize={1}
                onSizeError={(file) => console.log(file)}
                onTypeError={(err) => handleFileError(err)}
                onSelect={() => { setLoading(true) }}
                onDrop={() => { setLoading(true) }}
                dropMessageStyle={{ height: '90%' }}
                name="file"
                children={<Design bool={booll} />}
                types={fileTypes}
                label="Upload TXT file" />


            {loading ? <div>
                <BeatLoader
                    color={'#FFF'}
                />
            </div> : ''}

            {fileTypeErr && <p className={styles.errormsg} >Error : {fileTypeErr}</p>}

            <p className={styles.content}>Text : {fileContent}</p>
            {!fileTypeErr && <p className={styles.content}>file name : <span>{fileName}</span></p>}
            {!fileTypeErr && <div>{handleRepeated()}</div>}

            {repeatedCount === 0 ? 'There is no repeated words so far' :
                <p className={styles.count}>Number of repeated words is : <span>{repeatedCount}</span></p>
            }

        </div>
    );
}

export default DragDrop;
