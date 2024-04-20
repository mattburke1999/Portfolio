import styles from './Hello.module.css'

export default function HelloPage({homeRef}) {
  return (
    <>
    <div className={styles.hello} ref={homeRef}>
     <h1 className={styles.name}> Hello, I'm <span className={styles.highlight1}>Matthew</span>.</h1>
     <h1 className={styles.description}> I'm a <span className={styles.highlight2}>full-stack web developer</span> with a focus </h1>
     <h1 className={styles.description}>in <span className={styles.highlight3}>big-data applications</span>.</h1>
    </div>
</>
  );
}