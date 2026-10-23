"use strict";

const tabsContainer = document.querySelector('#tabs');
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');

const topLeft = document.querySelector('#top-left');
const topRight = document.querySelector('#top-right');
const bottomRight = document.querySelector('#bottom-right');
const bottomLeft = document.querySelector('#bottom-left');

const topLeftValue = document.querySelector('#top-left-value');
const topRightValue = document.querySelector('#top-right-value');
const bottomRightValue = document.querySelector('#bottom-right-value');
const bottomLeftValue = document.querySelector('#bottom-left-value');

const minWidth = document.querySelector('#min-width');
const minWidthValue = document.querySelector('#min-width-value');
const overflow = document.querySelector('#overflow');

const preview = document.querySelector('#preview');
const previewButton = document.querySelector('#preview-button');
const coordinates = document.querySelector('#coordinates');

const cssCode = document.querySelector('#css-code');
const copyButton = document.querySelector('#copy-button');
const copyMessage = document.querySelector('#copy-message');

const presetForm = document.querySelector('#preset-form');
const presetName = document.querySelector('#preset-name');
const presetError = document.querySelector('#preset-error');

const scrollTopButton = document.querySelector('#scroll-top');

// Завдання 1
function hideTabs() {
    tabs.forEach(function (tab) {
        tab.classList.remove('active');
    });

    tabContents.forEach(function (content) {
        content.classList.remove('active');
    });
}

// Завдання 2
function showTab(tabName) {
    const tab = document.querySelector(`[data-tab="${tabName}"]`);
    const content = document.querySelector(`[data-content="${tabName}"]`);

    tab.classList.add('active');
    content.classList.add('active');
}

// Завдання 3
// Завдання 14
tabsContainer.addEventListener('click', function (event) {
    if (!event.target.classList.contains('tab')) {
        return;
    }

    // Завдання 4
    console.log(event.type);
    console.log(event.target);
    console.log(event.currentTarget);

    const tabName = event.target.dataset.tab;

    hideTabs();
    showTab(tabName);
});

// Завдання 8
// Завдання 9
function updateCssCode() {
    const radius = preview.style.borderRadius;

    cssCode.value =
        `border-radius: ${radius};\n` +
        `min-width: ${minWidth.value}px;\n` +
        `overflow: ${overflow.value};`;

    const highlightedCode = document.querySelector('#css-highlight');
    highlightedCode.replaceChildren();

    cssCode.value.split('\n').forEach(function (line, index) {
        const separator = line.indexOf(':');
        const value = document.createElement('span');
        value.className = 'css-value';
        value.textContent = line.slice(separator + 1, -1);

        if (index > 0) {
            highlightedCode.append('\n');
        }

        highlightedCode.append(line.slice(0, separator + 1), value, ';');
    });
}

// Завдання 5
function generateBorderRadius() {
    const topLeftRadius = topLeft.value;
    const topRightRadius = topRight.value;
    const bottomRightRadius = bottomRight.value;
    const bottomLeftRadius = bottomLeft.value;

    const radius = `${topLeftRadius}px ${topRightRadius}px ${bottomRightRadius}px ${bottomLeftRadius}px`;

    preview.style.borderRadius = radius;

    // Завдання 7
    topLeftValue.textContent = `${topLeftRadius} px`;
    topRightValue.textContent = `${topRightRadius} px`;
    bottomRightValue.textContent = `${bottomRightRadius} px`;
    bottomLeftValue.textContent = `${bottomLeftRadius} px`;

    updateCssCode();
}

// Завдання 6
topLeft.addEventListener('input', generateBorderRadius);
topRight.addEventListener('input', generateBorderRadius);
bottomRight.addEventListener('input', generateBorderRadius);
bottomLeft.addEventListener('input', generateBorderRadius);

// Завдання 9
function generateMinWidth() {
    preview.style.minWidth = `${minWidth.value}px`;
    minWidthValue.textContent = `${minWidth.value} px`;

    updateCssCode();
}

minWidth.addEventListener('input', generateMinWidth);

// Завдання 9
function generateOverflow() {
    preview.style.overflow = overflow.value;

    updateCssCode();
}

overflow.addEventListener('change', generateOverflow);

// Завдання 13
function copyCSS() {
    navigator.clipboard.writeText(cssCode.value)
        .then(function () {
            copyMessage.classList.remove('error');
            copyMessage.textContent = 'CSS-код скопійовано';
        })
        .catch(function (error) {
            console.log('Помилка копіювання:', error);
            copyMessage.classList.add('error');
            copyMessage.textContent = 'Не вдалося скопіювати CSS-код';
        });
}

copyButton.addEventListener('click', copyCSS);

// Завдання 10
function validatePresetName() {
    if (presetName.value.trim() === '') {
        presetName.classList.add('error');
        presetError.textContent = 'Введіть назву пресета';
        return false;
    }

    presetName.classList.remove('error');
    presetError.textContent = '';
    return true;
}

presetName.addEventListener('focus', function () {
    presetName.classList.add('focused');
});

presetName.addEventListener('blur', function () {
    presetName.classList.remove('focused');
    validatePresetName();
});

// Завдання 11
function handlePresetSubmit(event) {
    event.preventDefault();

    if (!validatePresetName()) {
        return;
    }

    console.log(`Пресет: ${presetName.value.trim()}`);
    console.log(cssCode.value);
}

presetForm.addEventListener('submit', handlePresetSubmit);

// Завдання 12
function handleKeyDown(event) {
    if (event.key !== 'Escape') {
        return;
    }

    topLeft.value = 0;
    topRight.value = 0;
    bottomRight.value = 0;
    bottomLeft.value = 0;
    minWidth.value = 0;
    overflow.value = 'visible';

    generateBorderRadius();
    generateMinWidth();
    generateOverflow();
}

document.addEventListener('keydown', handleKeyDown);

// Завдання 15
preview.addEventListener('click', function () {
    console.log('Preview click');
});

previewButton.addEventListener('click', function (event) {
    event.stopPropagation();
    console.log('Button click');
});

// Завдання 16
preview.addEventListener('mouseover', function () {
    preview.classList.add('hovered');
});

preview.addEventListener('mouseout', function () {
    preview.classList.remove('hovered');
});

// Завдання 17
preview.addEventListener('mousemove', function (event) {
    coordinates.textContent = `X: ${event.clientX}; Y: ${event.clientY}`;
    console.log(`pageX: ${event.pageX}; pageY: ${event.pageY}`);
});

// Завдання 18
function handleScroll() {
    if (window.scrollY > 300) {
        scrollTopButton.classList.add('visible');
    } else {
        scrollTopButton.classList.remove('visible');
    }
}

window.addEventListener('scroll', handleScroll);

// Завдання 19
scrollTopButton.addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

generateBorderRadius();
generateMinWidth();
generateOverflow();
