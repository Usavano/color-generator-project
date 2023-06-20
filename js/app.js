// set items
const cols = document.querySelectorAll('.col');
const btns = document.querySelectorAll('.col__btn_lock');
const colorNames = document.querySelectorAll('.col__name-color');
document.querySelector('.col__alert');

/**LISTENERS */
document.addEventListener('DOMContentLoaded' , () => {
    setRandomColors(true);  
});
window.addEventListener('keydown', (e) => {
    e.preventDefault();
    if (e.key === ' ') {
        setRandomColors();
    }
});
 
btns.forEach (btn => {
    btn.addEventListener('click', () => {
        const i = btn.firstElementChild;
        btn.parentElement.dataset.state = 
        btn.parentElement.dataset.state === 'lock' ?
        'open' :
        'lock';
        i.classList.toggle('fa-lock-open');
        i.classList.toggle('fa-lock');
    })
});

colorNames.forEach (item => {
    item.addEventListener('click', () => {
        const itemText = item.textContent;
        const prevEl = item.previousElementSibling;
        showAlert(prevEl);
        copyToClipBoard(itemText);
    });
});

/**FUNCTIONS */
// function generateRandomColor () {
//     const color = `#${Math.floor(Math.random() * 16777216).toString(16).padEnd(6,0)}`;
//     return color;
// }

function setTextColor (text, color) {
    const luminance = chroma(color).luminance();
    text.style.color = luminance > 0.5 ? '#000' : '#fff';
}

function setRandomColors(isInitial) {
    const colors = isInitial ? getColorsFromHash() : [];
    cols.forEach((col,index) => {
        // set items
        // name
        const text = col.querySelector('.col__name-color');
        // lock btn
        const button = col.querySelector('.col__btn_lock');
        // random color
        const color = isInitial ? colors[index] : chroma.random();
        
        if (col.dataset.state === 'open') {
        text.textContent = color;
        // setting color depend on bg color of text
        setTextColor(text, color);
        // setting color depend on bg color of lock btn
        setTextColor(button, color);

        // setting a bg color of each column
        col.style.backgroundColor = `${color}`

        if (!isInitial) {
        colors.push(color);
        }
           
        } else  {
            colors.push(text.textContent);
        }
    });
    updateColorsHash(colors);
}; 

function copyToClipBoard (text) {
    return navigator.clipboard.writeText(text);
}

function updateColorsHash(colors = []) {
    document.location.hash = colors.map(el => el.toString().substring(1)).join('-');
} 

function getColorsFromHash() {
    if (document.location.hash.length > 1) {
        return document.location.hash
        .substring(1)
        .split('-')
        .map((color) => '#' + color);
    }
    return []
}
function showAlert(el) {
    el.classList.add('show');
    setTimeout(() => {
        el.classList.remove('show');
    }, 400);
}


