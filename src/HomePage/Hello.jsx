import { useState } from 'react'
import styles from './Hello.module.css'

export default function HelloPage({homeRef}) {
//   const [showProfile, setShowProfile] = useState(true)
  return (
    <>
    <div className={styles.hello} ref={homeRef}>
     <h1 className={styles.name}> Hello, I'm <span className={styles.highlight}>Matthew</span>.</h1>
     <h1 className={styles.description}> I'm a <span className={styles.highlight}>full-stack web developer</span> with a focus </h1>
     <h1 className={styles.description}>in <span className={styles.highlight}>big-data applications</span>.</h1>
    </div>
</>
  );
}