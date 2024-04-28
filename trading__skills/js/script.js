"use strict"

document.addEventListener("DOMContentLoaded", function () {
	const heroText = document.querySelector(".hero__title");
	if (heroText) {
		heroText.classList.add("show");
	} else {
		console.error("Element with class 'hero__title' not found.");
	}
});

//===============================================

document.addEventListener('DOMContentLoaded', function () {
	const items = document.querySelectorAll('.item-info');

	function fadeInElements() {
		items.forEach(function (item) {
			if (isPartiallyInViewport(item)) {
				item.classList.add('active');
			} else {
				item.classList.remove('active');
			}
		});
	}

	function isPartiallyInViewport(el) {
		let rect = el.getBoundingClientRect();
		let windowHeight = (window.innerHeight || document.documentElement.clientHeight);
		return (
			rect.top < windowHeight &&
			rect.bottom >= 0
		);
	}

	fadeInElements();

	window.addEventListener('scroll', fadeInElements);
});

//===================================================

document.addEventListener("DOMContentLoaded", function () {
	let observer = new IntersectionObserver(function (entries) {
		entries.forEach(function (entry) {
			if (entry.isIntersecting) {
				entry.target.classList.add('show');
			} else {
				entry.target.classList.remove('show');
			}
		});
	}, { threshold: 0 });

	const infoItems = document.querySelectorAll('.info-contact__item');
	infoItems.forEach(function (item) {
		observer.observe(item);
	});
});

//===========================

document.addEventListener("DOMContentLoaded", function () {
	const closeButton = document.querySelector(".terms__button");

	if (closeButton) {
		closeButton.addEventListener("click", function () {
			window.close();

			window.location.href = "index.html#footer";
		});
	}
});

