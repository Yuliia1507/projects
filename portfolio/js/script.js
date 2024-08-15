// "use strict"

document.addEventListener("click", documentActions);

function documentActions(e) {
	const targetElement = e.target;

	// Toggle the menu open/close when clicking on the menu icon
	if (targetElement.closest('.icon-menu')) {
		document.body.classList.toggle('menu-open');
		// Toggle the icon state
		targetElement.closest('.icon-menu').classList.toggle('open');
	}
}

// Handle menu link clicks
document.querySelectorAll('.menu__link').forEach(link => {
	link.addEventListener('click', function () {
		// Remove the active class from the current active link
		const activeLink = document.querySelector('.menu__link.active');
		if (activeLink) {
			activeLink.classList.remove('active');
		}

		// Add the active class to the clicked link
		this.classList.add('active');

		// Close the menu when clicking on a navigation link
		document.querySelector('.menu__body').classList.remove('open');
		document.body.classList.remove('menu-open');

		// Remove the open class from all icons
		const icons = document.querySelectorAll('.icon-menu');
		icons.forEach(icon => icon.classList.remove('open'));
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
document.addEventListener('DOMContentLoaded', () => {
	const menuLinks = document.querySelectorAll('.menu__link');
	const sections = document.querySelectorAll('section');

	const observerOptions = {
		root: null,
		rootMargin: '0px',
		threshold: 0.5 // Adjust this threshold as needed
	};

	const observerCallback = (entries, observer) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				menuLinks.forEach(link => {
					link.classList.remove('active');
					if (link.getAttribute('href').substring(1) === entry.target.id) {
						link.classList.add('active');
					}
				});
			}
		});
	};

	const observer = new IntersectionObserver(observerCallback, observerOptions);
	sections.forEach(section => observer.observe(section));
});



function moveElements() {
	let screenWidth = window.innerWidth;
	let elementsToMove = document.querySelectorAll("[data-da]");

	elementsToMove.forEach(function (element) {
		let data = element.getAttribute("data-da").split(",");
		if (data.length === 3) {
			let destinationSelector = data[0].trim();
			let order = parseInt(data[1].trim());
			let requiredScreenWidth = parseInt(data[2].trim());
			let destination = document.querySelector(destinationSelector);
			let initialParent = element.dataset.initialParent; // Отримати початкового батька напряму

			if (!destination) return;

			if (screenWidth <= requiredScreenWidth && !element.classList.contains("moved")) {
				if (order === 1) {
					destination.insertBefore(element, destination.firstChild);
				} else {
					let previousElement = destination.children[order - 2];
					if (previousElement) {
						destination.insertBefore(element, previousElement.nextSibling);
					} else {
						destination.appendChild(element);
					}
				}
				element.classList.add("moved");
				// Зберегти початкове положення тільки якщо воно ще не збережено
				if (!element.dataset.initialParent) {
					element.dataset.initialParent = initialParent;
				}
			} else if (screenWidth > requiredScreenWidth && element.classList.contains("moved")) {
				// Перевірити, чи є початкове положення
				if (initialParent) {
					let initialParentElement = document.querySelector(".header__container"); // Отримати початкового батька напряму
					if (initialParentElement) {
						initialParentElement.appendChild(element); // Повернути елемент на його початкове місце
						element.classList.remove("moved");
					} else {
						// Handle the case where the initial parent element is not found
						console.error("Initial parent element not found");
					}
				} else {
					// Handle the case where the initial parent data is missing
					console.error("Initial parent data missing");
				}
			}
		}
	});
}

moveElements();

window.addEventListener("resize", function () {
	moveElements();
});





// document.addEventListener("DOMContentLoaded", function () {
// 	const itemsToShow = 1;
// 	const itemLocation = document.querySelectorAll(".item-charters");
// 	const showMoreBtn = document.querySelector(".more");

// 	let itemsShown = itemsToShow; // Початкова кількість показаних елементів

// 	function toggleItems() {
// 		if (window.innerWidth <= 480) {
// 			itemLocation.forEach((item, index) => {
// 				if (index < itemsShown) {
// 					item.style.display = "block";
// 				} else {
// 					item.style.display = "none";
// 				}
// 			});
// 		} else {
// 			itemLocation.forEach(item => {
// 				item.style.display = "block";
// 			});
// 		}

// 		// Перевіряємо, чи всі елементи вже видимі, і змінюємо текст кнопки відповідно
// 		if (itemsShown === itemLocation.length) {
// 			showMoreBtn.textContent = "Less";
// 		} else {
// 			showMoreBtn.textContent = "More";
// 		}
// 	}

// 	toggleItems(); // Викликаємо перевірку вікна при завантаженні сторінки

// 	showMoreBtn.addEventListener("click", function () {
// 		if (itemsShown === itemLocation.length) {
// 			// Якщо всі елементи вже видимі, ховаємо їх по одному, починаючи з останнього
// 			itemsShown = itemsToShow;
// 			toggleItems();
// 		} else {
// 			// Якщо ще є елементи, які не відображені, показуємо наступний елемент
// 			itemsShown++;
// 			toggleItems();
// 		}
// 	});

// 	window.addEventListener("resize", toggleItems); // Викликаємо перевірку вікна при зміні розміру вікна
// });





document.addEventListener('mousemove', function (e) {
	const highlight = document.querySelector('.highlight');
	if (highlight) {
		highlight.style.left = `${e.clientX}px`;
		highlight.style.top = `${e.clientY}px`;
	}
});


document.getElementById('settings-icon').addEventListener('click', function () {
	const palette = document.getElementById('color-palette');
	palette.style.display = palette.style.display === 'flex' ? 'none' : 'flex';
});

document.querySelectorAll('.color-settings__btn').forEach(option => {
	option.addEventListener('click', function () {
		const newColor = this.getAttribute('data-color');
		document.documentElement.style.setProperty('--accent-color', newColor);
		document.getElementById('color-palette').style.display = 'none';
	});
});

// Set initial accent color
document.documentElement.style.setProperty('--accent-color', '#009df8');
//==================================


class Typewriter {
	constructor(element, toRotate, period) {
		this.toRotate = toRotate;
		this.element = element;
		this.loopNum = 0;
		this.period = parseInt(period, 10) || 3000;
		this.txt = '';
		this.isDeleting = false;
		this.tick();
	}

	tick() {
		const i = this.loopNum % this.toRotate.length;
		const fullTxt = this.toRotate[i];

		if (this.isDeleting) {
			this.txt = fullTxt.substring(0, this.txt.length - 1);
		} else {
			this.txt = fullTxt.substring(0, this.txt.length + 1);
		}

		this.element.innerHTML = this.txt;

		let delta = 200 - Math.random() * 100;

		if (this.isDeleting) {
			delta /= 2;
		}

		if (!this.isDeleting && this.txt === fullTxt) {
			delta = this.period;
			this.isDeleting = true;
		} else if (this.isDeleting && this.txt === '') {
			this.isDeleting = false;
			this.loopNum++;
			delta = 500;
		}

		setTimeout(() => this.tick(), delta);
	}
}

window.onload = function () {
	const elements = document.getElementsByClassName('hero__typewriter');
	for (let i = 0; i < elements.length; i++) {
		const toRotate = elements[i].getAttribute('data-type');
		const period = elements[i].getAttribute('data-period');
		if (toRotate) {
			new Typewriter(elements[i], JSON.parse(toRotate), period);
		}
	}
};

const swiper = new Swiper(".mySwiper", {
	effect: "coverflow",
	grabCursor: true,
	centeredSlides: true,
	loop: true,
	slidesPerView: "auto",
	coverflowEffect: {
		rotate: 0,
		stretch: 0,
		depth: 150,
		modifier: 2.5,
		slideShadows: true,
	},
	autoplay: {

		delay: 3000,
		disableOnInteraction: false,
	}

});

const swiper2 = new Swiper('.testimonials__swiper', {
	direction: 'vertical', // Вертикальне гортання слайдів
	slidesPerView: 'auto', // Кожен слайд займає стільки місця, скільки потрібно його вмісту
	spaceBetween: 20, // Відстань між слайдами
	autoHeight: true, // Динамічно підлаштовує висоту контейнера під висоту активного слайда
	touchEventsTarget: 'wrapper',
	touchRatio: 1,
	touchAngle: 45,
	simulateTouch: true,
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

window.onscroll = function () { scrollFunction() };

function scrollFunction() {
	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		document.getElementById("scrollToTopBtn").classList.add("visible");
	} else {
		document.getElementById("scrollToTopBtn").classList.remove("visible");
	}
}

document.getElementById("scrollToTopBtn").onclick = function () { topFunction() };

function topFunction() {
	window.scrollTo({ top: 0, behavior: 'smooth' });
}


document.addEventListener("DOMContentLoaded", function () {
	const elements = document.querySelectorAll('.hero__info .hero__title, .hero__info .hero__typewriter, .hero__info .hero__text, .hero__info .hero__social');
	elements.forEach((element, index) => {
		setTimeout(() => {
			element.classList.add('visible');
		}, index * 500); // Затримка 0.5 секунди між елементами
	});
});

document.addEventListener("DOMContentLoaded", function () {
	const elementsToObserve = document.querySelectorAll('.title, .text, .info-service__item, .service__image');

	const observer = new IntersectionObserver((entries, observer) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('visible');
				observer.unobserve(entry.target); // Optional: stop observing once it's visible
			}
		});
	});

	elementsToObserve.forEach(element => observer.observe(element));
});
