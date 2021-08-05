const dateCalcButton = document.querySelector('#dateCalcBtn');
const timerButton = document.querySelector('#timerBtn');
const dateForm = document.querySelector('.dateForm');
dateForm.style.display = 'none';
const timeForm = document.querySelector('.timeForm');
timeForm.style.display = 'none';

const hiddenEl = el => {
    el.style.display = 'none';
};
const showEl = el => {
    el.style.display = 'block';
};

dateCalcButton.addEventListener('click', () => {
    hiddenEl(timeForm);
    showEl(dateForm);
});

timerButton.addEventListener('click', () => {
    hiddenEl(dateForm);
    showEl(timeForm);
});