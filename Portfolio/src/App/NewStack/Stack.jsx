import styles from "./Stack.module.css"


import AboutMeCard from "./AboutMeCard/AboutMeCard"
import TechStack from "./TechStack/TechStack"

export default function NewStack() {
    return (
        <div className={styles.stackPage}style={{width: '100%', height: '95vh', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', position: 'relative'}}>
            <h1 className={styles.title}>About Me</h1>
            <AboutMeCard />
            <TechStack />
        </div>
    )
}