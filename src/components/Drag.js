import React, { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import Design from "./design/Design";
import styles from './Drag.module.css'
import { BeatLoader } from "react-spinners";

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
                dropMessageStyle={{ height: '90%', color: '#F00' }}
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
