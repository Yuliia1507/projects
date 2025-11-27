"use strict"

// Функція для додавання класів loading/loaded
function handlePageLoad() {
	const html = document.documentElement;
	html.classList.add('loading');

	window.addEventListener('load', () => {
		setTimeout(() => {
			html.classList.remove('loading');
			html.classList.add('loaded');

			// Викликаємо анімацію hero після loaded
			startHeroAnimation();
		}, 100);
	});
}

// Функція для анімації hero-секції
function startHeroAnimation() {
	const heroItems = document.querySelectorAll('.hero__label, .hero__title, .hero__button');

	heroItems.forEach((item, index) => {
		setTimeout(() => {
			item.classList.add('visible');
		}, index * 300);
	});
}

// Запуск
handlePageLoad();


document.addEventListener("click", (e) => {
	const menuButton = e.target.closest('.icon-menu');
	const menuLink = e.target.closest('.menu__link');

	// Відкриття / закриття бургеру
	if (menuButton) {
		menuButton.classList.toggle('active');
		document.body.classList.toggle('menu-open');
	}

	// Закриваємо меню і робимо посилання активним
	if (menuLink) {
		// прибираємо active у всіх посиланнях
		document.querySelectorAll('.menu__link').forEach(link => link.classList.remove('active'));

		// додаємо active на клікнуте
		menuLink.classList.add('active');

		// закриваємо бургер
		const iconMenu = document.querySelector('.icon-menu');
		if (iconMenu) iconMenu.classList.remove('active');
		document.body.classList.remove('menu-open');
	}
});

//============================Sticky Elements=============================
document.addEventListener('DOMContentLoaded', () => {
	const stickyItems = document.querySelectorAll('.item-services, .item-pricing');

	const setSticky = () => {
		const isWide = window.innerWidth > 860;

		stickyItems.forEach((item, index) => {
			item.style.zIndex = 10 + index;
			item.classList.toggle('sticky', isWide);
		});
	};

	setSticky();

	// debounce для плавності при ресайзі
	let resizeTimer;
	window.addEventListener('resize', () => {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(setSticky, 200);
	});
});



//========rating=======
// 	const items = document.querySelectorAll('.item-services');
// 	if (!items || items.length === 0) return;

// 	const setSticky = () => {
// 		const width = window.innerWidth || document.documentElement.clientWidth;

// 		items.forEach((item, index) => {
// 			item.style.zIndex = 10 + index;

// 			if (width > 980) {
// 				item.classList.add('sticky');
// 			} else {
// 				item.classList.remove('sticky');
// 			}
// 		});
// 	};

// 	setSticky();
// 	window.addEventListener('resize', setSticky);
// });


//============================Rating=============================
const ratings = document.querySelectorAll('[data-rating]');
if (ratings) {
	ratings.forEach(rating => {
		const currentValue = +rating.dataset.rating;
		if (currentValue) {
			starRatingSet(rating, currentValue);
		}
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
	const resultFullItems = Math.floor(value);
	const resultPartItem = value - resultFullItems;

	ratingItems.forEach((ratingItem, index) => {
		ratingItem.classList.remove('active');
		const span = ratingItem.querySelector('span');
		if (span) span.remove();

		if (index < resultFullItems) {
			ratingItem.classList.add('active');
		}
		if (index === resultFullItems && resultPartItem) {
			ratingItem.insertAdjacentHTML("beforeend", `<span style="width:${resultPartItem * 100}%"></span>`);
		}
	});
}
//============================Swiper Testimonials=============================
document.addEventListener('DOMContentLoaded', () => {
	const swiperContainer = document.querySelector('.testimonials__swiper');

	if (!swiperContainer) return;

	const testimonialsSwiper = new Swiper(swiperContainer, {
		loop: true,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
		slidesPerView: 1,
		spaceBetween: 20,
		observer: true,
		observeParents: true,
		navigation: {
			nextEl: '.testimonials__button-next',
			prevEl: '.testimonials__button-prev',
		},
		breakpoints: {
			800: {
				slidesPerView: 2,
			},
			1200: {
				slidesPerView: 3,
			},
		}

	});
});

//======================FAQ Accordion=========================
const faqItems = document.querySelectorAll('.faq__item');

if (faqItems.length > 0) {
	faqItems.forEach(item => {
		const button = item.querySelector('.item-faq__button');
		const answer = item.querySelector('.item-faq__answer');

		if (!button || !answer) return;

		button.addEventListener('click', () => {
			const isOpen = item.classList.contains('open');

			// Close all other open items
			faqItems.forEach(otherItem => {
				if (otherItem !== item && otherItem.classList.contains('open')) {
					const otherAnswer = otherItem.querySelector('.item-faq__answer');
					otherAnswer.style.height = otherAnswer.scrollHeight + 'px'; // Set the current height before closing
					setTimeout(() => {
						otherAnswer.style.height = '0px';
					}, 10);
					otherItem.classList.remove('open');
				}
			});

			if (!isOpen) {
				// Open the clicked item
				item.classList.add('open');
				answer.style.height = answer.scrollHeight + 'px';
				answer.addEventListener('transitionend', function onOpen(event) {
					// Ensure the transition is for height
					if (event.propertyName === 'height') {
						answer.style.height = 'auto';
						answer.removeEventListener('transitionend', onOpen);
					}
				});
			} else {
				// Close the clicked item
				answer.style.height = answer.scrollHeight + 'px';
				setTimeout(() => {
					answer.style.height = '0px';
				}, 10);
				item.classList.remove('open');
			}
		});

		// Observe content changes and adjust height if needed
		const observer = new MutationObserver(() => {
			if (item.classList.contains('open')) {
				answer.style.height = 'auto';
				requestAnimationFrame(() => {
					answer.style.height = answer.scrollHeight + 'px';
				});
			}
		});

		observer.observe(answer, { childList: true, subtree: true });
	});
}


//======================Footer Navigation Spoilers=========================
const titles = document.querySelectorAll('.item-navigation__title');

function handleSpoiler() {
	if (window.innerWidth <= 645) {
		titles.forEach((title) => {
			const list = title.nextElementSibling;
			const arrow = title.querySelector('.nav-arrow');

			if (list) {
				list.style.height = '0px';
				list.style.overflow = 'hidden';
				list.style.transition = 'height 0.3s ease-out';

				// Видаляємо старі обробники перед додаванням нових
				title.removeEventListener('click', toggleSpoiler);
				title.addEventListener('click', toggleSpoiler);
			}
		});
	} else {
		// Якщо ширина більше 600px, прибираємо inline-стилі та обробники подій
		titles.forEach((title) => {
			const list = title.nextElementSibling;
			if (list) {
				list.style.height = '';
				list.style.overflow = '';
				list.style.transition = '';
				title.removeEventListener('click', toggleSpoiler);
			}
		});
	}
}

function toggleSpoiler(event) {
	const title = event.currentTarget;
	const list = title.nextElementSibling;

	if (list.style.height === '0px' || list.style.height === '') {
		list.style.height = list.scrollHeight + 'px';
		title.classList.add('active');
	} else {
		list.style.height = '0px';
		title.classList.remove('active');
	}
}


// Викликаємо функцію при завантаженні сторінки та при зміні розміру
window.addEventListener('load', handleSpoiler);
window.addEventListener('resize', handleSpoiler);

//====================MOVE HEADER BUTTON TO BURGER MENU========================

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

//=========================animations on scroll=========================
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

observeElements('.partners__img-wrap, .process__wrapper,.title,  .about__image, .faq__img,.cta__content, .projects__item, .insights__item');

//====scroll to top==========

// scroll to top behaviour
(function () {
	const btn = document.getElementById('scrollTop');
	if (!btn) return;
	const toggleShow = () => {
		if (window.scrollY > 300) btn.classList.add('show');
		else btn.classList.remove('show');
	};
	window.addEventListener('scroll', toggleShow, { passive: true });
	btn.addEventListener('click', () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	});
	// initial check
	toggleShow();
})();