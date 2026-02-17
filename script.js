// ===============================
// EMAILJS - CONFIGURACIÓN DIRECTA
// ===============================
(function() {
    emailjs.init("TlQcVJCASzY4OdLnY"); // ✅ TU PUBLIC KEY
})();

// ===============================
// ESPERAR A QUE EL DOM CARGUE
// ===============================
document.addEventListener('DOMContentLoaded', function() {
    initParticles();
    initNavbar();
    initTerminalAnimations();
    setupProgressBar();
    updateFooterYear();
    typeWriterEffect();
    initProjectFilters();
    initSkillBars();
    initSmoothScroll();
    initContactForm(); // ✅ FORMULARIO FUNCIONAL
    initScrollAnimations();
});

// ===============================
// FORMULARIO DE CONTACTO - ¡YA FUNCIONA!
// ===============================
function initContactForm() {
    const form = document.getElementById('contact-form');
    
    if (!form) {
        console.log("❌ Formulario no encontrado");
        return;
    }
    
    console.log("✅ Formulario encontrado, configurando EmailJS...");
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        const originalBg = submitBtn.style.background;
        
        // Validar campos
        const name = form.querySelector('[name="name"]')?.value.trim();
        const email = form.querySelector('[name="email"]')?.value.trim();
        const message = form.querySelector('[name="message"]')?.value.trim();
        
        if (!name || !email || !message) {
            alert('Por favor, completa todos los campos');
            return;
        }
        
        // Mostrar carga
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;
        console.log("📤 Enviando mensaje...");
        
        // ✅ TUS DATOS DE EMAILJS
        const serviceID = 'service_qn7fozh';     // ✅ TU SERVICE ID
        const templateID = 'template_hr3gb07';    // ✅ TU TEMPLATE ID
        
        // Parámetros que se enviarán a tu template
        const templateParams = {
            from_name: name,
            from_email: email,
            message: message,
            to_name: 'Andrés', // Tu nombre
            reply_to: email
        };
        
        // Enviar el email
        emailjs.send(serviceID, templateID, templateParams)
            .then(function(response) {
                console.log('✅ Éxito:', response);
                
                // Éxito - cambiar botón a verde
                submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> ¡Mensaje enviado!';
                submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                
                // Limpiar formulario
                form.reset();
                
                // Restaurar botón después de 3 segundos
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = originalBg;
                    submitBtn.disabled = false;
                }, 3000);
            })
            .catch(function(error) {
                console.log('❌ Error:', error);
                
                // Error - cambiar botón a rojo
                submitBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error al enviar';
                submitBtn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
                
                // Mostrar error específico
                let errorMsg = 'Error al enviar el mensaje. ';
                if (error.text) {
                    errorMsg += error.text;
                } else {
                    errorMsg += 'Intenta de nuevo o contacta por correo directo.';
                }
                alert(errorMsg);
                
                // Restaurar botón después de 3 segundos
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = originalBg;
                    submitBtn.disabled = false;
                }, 3000);
            });
    });
    
    console.log("🎯 Formulario listo para enviar mensajes");
}

// ===============================
// PARTÍCULAS DINÁMICAS
// ===============================
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    
    const PARTICLE_COUNT = 60;
    const CONNECTION_DISTANCE = 150;
    
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.2;
            this.vy = (Math.random() - 0.5) * 0.2;
            this.radius = Math.random() * 2 + 1;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(100, 255, 218, 0.3)';
            ctx.fill();
        }
    }
    
    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        
        particles = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push(new Particle());
        }
    }
    
    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < CONNECTION_DISTANCE) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(100, 255, 218, ${0.1 * (1 - distance / CONNECTION_DISTANCE)})`;
                    ctx.stroke();
                }
            }
        }
    }
    
    function animate() {
        if (!ctx) return;
        
        ctx.clearRect(0, 0, width, height);
        
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        
        drawConnections();
        requestAnimationFrame(animate);
    }
    
    window.addEventListener('resize', resize);
    resize();
    animate();
}

// ===============================
// NAVBAR
// ===============================
function initNavbar() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 25, 47, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'rgba(10, 25, 47, 0.85)';
        }
    });
}

// ===============================
// ANIMACIONES TERMINAL
// ===============================
function initTerminalAnimations() {
    const elements = document.querySelectorAll('.glass-card, header, footer');
    
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.8s cubic-bezier(0.645, 0.045, 0.355, 1) ${index * 0.15}s, transform 0.8s cubic-bezier(0.645, 0.045, 0.355, 1) ${index * 0.15}s`;
    });
    
    setTimeout(() => {
        elements.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    }, 200);
}

// ===============================
// BARRA DE PROGRESO
// ===============================
function setupProgressBar() {
    const coursesCompleted = 29;
    const totalCourses = 45;
    const percentage = (coursesCompleted / totalCourses) * 100;
    const roundedPercentage = percentage.toFixed(1);
    
    const progressFill = document.getElementById('progress-fill');
    const progressPercentage = document.getElementById('progress-percentage');
    
    if (!progressFill || !progressPercentage) return;
    
    let currentPercent = 0;
    const duration = 2000;
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
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    requestAnimationFrame(animateProgress);
                }, 500);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    const progressContainer = document.querySelector('.premium-progress');
    if (progressContainer) {
        observer.observe(progressContainer);
    }
}

// ===============================
// ACTUALIZAR AÑO
// ===============================
function updateFooterYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// ===============================
// EFECTO MÁQUINA DE ESCRIBIR
// ===============================
function typeWriterEffect() {
    const title = document.querySelector('h1');
    if (!title) return;
    
    const originalHTML = title.innerHTML;
    const textContent = title.textContent;
    
    if (originalHTML.includes('<span')) return;
    
    title.innerHTML = '';
    
    let i = 0;
    const speed = 80;
    
    function type() {
        if (i < textContent.length) {
            title.innerHTML += textContent.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            setTimeout(() => {
                title.innerHTML = originalHTML;
            }, 500);
        }
    }
    
    setTimeout(type, 1000);
}

// ===============================
// FILTROS DE PROYECTOS
// ===============================
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (!filterBtns.length || !projectCards.length) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            
            projectCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ===============================
// BARRAS DE HABILIDADES
// ===============================
function initSkillBars() {
    const skillLevels = document.querySelectorAll('.skill-level');
    if (!skillLevels.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0';
                
                setTimeout(() => {
                    bar.style.width = width;
                }, 200);
                
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });
    
    skillLevels.forEach(bar => observer.observe(bar));
}

// ===============================
// SCROLL SUAVE
// ===============================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===============================
// ANIMACIONES SCROLL
// ===============================
function initScrollAnimations() {
    const elements = document.querySelectorAll('.glass-card, .project-card, .cert-card, .skill-category');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

const toggleBtn = document.getElementById("toggleCerts");
const hiddenCerts = document.getElementById("hiddenCerts");

toggleBtn.addEventListener("click", () => {
    if (hiddenCerts.style.display === "grid") {
        hiddenCerts.style.display = "none";
        toggleBtn.textContent = "Ver más certificaciones";
    } else {
        hiddenCerts.style.display = "grid";
        toggleBtn.textContent = "Ver menos";
    }
});
