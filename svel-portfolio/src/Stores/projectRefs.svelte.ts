
export type ProjectType = 'todo' | 'hitZone' | 'garminMock' | 'passwordManager' | 'codeCracker' | 'calculator';

class ProjectsRefs {
    projects = $state<Record<ProjectType, HTMLDivElement | null>>({
        todo: null,
        hitZone: null,
        garminMock: null,
        passwordManager: null,
        codeCracker: null,
        calculator: null
    });
}

export const projectsRefs = new ProjectsRefs();