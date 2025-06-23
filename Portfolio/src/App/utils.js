

function calcExperienceYears(startDate) {
    const diff = new Date() - new Date(startDate);
    const years = diff / (1000 * 60 * 60 * 24 * 365); // raw float years
    const rounded = Math.round(years * 2) / 2; // round to nearest 0.5
    return `${rounded} year${rounded !== 1 ? 's' : ''}`;
}

function getProjImgs(imgClass) {
    const imageModules = import.meta.glob('../assets/projects/*/*.{png,jpg,jpeg,webp}', { eager: true });

    // Organize into a map: { projectName: [img1, img2, ...] }
    const projectImages = {};
    Object.entries(imageModules).forEach(([path, mod]) => {
        const parts = path.split('/');
        const projectName = parts[parts.length - 2]; // gets 'project1', 'project2'
        
        if (!projectImages[projectName]) {
            projectImages[projectName] = [];
        }
        projectImages[projectName].push({original: mod.default, thumbnail: mod.default, originalClass: `${imgClass}`});
    });
    return projectImages;
}

function getThemeStorage() {
    const theme = localStorage.getItem('mb-portfolio-theme');
    if (!theme) {
        localStorage.setItem('mb-portfolio-theme', 'dark');
        return 'dark';
    }
    return theme;
}

function setTheme(theme) {
    console.log(`Setting theme to: ${theme}`);
    localStorage.setItem('mb-portfolio-theme', theme);
    const root = document.documentElement;
    const computedStyles = getComputedStyle(root);
    const bgColor = computedStyles.getPropertyValue(`--bg-color-${theme}`);
    const textColor = computedStyles.getPropertyValue(`--text-color-${theme}`);
    const appGray = computedStyles.getPropertyValue(`--app-gray-${theme}`);
    const tagBgColor = computedStyles.getPropertyValue(`--tag-background-color-${theme}`);
    const tagTextColor = computedStyles.getPropertyValue(`--tag-text-color-${theme}`);
    const lightBlueColor = computedStyles.getPropertyValue(`--light-blue-color-${theme}`);
    root.style.setProperty('--bg-color', bgColor);
    root.style.setProperty('--text-color', textColor);
    root.style.setProperty('--app-gray', appGray);
    root.style.setProperty('--tag-background-color', tagBgColor);
    root.style.setProperty('--tag-text-color', tagTextColor);
    root.style.setProperty('--light-blue-color', lightBlueColor);
}

export { calcExperienceYears, getProjImgs, getThemeStorage, setTheme };