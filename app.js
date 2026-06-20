// app.js

// Дожидаемся полной загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    
    // === АНИМАЦИЯ КАРТОЧЕК ПРИ ЗАГРУЗКЕ ===
    const cards = document.querySelectorAll('.card');
    
    // Показываем карточки с задержкой для эффекта последовательности
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('show');
        }, 200 * (index + 1)); // задержка 200ms между карточками
    });
    
    // === ОБРАБОТЧИКИ ДЛЯ КНОПОК (если есть) ===
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Находим родительскую карточку
            const card = this.closest('.card');
            if (card) {
                // Переключаем класс show при клике
                card.classList.toggle('show');
            }
        });
    });
    
    // === АНИМАЦИЯ ПРИ НАВЕДЕНИИ ===
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // === ПРИМЕР: ДОБАВЛЯЕМ НОВУЮ КАРТОЧКУ ПО КЛИКУ ===
    const addButton = document.getElementById('addCard');
    if (addButton) {
        addButton.addEventListener('click', function() {
            const container = document.querySelector('.cards-container');
            if (container) {
                const newCard = document.createElement('div');
                newCard.className = 'card';
                newCard.innerHTML = `
                    <h3>Новая карточка</h3>
                    <p>Это карточка создана динамически</p>
                    <button>Закрыть</button>
                `;
                container.appendChild(newCard);
                
                // Добавляем анимацию для новой карточки
                setTimeout(() => {
                    newCard.classList.add('show');
                }, 50);
                
                // Добавляем обработчик для новой кнопки
                const newButton = newCard.querySelector('button');
                newButton.addEventListener('click', function() {
                    const parentCard = this.closest('.card');
                    if (parentCard) {
                        parentCard.classList.toggle('show');
                    }
                });
            }
        });
    }
    
    // === СЧЕТЧИК КАРТОЧЕК (пример) ===
    function updateCardCounter() {
        const totalCards = document.querySelectorAll('.card').length;
        const visibleCards = document.querySelectorAll('.card.show').length;
        const counter = document.getElementById('cardCounter');
        if (counter) {
            counter.textContent = `Видимо: ${visibleCards} из ${totalCards}`;
        }
    }
    
    // Обновляем счетчик при изменениях
    // Можно вызывать после добавления/удаления карточек
    updateCardCounter();
    
    // === ПРИМЕР: РАБОТА С LOCALSTORAGE ===
    // Сохраняем состояние карточек
    function saveCardsState() {
        const cardsState = [];
        document.querySelectorAll('.card').forEach(card => {
            cardsState.push({
                hasClass: card.classList.contains('show'),
                html: card.innerHTML
            });
        });
        localStorage.setItem('cardsState', JSON.stringify(cardsState));
    }
    
    // Восстанавливаем состояние при загрузке
    function loadCardsState() {
        const saved = localStorage.getItem('cardsState');
        if (saved) {
            const cardsState = JSON.parse(saved);
            // Восстанавливаем состояние (если нужно)
        }
    }
    
    // === ОБРАБОТЧИК ДЛЯ КНОПКИ "СОХРАНИТЬ" ===
    const saveBtn = document.getElementById('saveState');
    if (saveBtn) {
        saveBtn.addEventListener('click', saveCardsState);
    }
    
    // === ЗАГРУЗКА СОСТОЯНИЯ ПРИ СТАРТЕ ===
    loadCardsState();
    
    console.log('Сайт загружен! Количество карточек:', document.querySelectorAll('.card').length);
});

// === ДОПОЛНИТЕЛЬНЫЕ ФУНКЦИИ ===

// Функция для плавного скролла к элементу
function scrollToElement(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }
}

// Функция для переключения темы (темная/светлая)
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const theme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
}

// Восстанавливаем тему при загрузке
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
});