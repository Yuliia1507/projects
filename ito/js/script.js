"use strict"

function documentActions(e) {
	const targetElement = e.target;

	// Клік по бургер-іконці
	if (targetElement.closest('.icon-menu')) {
		document.body.classList.toggle('menu-open');
		document.querySelector('.icon-menu').classList.toggle('active'); // Додаємо клас
		return;
	}

	// Клік по пункту меню
	if (targetElement.closest('.menu__link')) {
		document.querySelectorAll('.menu__link').forEach(link => link.classList.remove('active'));
		targetElement.classList.add('active');
		document.body.classList.remove('menu-open');
		document.querySelector('.icon-menu').classList.remove('active'); // Видаляємо клас
	}
}

// Додаємо обробник подій
document.addEventListener('click', documentActions);


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
document.addEventListener('DOMContentLoaded', function () {
	const buttons = document.querySelectorAll('.tabs__button');
	const items = document.querySelectorAll('.marketplace__item');
	let selectedCategory = ''; // Для зберігання вибраної категорії

	buttons.forEach(button => {
		button.addEventListener('click', function () {
			const category = button.getAttribute('data-category');

			// Якщо натискаємо на активну кнопку, скидаємо вибір
			if (selectedCategory === category) {
				button.classList.remove('active');
				selectedCategory = '';
			} else {
				// Видаляємо клас 'active' у всіх кнопок і встановлюємо для поточної
				buttons.forEach(btn => btn.classList.remove('active'));
				button.classList.add('active');
				selectedCategory = category;
			}

			// Оновлення відображення елементів
			items.forEach(item => {
				const itemCategories = item.getAttribute('data-category');
				if (itemCategories) {
					const categoriesArray = itemCategories.split(',');

					// Показуємо всі елементи, якщо категорія скинута, або фільтруємо за категорією
					if (selectedCategory === '' || categoriesArray.includes(selectedCategory)) {
						item.style.display = 'block';
					} else {
						item.style.display = 'none';
					}
				}
			});
		});
	});
});







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

observeElements('.wallet__item,.title,.collection__item,.marketplace__item, .creators__item,.buyer__item');

//===================================


document.querySelectorAll(".select__item").forEach(select => {
	const trigger = select.querySelector(".select__trigger");
	const optionsWrap = select.querySelector(".select__options-wrap");

	// Toggle options dropdown
	trigger.addEventListener("click", () => {
		optionsWrap.classList.toggle("open");
	});

	// Close dropdown when clicking outside
	window.addEventListener("click", e => {
		if (!select.contains(e.target)) {
			optionsWrap.classList.remove("open");
		}
	});

	// Handle option selection
	optionsWrap.querySelectorAll(".select__option").forEach(option => {
		option.addEventListener("click", () => {
			const value = option.dataset.value;
			const text = option.textContent;

			// Update trigger text
			trigger.querySelector("span").textContent = text;

			// Update selected class
			optionsWrap.querySelector(".selected").classList.remove("selected");
			option.classList.add("selected");

			// Close dropdown
			optionsWrap.classList.remove("open");

			console.log("Selected value:", value); // Optional: Handle the selected value
		});
	});
});

//=======================

document.addEventListener("DOMContentLoaded", function () {
	const buttons = document.querySelectorAll(".item-buyer__button");

	buttons.forEach(button => {
		// Перевірка наявності класу 'following' при завантаженні
		if (button.classList.contains("following")) {
			button.textContent = "Following";
			button.classList.remove("button--background");
			button.classList.add("button--transparent");
		}

		// Додавання обробника події на клік
		button.addEventListener("click", function (event) {
			// Зупинка прокручування сторінки
			event.preventDefault();

			if (button.classList.contains("button--background")) {
				button.classList.remove("button--background");
				button.classList.add("button--transparent");
				button.textContent = "Following";
			} else {
				button.classList.remove("button--transparent");
				button.classList.add("button--background");
				button.textContent = "Follow";
			}
		});
	});
});

//==================

const titles = document.querySelectorAll('.item-navigation__title');

function handleSpoiler() {
	if (window.innerWidth <= 600) {
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

// Функція для відкриття/закриття списку
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


// Створення спостерігача
const observer = new IntersectionObserver((entries, observer) => {
	entries.forEach((entry, index) => {
		if (entry.isIntersecting) {
			// Додаємо клас visible для плавного появлення кнопок
			entry.target.classList.add('visible');
			entry.target.style.transitionDelay = `${index * 0.2}s`; // Затримка для кожної кнопки
			observer.unobserve(entry.target); // Зупиняємо спостереження за елементом після активації
		}
	});
}, { threshold: 0.5 }); // Спрацьовує, коли хоча б 50% елемента видно

// Спостерігаємо за всіма кнопками
const buttons = document.querySelectorAll('.tabs__button');
buttons.forEach(button => observer.observe(button));
//=====================================


