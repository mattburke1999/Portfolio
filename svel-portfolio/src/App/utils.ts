
export function calcExperienceYears(startDate: string): string {
    const diff = new Date().getTime() - new Date(startDate).getTime();
    const years = diff / (1000 * 60 * 60 * 24 * 365); // raw float years
    const rounded = Math.round(years * 2) / 2; // round to nearest 0.5
    return `${rounded} year${rounded !== 1 ? 's' : ''}`;
}

export function getThemeStorage(): string {
    const theme = localStorage.getItem('mb-portfolio-theme');
    if (!theme) {
        localStorage.setItem('mb-portfolio-theme', 'dark');
        return 'dark';
    }
    return theme;
}

export function setTheme(theme: 'dark' | 'light'): void {
    console.log(`Setting theme to: ${theme}`);
    localStorage.setItem('mb-portfolio-theme', theme);
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
}


export const isMobile = window.innerWidth <= 768;