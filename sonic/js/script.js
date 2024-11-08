"use strict"

document.addEventListener("click", documentActions);

function documentActions(e) {
	const targetElement = e.target;

	if (targetElement.closest('.icon-menu')) {
		document.body.classList.toggle('menu-open');
	}
}

let wrapperMenu = document.querySelector('.icon-menu');

wrapperMenu.addEventListener('click', function () {
	wrapperMenu.classList.toggle('open');
})

// window.addEventListener('scroll', function () {
// 	let header = document.querySelector('.header');
// 	if (window.scrollY > 0) {
// 		header.classList.add('scrolled');
// 	} else {
// 		header.classList.remove('scrolled');
// 	}
// });




const heroImage = document.querySelector('.hero__image');

// Додаємо клас "show", щоб активувати анімацію після завантаження сторінки
window.onload = function () {
	heroImage.classList.add('show');
};


document.addEventListener("DOMContentLoaded", function () {
	var items = document.querySelectorAll('.hero__item, .hero__title, .hero__text, .hero__buttons-wrap, .hero__link');

	function revealItems() {
		items.forEach(function (item, index) {
			setTimeout(function () {
				item.classList.add('show');
			}, index * 500); // Затримка: 500 мілісекунд між кожним елементом
		});
	}

	revealItems();
});


document.addEventListener("DOMContentLoaded", function () {
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
					let initialParent = document.querySelector(".header__container");
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

//=======================================

const titleElement = document.querySelector(".ctaction__title");
const text = titleElement.textContent.trim(); // Retrieve text from the h3 element
titleElement.textContent = ''; // Clear the text content

const speed = 100; // typing speed in milliseconds
let i = 0;

function typeWriter() {
	if (i < text.length) {
		titleElement.textContent += text.charAt(i);
		i++;
		setTimeout(typeWriter, speed);
	}
}

// Define options for the Intersection Observer
const options = {
	threshold: 0.5 // Trigger when 50% of the element is visible
};

// Create an Intersection Observer instance
const observer = new IntersectionObserver((entries, observer) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			typeWriter(); // Start typing animation when element is visible
			observer.unobserve(entry.target); // Stop observing once animation starts
		}
	});
}, options);

// Observe the title element
observer.observe(titleElement);




document.addEventListener('DOMContentLoaded', function () {
	const countryCodeInput = document.getElementById('country-code');
	const phoneNumberInput = document.getElementById('phone-number');

	console.log('Country code element:', countryCodeInput);
	console.log('Phone number element:', phoneNumberInput);

	if (countryCodeInput && phoneNumberInput) {
		countryCodeInput.addEventListener('change', function () {
			phoneNumberInput.value = this.value + ' ';
			phoneNumberInput.focus();
		});
	}
});

