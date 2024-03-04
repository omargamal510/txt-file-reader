import React from 'react'
import style from './Design.module.css'

export default function Design({ bool }) {
    return <>
        <div>handleUpload
            <h1 style={{ color: "red", cursor: 'pointer' }}>{bool ? 'Uploaded' : 'Hello'}</h1>
        </div>
    </>
}
