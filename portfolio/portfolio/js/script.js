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
// 					let initialParentElement = document.querySelector(".header__container"); // Отримати початкового батька напряму
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




document.addEventListener('mousemove', function (e) {
	const highlight = document.querySelector('.highlight');
	if (highlight) {
		highlight.style.left = `${e.clientX}px`;
		highlight.style.top = `${e.clientY}px`;
	}
});


document.getElementById('settings-icon').addEventListener('click', function (e) {
	e.stopPropagation();
	const palette = document.getElementById('color-palette');
	palette.classList.toggle('show');
});

document.querySelectorAll('.color-settings__btn').forEach(option => {
	option.addEventListener('click', function () {
		const newColor = this.getAttribute('data-color');
		document.documentElement.style.setProperty('--accent-color', newColor);
		localStorage.setItem('accentColor', newColor);
		document.getElementById('color-palette').classList.remove('show');
	});
});

document.addEventListener('click', function (e) {
	const palette = document.getElementById('color-palette');
	const settingsIcon = document.getElementById('settings-icon');

	if (palette.classList.contains('show') && !palette.contains(e.target) && !settingsIcon.contains(e.target)) {
		palette.classList.remove('show');
	}
});




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

// const swiper = new Swiper(".mySwiper", {
// 	effect: "coverflow",
// 	grabCursor: true,
// 	centeredSlides: true,
// 	loop: true,
// 	slidesPerView: "auto",
// 	coverflowEffect: {
// 		rotate: 0,
// 		stretch: 0,
// 		depth: 150,
// 		modifier: 2.5,
// 		slideShadows: true,
// 	},
// 	autoplay: {

// 		delay: 3000,
// 		disableOnInteraction: false,
// 	}

// });

const swiperFeedbacks = new Swiper(".testimonials__swiper", {
	loop: true,
	spaceBetween: 32,
	grabCursor: true,

	pagination: {
		el: ".swiper-pagination",
		clickable: true,
		dynamicBullets: true,
	},

	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},

	breakpoints: {
		320: {
			slidesPerView: 1,
			spaceBetween: 10,
		},
		600: {
			slidesPerView: 2,

		},
		968: {
			slidesPerView: 3,
		},
	},
});

function setOpacityClasses() {
	const slides = document.querySelectorAll('.testimonials__slide');
	slides.forEach((slide, index) => {
		slide.classList.remove('slide-prev', 'slide-next', 'slide-active');

		if (swiper2.activeIndex === index) {
			slide.classList.add('slide-active');
		} else if (index === swiper2.activeIndex - 1) {
			slide.classList.add('slide-prev');
		} else if (index === swiper2.activeIndex + 1) {
			slide.classList.add('slide-next');
		}
	});
}


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



document.addEventListener("DOMContentLoaded", function () {
	const btn7Days = document.getElementById("btn-landing");
	const btn30Days = document.getElementById("btn-corporate");
	const collection7Days = document.getElementById("landing");
	const collection30Days = document.getElementById("corporate");
	const showMoreBtn = document.querySelector(".projects__button");

	let activeCollection = collection7Days; // Initially, the active collection is the 7-day one
	const itemsToShow = 3;
	let itemsShown = itemsToShow;

	// Function to toggle active collection and buttons
	function toggleCollection(collectionToShow, collectionToHide, btnToActivate, btnToDeactivate) {
		collectionToShow.classList.add("active");
		collectionToHide.classList.remove("active");
		btnToActivate.classList.add("active");
		btnToDeactivate.classList.remove("active");

		activeCollection = collectionToShow; // Set the active collection
		itemsShown = itemsToShow; // Reset the count of shown items for the new active collection
		toggleItems(); // Adjust visibility for the newly active collection
	}

	// Event listeners for buttons
	btn7Days.addEventListener("click", function () {
		toggleCollection(collection7Days, collection30Days, btn7Days, btn30Days);
	});

	btn30Days.addEventListener("click", function () {
		toggleCollection(collection30Days, collection7Days, btn30Days, btn7Days);
	});

	// Function to show/hide items in the active collection
	function toggleItems() {
		const items = activeCollection.querySelectorAll(".projects__item");

		if (window.innerWidth <= 767) {
			items.forEach((item, index) => {
				item.style.display = index < itemsShown ? "grid" : "none";
			});
		} else {
			items.forEach(item => {
				item.style.display = "grid";
			});
		}

		// Update button text based on the number of visible items
		showMoreBtn.textContent = itemsShown >= items.length ? "Hide" : "See All";
	}

	// Initial call to set up the visibility of the active collection
	toggleItems();

	showMoreBtn.addEventListener("click", function () {
		const items = activeCollection.querySelectorAll(".projects__item");

		// Toggle between showing all items or only a few
		if (itemsShown >= items.length) {
			itemsShown = itemsToShow; // Reset to initial number if all items are shown
		} else {
			itemsShown += itemsToShow; // Show 3 more items each time the button is clicked
		}

		toggleItems();
	});

	// Adjust visibility on window resize
	window.addEventListener("resize", toggleItems);
});