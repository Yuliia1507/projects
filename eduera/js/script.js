"use strict"


document.addEventListener("click", documentActions);

function documentActions(e) {
	const targetElement = e.target;

	if (targetElement.closest('.icon-menu')) {
		document.body.classList.toggle('menu-open');
		document.querySelector('.menu__body').classList.toggle('open');
	}
}

const icons = document.querySelectorAll('.icon-menu');
icons.forEach(icon => {
	icon.addEventListener('click', (event) => {
		icon.classList.toggle('active');
	});
});

document.addEventListener('scroll', function () {
	const header = document.querySelector('.header');
	if (window.scrollY > 0) {
		header.classList.add('scrolled');
	} else {
		header.classList.remove('scrolled');
	}
});

document.querySelectorAll('.menu__link').forEach(link => {
	link.addEventListener('click', function () {
		document.querySelector('.menu__link.active').classList.remove('active');
		this.classList.add('active');

		// Закриття меню при натисканні на пункт навігації
		document.querySelector('.menu__body').classList.remove('open');
		document.body.classList.remove('menu-open');
		icons.forEach(icon => icon.classList.remove('active'));
	});
});

document.addEventListener('click', documentActions);


//=============================
const newSlider = document.querySelector('.category');
if (newSlider) {
	new Swiper('.category__swiper', {
		// Optional parameters
		loop: true,
		autoHeight: true,
		speed: 800,
		spaceBetween: 29,
		slidesPerView: 6,
		
		// Navigation arrows
		navigation: {
			nextEl: '.category__button-next',
			prevEl: '.category__button-prev',
		},
		// Responsive breakpoints
		breakpoints: {
			// when window width is >= 320px
			320: {
				slidesPerView: 1.4,
				spaceBetween: 15
			},
			480: {
				slidesPerView: 2.2,
				spaceBetween: 15
			},
			700: {
				slidesPerView: 3,
				spaceBetween: 15
			},
			890: {
				slidesPerView: 4,
				spaceBetween: 15
			},
			// when window width is >= 480px
			1120: {
				slidesPerView: 5,
				spaceBetween: 20
			},
			// when window width is >= 640px
			1400: {
				slidesPerView: 6,
				spaceBetween: 30
			}
		},
		autoplay: {
			delay: 3000, // milliseconds
			disableOnInteraction: false, // enable autoplay even when user interacts with swiper
		}
	});
}

//==================================
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


document.addEventListener('DOMContentLoaded', function () {
	const buttons = document.querySelectorAll('.courses__buttons button');
	const contents = document.querySelectorAll('.courses__wrap');

	buttons.forEach(button => {
		button.addEventListener('click', function () {
			// Remove active class from all buttons
			buttons.forEach(btn => btn.classList.remove('active'));
			// Add active class to the clicked button
			button.classList.add('active');

			// Get the class name for the content to show
			const contentClass = button.className.split(' ')[0] + '-content';

			// Hide all content
			contents.forEach(content => content.classList.remove('active'));
			// Show the relevant content
			document.querySelector('.' + contentClass).classList.add('active');
		});
	});
});


//===================================
const slider = document.querySelector('.testimonials');
if (newSlider) {
	new Swiper('.testimonials__swiper', {
		// Optional parameters
		loop: true,
		autoHeight: true,
		speed: 800,
		spaceBetween: 29,
		slidesPerView: 1,
		// Navigation arrows
		navigation: {
			nextEl: '.testimonials__button--next',
			prevEl: '.testimonials__button--prev',
		},
		// Responsive breakpoints
		autoplay: {
			delay: 5000, // milliseconds
			disableOnInteraction: false, // enable autoplay even when user interacts with swiper
		}
	});
}

//======
// function moveElements() {
// 	let screenWidth = window.innerWidth;
// 	let elementsToMove = document.querySelectorAll("[data-da]");

// 	elementsToMove.forEach(function (element) {
// 		let data = element.getAttribute("data-da").split(",");
// 		if (data.length === 3) {
// 			let destinationSelector = data[0].trim();
// 			let order = parseInt(data[1].trim());
// 			let requiredScreenWidth = parseInt(data[2].trim());
// 			let destination = document.querySelector(destinationSelector);
// 			let initialParent = element.dataset.initialParent; // Отримати початкового батька напряму

// 			if (!destination) return;

// 			if (screenWidth <= requiredScreenWidth && !element.classList.contains("moved")) {
// 				if (order === 1) {
// 					destination.insertBefore(element, destination.firstChild);
// 				} else {
// 					let previousElement = destination.children[order - 2];
// 					if (previousElement) {
// 						destination.insertBefore(element, previousElement.nextSibling);
// 					} else {
// 						destination.appendChild(element);
// 					}
// 				}
// 				element.classList.add("moved");
// 				// Зберегти початкове положення тільки якщо воно ще не збережено
// 				if (!element.dataset.initialParent) {
// 					element.dataset.initialParent = initialParent;
// 				}
// 			} else if (screenWidth > requiredScreenWidth && element.classList.contains("moved")) {
// 				// Перевірити, чи є початкове положення
// 				if (initialParent) {
// 					let initialParentElement = document.querySelector(".header__action"); // Отримати початкового батька напряму
// 					if (initialParentElement) {
// 						initialParentElement.appendChild(element); // Повернути елемент на його початкове місце
// 						element.classList.remove("moved");
// 					} else {
// 						// Handle the case where the initial parent element is not found
// 						console.error("Initial parent element not found");
// 					}
// 				} else {
// 					// Handle the case where the initial parent data is missing
// 					console.error("Initial parent data missing");
// 				}
// 			}
// 		}
// 	});
// }

// moveElements();

// window.addEventListener("resize", function () {
// 	moveElements();
// });

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

// let arrow = document.getElementById("arrow");

// console.log(arrow.getTotalLength());


function animateCounter(element, start, end, duration) {
	let startTime = null;
	const step = (timestamp) => {
		if (!startTime) startTime = timestamp;
		const progress = Math.min((timestamp - startTime) / duration, 1);
		const value = Math.floor(progress * (end - start) + start);
		let displayValue;
		if (value >= 1000000) {
			displayValue = Math.floor(value / 1000000) + 'M+';
		} else if (value >= 1000) {
			displayValue = Math.floor(value / 1000) + 'K+';
		} else {
			displayValue = value + '+';
		}
		element.textContent = displayValue;
		if (progress < 1) {
			window.requestAnimationFrame(step);
		} else {
			if (end >= 1000000) {
				element.textContent = Math.floor(end / 1000000) + 'M+';
			} else if (end >= 1000) {
				element.textContent = Math.floor(end / 1000) + 'K+';
			} else {
				element.textContent = end + '+';
			}
		}
	};
	window.requestAnimationFrame(step);
}

document.addEventListener('DOMContentLoaded', () => {
	document.querySelectorAll('.item-counter__number').forEach(counter => {
		const start = parseInt(counter.getAttribute('data-start'), 10);
		const end = parseInt(counter.getAttribute('data-end'), 10);
		animateCounter(counter, start, end, 2000);
	});
});

//===============================================

document.addEventListener("DOMContentLoaded", function () {
	const itemsToShow = 3;
	const itemLocation = document.querySelectorAll(".courses__item");
	const showMoreBtn = document.querySelector(".courses__more-btn");

	let itemsShown = itemsToShow; // Initial number of visible items

	function toggleItems() {
		if (window.innerWidth <= 767.98) {
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

		// Check if all items are visible and update the button text accordingly
		if (itemsShown === itemLocation.length) {
			showMoreBtn.textContent = "Show Less";
		} else {
			showMoreBtn.textContent = "Explore more Courses";
		}
	}

	toggleItems(); // Call the function to check the window size when the page loads

	showMoreBtn.addEventListener("click", function () {
		if (window.innerWidth <= 767.98) {
			if (itemsShown === itemLocation.length) {
				// If all items are already visible, hide them to the initial count
				itemsShown = itemsToShow;
				toggleItems();
			} else {
				// If there are still items not displayed, show the next item
				itemsShown++;
				toggleItems();
			}
		}
	});

	window.addEventListener("resize", toggleItems); // Call the function to check the window size when it resizes
});

//===============================
// document.addEventListener('DOMContentLoaded', function () {
// 	const items = document.querySelectorAll('.courses__item');

// 	function fadeInElements() {
// 		items.forEach(function (item) {
// 			if (isPartiallyInViewport(item)) {
// 				item.classList.add('active');
// 			} else {
// 				item.classList.remove('active');
// 			}
// 		});
// 	}

// 	function isPartiallyInViewport(el) {
// 		let rect = el.getBoundingClientRect();
// 		let windowHeight = (window.innerHeight || document.documentElement.clientHeight);
// 		return (
// 			rect.top < windowHeight &&
// 			rect.bottom >= 0
// 		);
// 	}

// 	fadeInElements();

// 	window.addEventListener('scroll', fadeInElements);
// });

document.addEventListener("DOMContentLoaded", function () {
	const hiddenElements = document.querySelectorAll('.item-courses, .title, .item-instructor, .text');

	const observer = new IntersectionObserver((entries, observer) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('visible');
				observer.unobserve(entry.target);
			}
		});
	}, { threshold: 0.1 });

	hiddenElements.forEach(element => {
		observer.observe(element);
	});
});
//=======================

document.addEventListener("DOMContentLoaded", function () {
	const heroTextElements = document.querySelectorAll(".hero__title, .hero__text, .hero__buttons-wrap, .hero__counter, .hero__image img, .hero__image svg");
	if (heroTextElements.length > 0) {
		heroTextElements.forEach(function (element) {
			element.classList.add("show");
		});
	} else {
		console.error("Elements with class 'hero__title' or 'hero__text' not found.");
	}
});
//======================================

document.addEventListener('DOMContentLoaded', function () {
	const svgElement = document.querySelector('.testimonials__arrow');

	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				svgElement.classList.add('animate-arrow');
				// Stop observing once the animation has been triggered
				observer.unobserve(svgElement);
			}
		});
	}, {
		threshold: 0.1 // Adjust this threshold as needed
	});

	observer.observe(svgElement);
});


document.addEventListener('DOMContentLoaded', () => {
	const buttons = document.querySelectorAll('.courses__buttons button');
	const observerOptions = {
		root: null,
		rootMargin: '0px',
		threshold: 0.1
	};

	const observer = new IntersectionObserver((entries, observer) => {
		entries.forEach((entry, index) => {
			if (entry.isIntersecting) {
				setTimeout(() => {
					entry.target.classList.add('visible');
				}, index * 300); // 300ms delay between buttons
			}
		});
	}, observerOptions);

	buttons.forEach(button => {
		observer.observe(button);
	});
});
