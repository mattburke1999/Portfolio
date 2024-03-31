import { useState } from 'react'
import styles from './Hello.module.css'

export default function HelloPage({homeRef}) {
//   const [showProfile, setShowProfile] = useState(true)
  return (
    <>
    <div className={styles.hello} ref={homeRef}>
     <h1 className={styles.name}> Hello, I'm Matthew.</h1>
     <h1 className={styles.description}> I'm a full-stack web developer with a focus in data.</h1>
    </div>
</>
  );
}