"use strict"

// Define frequently used elements
const iconMenu = document.querySelector('.icon-menu');
const header = document.querySelector('.header');
const menuLinks = document.querySelectorAll('.menu__link');
const menuBody = document.querySelector('.menu__body');

// Toggle menu visibility and icon state
iconMenu.addEventListener('click', function () {
	document.body.classList.toggle('menu-open');
	iconMenu.classList.toggle('open');
});

// Handle document-wide click to close the menu if clicking outside
document.addEventListener("click", function (e) {
	if (!iconMenu.contains(e.target) && !menuBody.contains(e.target)) {
		document.body.classList.remove('menu-open');
		iconMenu.classList.remove('open');
	}
});

// Add scroll effect to the header
window.addEventListener('scroll', function () {
	if (window.scrollY > 0) {
		header.classList.add('scrolled');
	} else {
		header.classList.remove('scrolled');
	}
});

// Handle menu link clicks
menuLinks.forEach(link => {
	link.addEventListener('click', function () {
		// Remove active class from the previously active link
		const activeLink = document.querySelector('.menu__link.active');
		if (activeLink) {
			activeLink.classList.remove('active');
		}

		// Add active class to the clicked link
		this.classList.add('active');

		// Close the menu
		menuBody.classList.remove('open');
		document.body.classList.remove('menu-open');
	});
});



document.addEventListener('DOMContentLoaded', function () {
	const titles = document.querySelectorAll('.footer__title');

	titles.forEach(function (title) {
		title.addEventListener('click', function () {
			let section = this.parentElement;
			let list = this.nextElementSibling;
			let isOpen = section.classList.toggle('expanded');

			if (isOpen) {
				// Calculate the height of the list after it's made visible
				requestAnimationFrame(() => {
					list.style.maxHeight = list.scrollHeight + 'px';
				});
			} else {
				list.style.maxHeight = '0';
			}

			this.classList.toggle('up');
		});
	});
});

//=======================
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

document.addEventListener('DOMContentLoaded', () => {
	const hoverElement = document.querySelector('.hero__hover--right');
	const textSvg = document.querySelector('.text-svg');

	// Функція для показу/приховування елемента
	const toggleTextSvg = () => {
		if (textSvg.style.display === 'none' || textSvg.style.display === '') {
			textSvg.style.display = 'block';
		} else {
			textSvg.style.display = 'none';
		}
	};

	// Додаємо обробник кліку на елемент
	hoverElement.addEventListener('click', (event) => {
		event.stopPropagation(); // Зупиняє подію, щоб не потрапила на document
		toggleTextSvg();
	});

	// Додаємо обробник кліку на весь документ
	document.addEventListener('click', () => {
		if (textSvg.style.display === 'block') {
			textSvg.style.display = 'none';
		}
	});

	// Додаємо обробник кліку на сам елемент text-svg, щоб не закривати його при кліку всередині
	textSvg.addEventListener('click', (event) => {
		event.stopPropagation(); // Зупиняє подію, щоб не потрапила на document
	});
});
document.addEventListener('DOMContentLoaded', () => {
	const hoverElement = document.querySelector('.hero__hover--left-top');
	const textSvg = document.querySelector('.text-svg--left-top');

	// Функція для показу/приховування елемента
	const toggleTextSvg = () => {
		if (textSvg.style.display === 'none' || textSvg.style.display === '') {
			textSvg.style.display = 'block';
		} else {
			textSvg.style.display = 'none';
		}
	};

	// Додаємо обробник кліку на елемент
	hoverElement.addEventListener('click', (event) => {
		event.stopPropagation(); // Зупиняє подію, щоб не потрапила на document
		toggleTextSvg();
	});

	// Додаємо обробник кліку на весь документ
	document.addEventListener('click', () => {
		if (textSvg.style.display === 'block') {
			textSvg.style.display = 'none';
		}
	});

	// Додаємо обробник кліку на сам елемент text-svg, щоб не закривати його при кліку всередині
	textSvg.addEventListener('click', (event) => {
		event.stopPropagation(); // Зупиняє подію, щоб не потрапила на document
	});
});
document.addEventListener('DOMContentLoaded', () => {
	const hoverElement = document.querySelector('.hero__hover--left-bottom');
	const textSvg = document.querySelector('.text-svg--left-bottom');

	// Функція для показу/приховування елемента
	const toggleTextSvg = () => {
		if (textSvg.style.display === 'none' || textSvg.style.display === '') {
			textSvg.style.display = 'block';
		} else {
			textSvg.style.display = 'none';
		}
	};

	// Додаємо обробник кліку на елемент
	hoverElement.addEventListener('click', (event) => {
		event.stopPropagation(); // Зупиняє подію, щоб не потрапила на document
		toggleTextSvg();
	});

	// Додаємо обробник кліку на весь документ
	document.addEventListener('click', () => {
		if (textSvg.style.display === 'block') {
			textSvg.style.display = 'none';
		}
	});

	// Додаємо обробник кліку на сам елемент text-svg, щоб не закривати його при кліку всередині
	textSvg.addEventListener('click', (event) => {
		event.stopPropagation(); // Зупиняє подію, щоб не потрапила на document
	});
});

document.addEventListener("DOMContentLoaded", function () {
	const heroTextElements = document.querySelectorAll(".hero__title, .hero__text, .hero__search-bar");
	if (heroTextElements.length > 0) {
		heroTextElements.forEach(function (element) {
			element.classList.add("show");
		});
	} else {
		console.error("Elements with class 'hero__title' or 'hero__text' not found.");
	}
});

//====================================

document.addEventListener('DOMContentLoaded', () => {
	const items = document.querySelectorAll('.service__item, .card, .title, .text,.interior__item, .plant-care__item, .left-bestseller');

	const observerOptions = {
		threshold: 0.3
	};

	const observerCallback = (entries, observer) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('visible');
				observer.unobserve(entry.target); // Optional: Stop observing once the element is visible
			}
		});
	};

	const observer = new IntersectionObserver(observerCallback, observerOptions);

	items.forEach(item => {
		observer.observe(item);
	});
});
