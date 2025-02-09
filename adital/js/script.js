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

const scrollButton = document.querySelector(".hero__scroll");

if (scrollButton) {
	scrollButton.addEventListener("click", () => {
		const nextSection = scrollButton.closest("section")?.nextElementSibling;
		if (nextSection) {
			nextSection.scrollIntoView({ behavior: "smooth" });
		}
	});
}


//=========================TABS===============================
document.addEventListener("DOMContentLoaded", () => {
	const buttons = document.querySelectorAll(".tabs__button");
	const projects = document.querySelectorAll(".project__item");

	buttons.forEach(button => {
		button.addEventListener("click", () => {
			const category = button.dataset.tab;

			// Змінюємо активну кнопку
			buttons.forEach(btn => btn.classList.remove("active"));
			button.classList.add("active");

			// Фільтруємо проєкти
			projects.forEach(project => {
				if (category === "all" || project.dataset.category === category) {
					project.classList.add("active");
				} else {
					project.classList.remove("active");
				}
			});

			// Перезапускаємо IntersectionObserver для нових активних елементів
			setTimeout(() => {
				projects.forEach(project => observer.observe(project));
			}, 100);
		});
	});

	// Автоматично натискаємо активну кнопку при завантаженні
	document.querySelector(".tabs__button.active").click();

	// Анімація при прокручуванні
	const observer = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add("visible");
			}
		});
	}, { threshold: 0.2 });

	projects.forEach(project => observer.observe(project));
});


//==================================================
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
	const ratingNumber = rating.querySelector('.rating__number'); // Отримуємо блок з числом рейтингу
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

	if (ratingNumber) {
		ratingNumber.textContent = value.toFixed(1); // Встановлюємо рейтинг з одним десятковим знаком
	}
}


//==================================================
document.addEventListener("DOMContentLoaded", function () {
	new Swiper(".testimonials__swiper", {
		slidesPerView: 1,
		spaceBetween: 20,
		autoHeight:true,
		loop: true,
		autoplay: {
			delay: 4000,
			disableOnInteraction: false,
		},
		navigation: {
			nextEl: ".button-next",
			prevEl: ".button-prev",
		},
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
		},
		breakpoints: {
			320: {
				slidesPerView: 1,
				spaceBetween: 20
			},
			550: {
				slidesPerView: 1.3,
				spaceBetween: 20
			},
			768: {
				slidesPerView: 2,
				spaceBetween: 30
			},
			1024: {
				slidesPerView: 3,
				spaceBetween: 50
			}
		}
	});
});

document.addEventListener("DOMContentLoaded", function () {
	const elements = document.querySelectorAll(".title");

	if (elements.length > 0) {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add("visible");
					}
				});
			},
			{ threshold: 0.3 }
		);

		elements.forEach((el) => observer.observe(el));
	}
});

//===================================

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
observeElements('.services__item, .label, .study__image, .quote__right-side, .quote__left-side,.cta__link, .social__link');

//===================================
document.addEventListener("DOMContentLoaded", function () {
	const counters = document.querySelectorAll(".counter__number");

	const animateCounter = (element, start, end, suffix = "") => {
		let duration = 2000; // Тривалість анімації в мс
		let stepTime = 30;
		let steps = Math.ceil(duration / stepTime);
		let stepValue = (end - start) / steps;
		let currentValue = start;
		let counterInterval = setInterval(() => {
			currentValue += stepValue;
			if (currentValue >= end) {
				clearInterval(counterInterval);
				currentValue = end;
			}
			element.textContent = Math.round(currentValue) + suffix;
		}, stepTime);
	};

	const observer = new IntersectionObserver((entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				const target = entry.target;
				if (!target.dataset.animated) {
					if (target.textContent.includes("%")) {
						animateCounter(target, 0, 75, "%"); // Наприклад, 75% ROI
					} else if (target.textContent.includes("k")) {
						animateCounter(target, 0, 50, "k"); // Наприклад, 50k відвідувань
					}
					target.dataset.animated = "true";
				}
			}
		});
	}, { threshold: 0.5 });

	counters.forEach(counter => observer.observe(counter));
});


