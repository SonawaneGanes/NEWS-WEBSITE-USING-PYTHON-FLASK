document.addEventListener('DOMContentLoaded', () => {
    const geniusText = document.querySelector('.Genius');
    if (geniusText) {
        geniusText.addEventListener('click', () => {
            window.location.href = '/news';
        });
    }
});
