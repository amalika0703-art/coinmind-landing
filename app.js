// app.js - CoinMind Landing

// Дожидаемся полной загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    console.log('🌱 CoinMind сайт загружен!');
    
    // === АНИМАЦИЯ КАРТОЧЕК ПРИ ЗАГРУЗКЕ ===
    const cards = document.querySelectorAll('.card');
    
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('show');
            console.log(`Карточка ${index + 1} показана`);
        }, 200 * (index + 1));
    });
    
    // === АНИМАЦИЯ ПРИ СКРОЛЛЕ (для карточек, которые появляются позже) ===
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, observerOptions);
    
    // Наблюдаем за всеми карточками (включая новые)
    document.querySelectorAll('.card').forEach(card => {
        observer.observe(card);
    });
    
    // === ЭФФЕКТ ПРИ НАВЕДЕНИИ НА КАРТОЧКИ ===
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 12px 40px rgba(79, 70, 229, 0.15)';
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
    
    // === АНИМАЦИЯ СТАТИСТИКИ В HERO ===
    function animateStats() {
        const statValues = document.querySelectorAll('.stat h3');
        
        statValues.forEach(stat => {
            const text = stat.textContent;
            
            // Для чисел с процентами
            if (text.includes('%') && text !== '100%') {
                const target = parseInt(text);
                let current = 0;
                const steps = 30;
                const increment = Math.ceil(target / steps);
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    stat.textContent = current + '%';
                }, 40);
            }
        });
    }
    
    // Запускаем анимацию статистики с задержкой
    setTimeout(animateStats, 600);
    
    // === НАВИГАЦИЯ: ПОДСВЕТКА АКТИВНОЙ ССЫЛКИ ===
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
    
    // === ПАРАЛЛАКС ЭФФЕКТ ДЛЯ HERO ===
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            hero.style.backgroundPositionY = scrolled * 0.3 + 'px';
        });
    }
    
    // === ОБРАБОТЧИК ДЛЯ КНОПКИ "ПЕРЕЙТИ В TELEGRAM" (на всех страницах) ===
    const telegramBtns = document.querySelectorAll('.telegram-btn, .nav-btn, .primary-btn, .buy-btn');
    telegramBtns.forEach(btn => {
        // Не переопределяем если уже есть onclick
        if (!btn.hasAttribute('onclick')) {
            btn.addEventListener('click', function(e) {
                // Если кнопка не ведет на payment.html
                if (!this.closest('.premium-card') && !this.closest('.hero-buttons')) {
                    window.open('https://t.me/YOUR_BOT_USERNAME', '_blank');
                }
            });
        }
    });
    
    // === ПРОВЕРКА: КАКИЕ СТРАНИЦЫ ЗАГРУЖЕНЫ ===
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    console.log('📄 Текущая страница:', currentPage);
    
    // Если страница оплаты или успеха/отмены
    if (currentPage === 'payment.html' || currentPage === 'success.html' || currentPage === 'cancel.html') {
        console.log('💳 Страница оплаты загружена');
    }
    
    // === ОБРАБОТКА ПАРАМЕТРОВ URL (для страниц оплаты) ===
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    const orderId = urlParams.get('order_id');
    
    if (status || orderId) {
        console.log('📦 Параметры заказа:', { status, orderId });
        
        // Если статус успешный
        if (status === 'success') {
            console.log('✅ Оплата успешна!');
        }
        // Если статус отменен
        else if (status === 'cancel') {
            console.log('❌ Оплата отменена');
        }
    }
    
    // === КОНСОЛЬНЫЙ БАННЕР ===
    console.log('%c🌱 CoinMind Premium', 'font-size: 20px; font-weight: bold; color: #4F46E5;');
    console.log('%cУмный финансовый помощник для студентов', 'font-size: 14px; color: #6B7280;');
    console.log('%cВерсия 1.0.0 | 2024', 'font-size: 12px; color: #9CA3AF;');
    
    console.log('✅ Все элементы загружены:');
    console.log('  - Навигация:', document.querySelector('.navbar') ? '✅' : '❌');
    console.log('  - Hero секция:', document.querySelector('.hero') ? '✅' : '❌');
    console.log('  - Карточки:', document.querySelectorAll('.card').length);
    console.log('  - Premium секция:', document.querySelector('.premium') ? '✅' : '❌');
});

// === ГЛОБАЛЬНЫЕ ФУНКЦИИ (доступны из HTML) ===

// Переход на страницу оплаты
function goToPayment() {
    window.location.href = 'payment.html';
}

// Переход на главную
function goHome() {
    window.location.href = 'index.html';
}

// Открыть Telegram
function openTelegram() {
    window.open('https://t.me/Smart_budgetttttt_bot', '_blank');
}

// Плавный скролл к секции
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Обработка успешной оплаты (можно вызвать после оплаты)
function paymentSuccess(orderId) {
    console.log('✅ Оплата успешна! Заказ:', orderId);
    // Здесь можно отправить данные на сервер или в Telegram бот
    window.location.href = 'success.html?status=success&order_id=' + orderId;
}

// Обработка отмены оплаты
function paymentCancel(orderId) {
    console.log('❌ Оплата отменена. Заказ:', orderId);
    window.location.href = 'cancel.html?status=cancel&order_id=' + orderId;
}

// === ЗАЩИТА ОТ СЛУЧАЙНОГО ПОКИДАНИЯ СТРАНИЦЫ (для payment.html) ===
if (window.location.pathname.includes('payment.html')) {
    window.addEventListener('beforeunload', function(e) {
        // Показываем предупреждение только если оплата не завершена
        e.preventDefault();
        e.returnValue = 'Вы уверены, что хотите покинуть страницу оплаты?';
    });
}

// === ОБРАБОТКА ОШИБОК ===
window.addEventListener('error', function(e) {
    console.error('⚠️ Произошла ошибка:', e.message);
});

// === ПРОВЕРКА ПОДДЕРЖКИ БРАУЗЕРОМ ===
if (!('IntersectionObserver' in window)) {
    console.warn('⚠️ Ваш браузер не поддерживает IntersectionObserver');
    // Fallback: показываем все карточки сразу
    document.querySelectorAll('.card').forEach(card => {
        card.classList.add('show');
    });
}

console.log('🚀 CoinMind BOT запущено!');