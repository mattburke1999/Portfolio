
export type Page = 'home' | 'aboutMe' | 'stack' | 'experience' | 'projects';

class PageRefs {
    private currentSection = $state<Page>('home');
    pages = $state<Record<Page, HTMLDivElement | null>>({
        home: null,
        aboutMe: null,
        stack: null,
        experience: null,
        projects: null
    });
    homePage = $state<HTMLDivElement | null>(null);
    aboutMePage = $state<HTMLDivElement | null>(null);
    stackPage = $state<HTMLDivElement | null>(null);
    expPage = $state<HTMLDivElement | null>(null);
    projPage = $state<HTMLDivElement | null>(null);

    get current() {
        return this.currentSection;
    }
    observers: IntersectionObserver[] = [];

    cleanup() {
        this.observers.forEach(observer => observer.disconnect());
        this.observers = [];
    }

    setUpIntersectionObserver(pageName: Page, ref: HTMLDivElement | null, threshold: number) {
        if (ref) {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        this.currentSection = pageName;
                    }
                },
                { threshold }
            );
            observer.observe(ref);
            this.observers.push(observer);
        }
    }

    init() {
        this.cleanup();
        console.log('Initializing page refs with:', pageRefs);
        
        Object.keys(this.pages).forEach((page) => {
            const pageKey = page as Page;
            this.setUpIntersectionObserver(pageKey, this.pages[pageKey], pageKey === 'projects' ? 0.2 : 0.4);
        });
    }
}

export const pageRefs = new PageRefs();