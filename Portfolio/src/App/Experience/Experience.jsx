import styles from './Experience.module.css'


export default function Experience({expRef}) {

    const experiences = [
        {
            title: "Software Engineer - Loyalty Lane (Givex)",
            dates: "Nov 2022 - Present",
            descriptions: [
                "Develop full-stack features in C# ASP.NET dashboard app; maintain backend logic and JavaScript-driven interactivity",
                "Work across Azure ecosystem using DevOps pipelines, Functions, Portal tools, and triggers for automation and tasks",
                "Write and optimize SQL for reports, in-app tools, and backend tasks; manage SPs across Azure and MySQL DBs",
                "Contribute to internal tools and new features supporting loyalty programs, shopper data, offers, and reporting"
            ]
        },
        {
            title: "Data Analyst Intern - Loyalty Lane (Givex)",
            dates: "Aug 2022 - Nov 2022",
            descriptions: [
                "Implemented version control for reporting system and integrated into existing applications using reporting system",
                "Developed an application with Python to validate reports, converting from a manual process to an automated process",
                "Assisted colleagues with writing SQL queries to effectively collect data for generating new reports for clients",
                "Tasked with cleaning and organizing the data warehouse to make it more efficient and easier to work with"
            ]
        },
        {
            title: "Emory University",
            dates: "Aug 2017 - May 2022",
            descriptions: [
                "Mathematics/Computer Science Joint Major B.S.",
                "Economics Minor",
                "4yr member of Cross Country Team",
                "4yr member of Track Team"

            ]
        },
        {
            title: "Emory Data Science Club (EDSC)",
            dates: "Spring 2019 - Spring 2022",
            descriptions: [
                "Attended technical workshops in order to learn how companies use data science for different purposes",
                "Collaborated with other peers from EDSC and Goizueta Data Analytics Club to work on career-based projects",
                "Attended networking and workshop events specifically concentrated on data science career development"
            ]
        }
    ]

    return (
        <>
            <div className={styles.header}>
                <h1 className={styles.title}>Experience</h1>
                <a href='/Portfolio/files/Burke, Matthew Resume 2025.pdf' target='_blank' rel='noopener noreferrer' className={styles.resumeBtn}>
                    View Resume
                </a>
            </div>
            <div className={styles.timeline} ref={expRef} id='exp'>
                {experiences.map((experience, index) => (
                    <ExperienceItem 
                        key={index}
                        experience={experience}
                        side={index%2 === 0 ? 'left' : 'right'} 
                    />
                ))}
            </div>
        </>
    );
}

function ExperienceItem({ experience, side }) {
    return (
        <div className={`${styles.container} ${styles[side]}`}>
            <div className={styles.content}>
                <div className={styles.dates}>
                    <h2>{experience.dates}</h2>
                </div>
                <div className={styles.desc}>
                    <h3>{experience.title}</h3>
                    <ul>
                        {experience.descriptions.map((desc, index) => (
                            <li key={index}>{desc}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}