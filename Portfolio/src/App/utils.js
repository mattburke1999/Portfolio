

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

export { calcExperienceYears, getProjImgs };