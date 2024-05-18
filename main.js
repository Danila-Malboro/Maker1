document.addEventListener('DOMContentLoaded', function() {
    // Обработчик событий для кнопки добавления
    document.querySelector('.btn[name="addBtn"]').addEventListener('click', function(event) {
      event.preventDefault(); // Предотвращаем перезагрузку страницы
  
      const nameInput = document.querySelector('input[name="name"]');
      const priceInput = document.querySelector('input[name="price"]');
      const categorySelect = document.getElementById('selectCategory');
  
      // Добавляем товар в таблицу
      addExpense(nameInput.value, categorySelect.options[categorySelect.selectedIndex].text, priceInput.value);
  
      // Очищаем поля формы
      nameInput.value = '';
      priceInput.value = '';
      updateChartData();
    });
  });
  
  // Функция для добавления товара в таблицу
  function addExpense(name, category, price) {
    const tbody = document.getElementById('tbody');
    const row = document.createElement('tr');
    row.classList.add('purcashes__item', 'purcashes__row');
    row.setAttribute('data-category', category.toLowerCase());
    row.innerHTML = `
      <td class="purcashes__td">${name}</td>
      <td class="purcashes__td">${category}</td>
      <td class="purcashes__td">${price}</td>
      <td class="purcashes__td"><i class="purcashes__item-del fa-solid fa-xmark" onclick="deleteExpense(this)"></i></td>`;
    tbody.appendChild(row);
    updateChartData();
  }
  
  // Функция для удаления товара из таблицы
  function deleteExpense(element) {
    element.closest('.purcashes__item').remove();
  }
  
// Функция для извлечения цен из таблицы
function getPricesFromTable() {
    const prices = {};
    const priceRows = document.querySelectorAll('.price-row'); // Предполагаем, что у вас есть строки с классом .price-row
    
    priceRows.forEach(row => {
      const productName = row.querySelector('.product-name').textContent;
      const productPrice = parseFloat(row.querySelector('.product-price').textContent);
      prices[productName] = productPrice;
    });
    
    return prices;
  }
  
  // Функция для расчета стоимости товара
  function calculatePrice(prices, productName, quantity) {
    return prices[productName] * quantity;
  }
  
  // Функция для обновления стоимости на странице
  function updatePrice() {
    const prices = getPricesFromTable(); // Получаем цены из таблицы
    
    // Получаем все строки с продуктами
    const productRows = document.querySelectorAll('.product-row');
    
    productRows.forEach(row => {
      // Извлекаем название и количество из строки
      const productName = row.querySelector('.product-name').textContent;
      const quantity = parseInt(row.querySelector('.product-quantity').value, 10);
      
      // Рассчитываем стоимость и обновляем на странице
      const cost = calculatePrice(prices, productName, quantity);
      row.querySelector('.product-cost').textContent = cost.toFixed(2); // Форматируем стоимость до двух знаков после запятой
    });
  }
  
  // Добавьте эту функцию в обработчик событий, который срабатывает при изменении количества товаров
  
  