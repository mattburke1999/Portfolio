export type Experience = {
    title: string;
    dates: string;
    descriptions: string[];
}

export const experiences: Experience[] = [
    {
        title: "Software Engineer - Shift4",
        dates: "Nov 2022 - Present",
        descriptions: [
            "Developed backend features using C# ASP.NET Core MVC and APIs supporting internal tools and client applications",
            "Built and optimized SQL Server stored procedures processing high-volume transactional data for reporting workflows",
            "Improved report performance by reducing execution times from minutes to sub ninety seconds through query tuning",
            "Debugged production issues across C# and SQL layers resolving data inconsistencies and improving system reliability",
            "Designed and integrated REST API routes and third-party services supporting data transformations and batch processing",
            "Built and maintained data pipelines transferring data between MySQL and SQL Server supporting reporting workflows",
            "Collaborated with QA and stakeholders to test features, validate outputs, and ensure accurate data delivery",
            "Assisted with Azure DevOps pipelines and deployments supporting CI/CD workflows and automated build processes",
            "Acted as go-to developer for reporting systems resolving complex data issues and supporting production operation"
        ]
    },
    {
        title: "Data Analyst Intern - Shift4",
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