

// function calcExperienceYears(startDate) {
//     const diff = new Date() - new Date(startDate);
//     const years = Math.ceil(diff / (1000 * 60 * 60 * 24 * 365));
//     return `${years} year${years !== 1 ? 's' : ''}`;
// }
function calcExperienceYears(startDate) {
    const diff = new Date() - new Date(startDate);
    const years = diff / (1000 * 60 * 60 * 24 * 365); // raw float years
    const rounded = Math.round(years * 2) / 2; // round to nearest 0.5
    return `${rounded} year${rounded !== 1 ? 's' : ''}`;
}

export { calcExperienceYears };