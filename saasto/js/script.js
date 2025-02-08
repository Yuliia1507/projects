"use strict"

document.addEventListener("click", documentActions);

function documentActions(e) {
	const targetElement = e.target;

	if (targetElement.closest('.icon-menu')) {
		document.body.classList.toggle('menu-open');
	}

	// Перевірка на клік по посиланню всередині меню
	if (targetElement.closest('.menu') && targetElement.tagName === 'A') {
		document.body.classList.remove('menu-open');
	}
}

const icons = document.querySelectorAll('.icon-menu');
icons.forEach(icon => {
	icon.addEventListener('click', (event) => {
		icon.classList.toggle("active");
	});
});

// let arrow = document.getElementById("line");

// console.log(arrow.getTotalLength());

window.addEventListener('scroll', () => {
	const header = document.querySelector('header');
	if (window.scrollY > 50) { // Кількість пікселів, після яких змінюється фон
		header.classList.add('scrolled');
	} else {
		header.classList.remove('scrolled');
	}
});
//========================================

document.addEventListener("DOMContentLoaded", function () {
	function moveElements() {
		const screenWidth = window.innerWidth;
		const elementsToMove = document.querySelectorAll("[data-da]");

		elementsToMove.forEach(function (element) {
			const data = element.getAttribute("data-da").split(",");
			if (data.length === 3) {
				const destinationSelector = data[0].trim();
				const order = parseInt(data[1].trim());
				const requiredScreenWidth = parseInt(data[2].trim());

				const destination = document.querySelector(destinationSelector);
				if (!destination) return;

				// Збереження початкового контейнера
				if (!element.dataset.originalParent) {
					const parent = element.parentNode;
					const index = Array.from(parent.children).indexOf(element);
					element.dataset.originalParent = parent.tagName.toLowerCase() + (parent.id ? `#${parent.id}` : '') + (parent.className ? `.${parent.className.replace(/\s+/g, '.')}` : '');
					element.dataset.originalIndex = index;
				}

				if (screenWidth <= requiredScreenWidth && !element.classList.contains("moved")) {
					// Переміщення в нове місце
					if (order === 1) {
						destination.insertBefore(element, destination.firstChild);
					} else {
						const previousElement = destination.children[order - 2];
						if (previousElement) {
							destination.insertBefore(element, previousElement.nextSibling);
						} else {
							destination.appendChild(element);
						}
					}
					element.classList.add("moved");
				} else if (screenWidth > requiredScreenWidth && element.classList.contains("moved")) {
					// Повернення на початкове місце
					const originalParentSelector = element.dataset.originalParent;
					const originalIndex = parseInt(element.dataset.originalIndex, 10);
					const originalParent = document.querySelector(originalParentSelector);

					if (originalParent) {
						const children = Array.from(originalParent.children);
						if (originalIndex < children.length) {
							originalParent.insertBefore(element, children[originalIndex]);
						} else {
							originalParent.appendChild(element);
						}
						element.classList.remove("moved");
					}
				}
			}
		});
	}

	moveElements();

	window.addEventListener("resize", function () {
		moveElements();
	});
});
//========================================
function animateCounter(element, start, end, duration, isFirst) {
	let startTime = null;
	const step = (timestamp) => {
		if (!startTime) startTime = timestamp;
		const progress = Math.min((timestamp - startTime) / duration, 1);
		const value = Math.floor(progress * (end - start) + start);
		let displayValue;

		// Додаємо плюс тільки для першого лічильника
		if (value >= 1000000) {
			displayValue = Math.floor(value / 1000000) + 'M' + (isFirst ? '+' : '');
		} else if (value >= 1000) {
			displayValue = Math.floor(value / 1000) + 'k' + (isFirst ? '+' : '');
		} else {
			displayValue = value + (isFirst ? '+' : '');
		}
		element.textContent = displayValue;

		if (progress < 1) {
			window.requestAnimationFrame(step);
		} else {
			// Після завершення анімації додаємо плюс тільки для першого елемента
			if (end >= 1000000) {
				element.textContent = Math.floor(end / 1000000) + 'M' + (isFirst ? '+' : '');
			} else if (end >= 1000) {
				element.textContent = Math.floor(end / 1000) + 'k' + (isFirst ? '+' : '');
			} else {
				element.textContent = end + (isFirst ? '+' : '');
			}
		}
	};
	window.requestAnimationFrame(step);
}

document.addEventListener('DOMContentLoaded', () => {
	const counters = document.querySelectorAll('.item-counter__number');

	if (counters.length === 0) return; // Перевірка на наявність елементів

	// Використовуємо Intersection Observer для перевірки видимості елементів
	const observer = new IntersectionObserver((entries, observerInstance) => {
		entries.forEach((entry, index) => {
			if (entry.isIntersecting) {
				const counter = entry.target;
				const start = parseInt(counter.getAttribute('data-start'), 10);
				const end = parseInt(counter.getAttribute('data-end'), 10);
				const isFirst = index === 0; // Перевірка, чи це перший лічильник
				animateCounter(counter, start, end, 2000, isFirst);
				observerInstance.unobserve(counter); // Перестаємо спостерігати за елементом після анімації
			}
		});
	}, { threshold: 0.5 }); // 50% елемента має бути в полі зору

	counters.forEach(counter => observer.observe(counter)); // Починаємо спостерігати за всіма лічильниками
});

//========================================

document.querySelector('.toggle__switch').addEventListener('click', function () {
	this.classList.toggle('active');
});

//========================================

document.addEventListener("DOMContentLoaded", function () {
	const clientsSwiper = new Swiper('.clients__swiper', {
		loop: true, // Циклічний свайпер
		slidesPerView: 1, // Завжди один слайд
		spaceBetween: 30, // Відстань між слайдами
		pagination: {
			el: '.swiper-pagination', // Елемент для пагінації
			clickable: true, // Дозволяє клікати на точки пагінації
		},
		autoplay: {
			delay: 5000, // Автоматична зміна слайдів (5 секунд)
			disableOnInteraction: false, // Не зупиняти autoplay після взаємодії
		},
		on: {
			init: function (swiper) {
				// Оновлюємо зображення під час ініціалізації
				updateImage(swiper.slides[swiper.activeIndex]);
			},
			slideChange: function (swiper) {
				// Оновлюємо зображення під час зміни слайдів
				updateImage(swiper.slides[swiper.activeIndex]);
			}
		}
	});

	// Функція для оновлення картинки
	function updateImage(activeSlide) {
		if (activeSlide) {
			// Отримуємо data-image з активного слайда
			const newImage = activeSlide.dataset.image;
			if (newImage) {
				// Знаходимо елемент .clients__image img
				const imageElement = document.querySelector('.clients__image img');
				if (imageElement) {
					// Змінюємо src у зображенні
					imageElement.src = newImage;
				}
			}
		}
	}
});
//================================
document.addEventListener("DOMContentLoaded", () => {
	const titles = document.querySelectorAll(".title");

	if (titles.length === 0) return; // Перевірка, чи є заголовки на сторінці

	const observer = new IntersectionObserver(
		(entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("visible");
					observer.unobserve(entry.target); // Відключаємо спостереження для цього елемента
				}
			});
		},
		{ threshold: 0.5 } // Заголовок має бути наполовину в полі зору
	);

	titles.forEach((title) => observer.observe(title));
});

//===============================
document.addEventListener("DOMContentLoaded", () => {
	const items = document.querySelectorAll(".features__item");

	if (!items.length) return; // Перевіряємо, чи є елементи

	const observer = new IntersectionObserver(
		(entries, observer) => {
			entries.forEach((entry, index) => {
				if (entry.isIntersecting) {
					entry.target.style.animationDelay = `${index * 0.3}s`;
					entry.target.classList.add("visible");
					observer.unobserve(entry.target); // Щоб анімація спрацьовувала лише раз
				}
			});
		},
		{ threshold: 0.2 }
	);

	items.forEach((item) => observer.observe(item));
});

const observeElements = (selectors, options = { threshold: 0.3, unobserve: true }) => {
	const elements = document.querySelectorAll(selectors);

	if (!elements.length) return;

	const observer = new IntersectionObserver((entries, observer) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('visible');
				if (options.unobserve) observer.unobserve(entry.target);
			}
		});
	}, options);

	elements.forEach(el => observer.observe(el));
};

// Виклик функції з потрібними селекторами
observeElements('.text, .analytics__item, .analytics__image, .tracker__item, .tracker__image, .partners__image, .offer__left-img, .offer__right-img, .offer__image, .offer__link, .item-price, .animated-svg, .arrow-line, .arrow-head, .price__left-img');



