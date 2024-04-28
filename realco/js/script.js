"use strict"

document.addEventListener("click", documentActions);

function documentActions(e) {
	const targetElement = e.target;

	if (targetElement.closest('.icon-menu')) {
		document.body.classList.toggle('menu-open');
	}

	if (targetElement.closest('.rating__input')) {
		const currentElement = targetElement.closest('.rating__input');
		const rating = currentElement.closest('.rating');
		if (rating.classList.contains('rating--set')) {
			starRatingGet(rating, currentElement);
		}
	}
}

document.addEventListener('DOMContentLoaded', function () {
	const closeBtn = document.querySelector('.announcement__btn');
	const announcement = document.querySelector('.announcement');

	if (closeBtn && announcement) {
		closeBtn.addEventListener('click', function () {
			announcement.style.display = 'none';
		});
	}
});


// Знаходимо всі елементи меню, що мають підменю
const menuItemsWithSubMenu = document.querySelectorAll('.menu__item');
let currentSubMenu = null;

// Проходимо по кожному елементу і додаємо обробник події
menuItemsWithSubMenu.forEach(menuItem => {
	// Знаходимо підменю для кожного елемента меню
	const subMenu = menuItem.querySelector('.sub-menu');

	// Додаємо обробник кліку для елемента меню
	menuItem.addEventListener('click', (event) => {
		// Close the previous sub-menu if exists
		if (currentSubMenu && currentSubMenu !== subMenu) {
			currentSubMenu.classList.remove('show');
		}

		// Toggle the 'show' class to hide or show the sub-menu
		subMenu.classList.toggle('show');

		// Update the currentSubMenu variable
		currentSubMenu = subMenu;
	});
});

// Додаємо обробник кліку для пунктів підменю, щоб вони не закривали підменю
document.querySelectorAll('.sub-menu__item').forEach(item => {
	item.addEventListener('click', (event) => {
		// Stop propagation so that the sub-menu does not close
		event.stopPropagation();
	});
});


document.addEventListener("DOMContentLoaded", function () {
	function moveElements() {
		var screenWidth = window.innerWidth;
		var elementsToMove = document.querySelectorAll("[data-da]");

		elementsToMove.forEach(function (element) {
			var data = element.getAttribute("data-da").split(",");
			if (data.length === 3) {
				var destinationSelector = data[0].trim();
				var order = parseInt(data[1].trim());
				var requiredScreenWidth = parseInt(data[2].trim());
				var destination = document.querySelector(destinationSelector);

				if (!destination) return;

				if (screenWidth <= requiredScreenWidth && !element.classList.contains("moved")) {
					if (order === 1) {
						destination.insertBefore(element, destination.firstChild);
					} else {
						var previousElement = destination.children[order - 2];
						if (previousElement) {
							destination.insertBefore(element, previousElement.nextSibling);
						} else {
							destination.appendChild(element);
						}
					}
					element.classList.add("moved");
				} else if (screenWidth > requiredScreenWidth && element.classList.contains("moved")) {
					var initialParent = document.querySelector(".header__actions.action-header");
					initialParent.appendChild(element);
					element.classList.remove("moved");
				}
			}
		});
	}

	moveElements();

	window.addEventListener("resize", function () {
		moveElements();
	});
});




document.addEventListener("DOMContentLoaded", function () {
	const itemsToShow = 1;
	const itemArea = document.querySelectorAll(".area__item");
	const showMoreBtn = document.querySelector(".show-more");

	let itemsShown = itemsToShow; // Початкова кількість показаних елементів

	function toggleItems() {
		if (window.innerWidth <= 500) {
			itemArea.forEach((item, index) => {
				if (index < itemsShown) {
					item.style.display = "block";
				} else {
					item.style.display = "none";
				}
			});
		} else {
			itemArea.forEach(item => {
				item.style.display = "block";
			});
		}

		// Перевіряємо, чи всі елементи вже видимі, і змінюємо текст кнопки відповідно
		if (itemsShown === itemArea.length) {
			showMoreBtn.textContent = "Show less";
		} else {
			showMoreBtn.textContent = "Show more";
		}
	}

	toggleItems(); // Викликаємо перевірку вікна при завантаженні сторінки

	showMoreBtn.addEventListener("click", function () {
		if (itemsShown === itemArea.length) {
			// Якщо всі елементи вже видимі, ховаємо їх по одному, починаючи з останнього
			itemsShown = itemsToShow;
			toggleItems();
		} else {
			// Якщо ще є елементи, які не відображені, показуємо наступний елемент
			itemsShown++;
			toggleItems();
		}
	});

	window.addEventListener("resize", toggleItems); // Викликаємо перевірку вікна при зміні розміру вікна
});

document.addEventListener("DOMContentLoaded", function () {
	const itemsToShow = 3;
	const itemLocation = document.querySelectorAll(".item-location");
	const showMoreBtn = document.querySelector(".more");

	let itemsShown = itemsToShow; // Початкова кількість показаних елементів

	function toggleItems() {
		if (window.innerWidth <= 500) {
			itemLocation.forEach((item, index) => {
				if (index < itemsShown) {
					item.style.display = "block";
				} else {
					item.style.display = "none";
				}
			});
		} else {
			itemLocation.forEach(item => {
				item.style.display = "block";
			});
		}

		// Перевіряємо, чи всі елементи вже видимі, і змінюємо текст кнопки відповідно
		if (itemsShown === itemLocation.length) {
			showMoreBtn.textContent = "Less";
		} else {
			showMoreBtn.textContent = "More";
		}
	}

	toggleItems(); // Викликаємо перевірку вікна при завантаженні сторінки

	showMoreBtn.addEventListener("click", function () {
		if (itemsShown === itemLocation.length) {
			// Якщо всі елементи вже видимі, ховаємо їх по одному, починаючи з останнього
			itemsShown = itemsToShow;
			toggleItems();
		} else {
			// Якщо ще є елементи, які не відображені, показуємо наступний елемент
			itemsShown++;
			toggleItems();
		}
	});

	window.addEventListener("resize", toggleItems); // Викликаємо перевірку вікна при зміні розміру вікна
});

const reviewsSlider = document.querySelector('.feedback');
if (reviewsSlider) {
	new Swiper('.feedback__swiper', {
		// Optional parameters
		loop: true,
		// autoHeight: true,
		speed: 800,
		spaceBetween: 32,
		slidesPerView: 3,
		// If we need pagination

		// Responsive breakpoints
		breakpoints: {
			320: {
				slidesPerView: 1.2,
				spaceBetween: 15
			},
			680: {
				slidesPerView: 2.2,
				spaceBetween: 15
			},
			991: {
				slidesPerView: 3.2,
				spaceBetween: 23,
			}
		}
	});
}



document.addEventListener('DOMContentLoaded', function () {
	const spoilerTriggers = document.querySelectorAll('.navigation__title');
	const spoilerContents = document.querySelectorAll('.navigation__list');

	if (spoilerTriggers.length && spoilerContents.length && spoilerTriggers.length === spoilerContents.length) {
		spoilerTriggers.forEach(function (spoilerTrigger, index) {
			const spoilerContent = spoilerContents[index];
			spoilerTrigger.addEventListener('click', function () {
				spoilerContent.classList.toggle('show');
			});

			// Перевірка ширини екрану при завантаженні сторінки
			if (window.innerWidth <= 1100) {
				spoilerContent.classList.remove('show');
			} else {
				spoilerContent.classList.add('show');
			}

			// Перевірка ширини екрану при зміні розміру вікна
			window.addEventListener('resize', function () {
				if (window.innerWidth <= 1100) {
					spoilerContent.classList.remove('show');
				} else {
					spoilerContent.classList.add('show');
				}
			});
		});
	}
});



window.addEventListener("load", function () {
	// Перевіряємо, чи існує елемент з класом .loader-wrapper
	const loaderWrapper = document.querySelector(".loader-wrapper");

	// Якщо прелоадер існує, додаємо клас loaded з затримкою після завантаження сторінки
	if (loaderWrapper) {
		// Штучна затримка у 1000 мс (1 с)
		setTimeout(function () {
			// Додайте клас 'loaded' після затримки
			document.body.classList.add("loaded");
		}, 1000);
	}
});

const ratings = document.querySelectorAll('[data-rating]');
if (ratings) {
	ratings.forEach(rating => {
		const currentValue = +rating.dataset.rating;
		currentValue ? starRatingSet(rating, currentValue) : null;
	});
}

function starRatingGet(rating, currentElement) {
	const ratingValue = +currentElement.value;
	// Тут відправка оцінки (ratingValue) на бекенд...
	// Уявімо, що ми отримали середню оцінку 3.2
	const resultRating = 3.2;
	starRatingSet(rating, resultRating);
}
function starRatingSet(rating, value) {
	const ratingItems = rating.querySelectorAll('.rating__item');
	const resultFullItems = parseInt(value);
	const resultPartItem = value - resultFullItems;

	ratingItems.forEach((ratingItem, index) => {
		ratingItem.classList.remove('active');
		ratingItem.querySelector('span') ? ratingItems[index].querySelector('span').remove() : null;

		if (index <= (resultFullItems - 1)) {
			ratingItem.classList.add('active');
		}
		if (index === resultFullItems && resultPartItem) {
			ratingItem.insertAdjacentHTML("beforeend", `<span style="width:${resultPartItem * 100}%"></span>`)
		}
	});
}