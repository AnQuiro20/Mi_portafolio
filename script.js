document.addEventListener('DOMContentLoaded', function () {
    // Animaciones tipo terminal
    initTerminalAnimations();

    // Configurar barra de progreso con efecto de carga
    setupProgressBar();

    // Actualizar año del footer
    updateFooterYear();

    // Efecto de escritura para el título
    typeWriterEffect();
});

function initTerminalAnimations() {
    const elements = document.querySelectorAll('section, header, footer');

    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.6s cubic-bezier(0.645, 0.045, 0.355, 1) ${index * 0.1}s, 
                             transform 0.6s cubic-bezier(0.645, 0.045, 0.355, 1) ${index * 0.1}s`;
    });

    setTimeout(() => {
        elements.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    }, 100);
}

function setupProgressBar() {
    const coursesCompleted = 21;
    const totalCourses = 45;
    const percentage = (coursesCompleted / totalCourses) * 100;
    const roundedPercentage = percentage.toFixed(1);

    const progressFill = document.getElementById('progress-fill');
    const progressPercentage = document.getElementById('progress-percentage');

    let currentPercent = 0;
    const duration = 1800; // 1.8 segundos
    const startTime = Date.now();

    const animateProgress = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        currentPercent = percentage * progress;
        progressFill.style.width = `${currentPercent}%`;
        progressPercentage.textContent = `${Math.round(currentPercent)}%`;

        if (progress < 1) {
            requestAnimationFrame(animateProgress);
        } else {
            progressPercentage.textContent = `${roundedPercentage}%`;
        }
    };

    setTimeout(() => {
        requestAnimationFrame(animateProgress);
    }, 800);
}

function updateFooterYear() {
    document.getElementById('current-year').textContent = new Date().getFullYear();
}

function typeWriterEffect() {
    const title = document.querySelector('h1');
    if (!title) return;

    const text = title.textContent;
    title.textContent = '';

    let i = 0;
    const speed = 100; // Velocidad en ms

    function type() {
        if (i < text.length) {
            title.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    setTimeout(type, 1000);
}