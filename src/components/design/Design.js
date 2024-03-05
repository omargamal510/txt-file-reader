import React from 'react'
import styles from './Design.module.css'

export default function Design({ bool }) {
    return <>
        <main className={styles.container}>
            <div className=''>
                <h1>Drop your files or upload</h1>
                <img src='file.svg' className={styles.fileimg} />
            </div>
        </main>
    </>
}
