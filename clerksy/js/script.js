"use strict"


document.addEventListener("click", documentActions);

function documentActions(e) {
	const targetElement = e.target;

	if (targetElement.closest('.icon-menu')) {
		document.body.classList.toggle('menu-open');
	}
}

const icons = document.querySelectorAll('.icon-menu');
icons.forEach(icon => {
	icon.addEventListener('click', (event) => {
		icon.classList.toggle("active");
	});
});

// let arrow = document.getElementById("arrow-1");

// console.log(arrow.getTotalLength());

window.addEventListener('scroll', () => {
	const header = document.querySelector('header');
	if (window.scrollY > 50) { // Кількість пікселів, після яких змінюється фон
		header.classList.add('scrolled');
	} else {
		header.classList.remove('scrolled');
	}
});


const items = document.querySelectorAll('.about__image, .about__content, .about__content--left, .quality__item, .employee__wrap img, .clerksy__item, .item-step, .steps__arrow, .booking, .booking__content, .steps__title, .steps__text,.clerksy__text, .clerksy__title, .employee__text, .employee__title, .quality__title, .partner__title');

const observer = new IntersectionObserver((entries) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			entry.target.classList.add('visible');
		}
	});
}, { threshold: 0.2 });

items.forEach(item => {
	observer.observe(item);
});

document.addEventListener("DOMContentLoaded", () => {
	const images = document.querySelectorAll('.partner__wrapper img');

	const observerOptions = {
		root: null,
		rootMargin: '0px',
		threshold: 0.5 // Відсоток видимості елемента для активації
	};

	const observerCallback = (entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add('visible');
			} else {
				entry.target.classList.remove('visible');
			}
		});
	};

	const observer = new IntersectionObserver(observerCallback, observerOptions);

	images.forEach((image) => {
		observer.observe(image);
	});
});
document.addEventListener('DOMContentLoaded', () => {
	const svg = document.querySelector('.item-step--circle svg');

	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				svg.classList.add('animate');
				observer.unobserve(entry.target); // Прибираємо спостереження після активації анімації
			}
		});
	}, { threshold: 0.1 }); // Може змінюватися в залежності від ваших потреб

	observer.observe(svg);
});



