

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
    const yellowColor = computedStyles.getPropertyValue(`--yellow-color-${theme}`);
    root.style.setProperty('--bg-color', bgColor);
    root.style.setProperty('--text-color', textColor);
    root.style.setProperty('--app-gray', appGray);
    root.style.setProperty('--tag-background-color', tagBgColor);
    root.style.setProperty('--tag-text-color', tagTextColor);
    root.style.setProperty('--light-blue-color', lightBlueColor);
    root.style.setProperty('--yellow-color', yellowColor);
}

const speed = .5;
function moveItem(item, containerRef) {
    const containerRect = containerRef.current.getBoundingClientRect();
    const itemComputed = window.getComputedStyle(item);
    const itemWidth = parseFloat(itemComputed.width);
    const itemHeight = parseFloat(itemComputed.height);
    const itemRect = item.getBoundingClientRect();

    let currentX = parseFloat(item.dataset.x || 0);
    let currentY = parseFloat(item.dataset.y || 0);
    // Determine which edge the item is touching (allow 1px wiggle room)
    const touchingTop = Math.abs(itemRect.top - containerRect.top) < 1;
    const touchingRight = Math.abs((itemRect.left + itemWidth) - containerRect.right) < 1;
    const touchingBottom = Math.abs((itemRect.top + itemHeight) - containerRect.bottom) < 1;
    const touchingLeft = Math.abs(itemRect.left - containerRect.left) < 1;
    // debugger;
    if (touchingTop && !touchingRight) {
        currentX += speed; // Move right
    } else if (touchingRight && !touchingBottom) {
        currentY += speed; // Move down
    } else if (touchingBottom && !touchingLeft) {
        currentX -= speed; // Move left
    } else if (touchingLeft) {
        currentY -= speed; // Move up
    }
        
    item.style.transform = `translate(${currentX}px, ${currentY}px)`;

    item.dataset.x = currentX;
    item.dataset.y = currentY;
}

const isChildOfModal = (targetElement, modalClass) => {
    // check if any class in targetElement's classList matches any class in stackClasses
    if (targetElement.classList.contains(modalClass)) {
        return true;
    } else if (targetElement.parentElement) {
        return isChildOfModal(targetElement.parentElement, modalClass);
    }
    return false;
}

export { calcExperienceYears, getProjImgs, getThemeStorage, setTheme, moveItem, isChildOfModal };