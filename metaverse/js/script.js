"use strict"

window.addEventListener('load', function () {
	const heroTitle = document.querySelector('.hero__title');
	heroTitle.classList.add('loaded');
});

document.addEventListener("DOMContentLoaded", function () {
	const heroImage = document.querySelector(".hero__image");
	heroImage.style.opacity = 1; // Change opacity to 1 to trigger the fade-in effect
});

document.addEventListener("click", documentActions);

function documentActions(e) {
	const targetElement = e.target;

	if (targetElement.closest('.icon-menu')) {
		document.body.classList.toggle('menu-open');
	}

}

function updateCounter(counterElement, startValue, endValue) {
	if (counterElement) {
		counterElement.textContent = startValue + 'K+';
	}

	let intervalId = setInterval(function () {
		startValue++;
		if (startValue > endValue) {
			clearInterval(intervalId); // Stop the counter when it reaches the target value
		} else {
			counterElement.textContent = startValue + 'K+';
		}
	}, 100);
}

document.addEventListener('DOMContentLoaded', function () {
	const counters = document.querySelectorAll('.item-counter__number');
	counters.forEach(function (counter) {
		let startValue = parseInt(counter.getAttribute('data-start'));
		let endValue = parseInt(counter.getAttribute('data-end'));
		updateCounter(counter, startValue, endValue);
	});
});


document.addEventListener("DOMContentLoaded", function () {
	const itemsToShow = 3;
	const itemMetawork = document.querySelectorAll(".item-metawork");
	const showMoreBtn = document.querySelector(".show-more");

	let itemsShown = itemsToShow; // Початкова кількість показаних елементів

	function toggleItems() {
		if (window.innerWidth <= 585) {
			itemMetawork.forEach((item, index) => {
				if (index < itemsShown) {
					item.style.display = "block";
				} else {
					item.style.display = "none";
				}
			});
		} else {
			itemMetawork.forEach(item => {
				item.style.display = "block";
			});
		}

		// Перевіряємо, чи всі елементи вже видимі, і змінюємо текст кнопки відповідно
		if (itemsShown === itemMetawork.length) {
			showMoreBtn.textContent = "Show less";
		} else {
			showMoreBtn.textContent = "Show more";
		}
	}

	toggleItems(); // Викликаємо перевірку вікна при завантаженні сторінки

	showMoreBtn.addEventListener("click", function () {
		if (itemsShown === itemMetawork.length) {
			// Якщо всі елементи вже видимі, ховаємо їх по одному, починаючи з останнього
			itemsShown = itemsToShow;
			toggleItems();
		} else {
			// Якщо ще є елементи, які не відображені, показуємо наступний елемент
			itemsShown++;
			toggleItems();
		}
	});

	window.addEventListener("resize", toggleItems); // Викликаємо перевірку вікна при зміні розміру вікна
});

const swiper = new Swiper('.swiper-container', {
	slidesPerView: '1.2',
	loop: true,
	spaceBetween: 54,
	breakpoints: {
		320: {
			spaceBetween: 15
		},
		480: {
			spaceBetween: 15
		},
		650: {
			spaceBetween: 20
		},
		991: {
			spaceBetween: 30
		}
	}
});


function playVideo(video) {
	let overlay = video.nextElementSibling;
	let bottomOverlay = overlay.nextElementSibling;

	if (video.paused) {
		// Play video only if user interacted with the document
		video.play().catch(error => {
			console.error('Play video failed:', error);
		});
		overlay.style.display = 'none';
		bottomOverlay.style.display = 'none';
	} else {
		video.pause();
		overlay.style.display = 'flex';
		bottomOverlay.style.display = 'block';
	}

	// Add logic to show overlay and bottom overlay when video is paused
	video.addEventListener('pause', function () {
		overlay.style.display = 'flex';
		bottomOverlay.style.display = 'block';
	});
}

document.addEventListener('click', function (event) {
	if (!isTouchDevice() && event.target.classList.contains('play-button')) {
		event.preventDefault(); // Відмінити подію кліка за замовчуванням
		let video = event.target.parentNode.previousElementSibling;
		playVideo(video);
	}
});

document.addEventListener('touchend', function (event) {
	if (event.target.tagName === 'VIDEO') {
		event.stopPropagation(); // Зупинити подальше поширення події торкання
		let video = event.target;
		playVideo(video);
	} else if (event.target.classList.contains('play-button')) {
		event.preventDefault(); // Відмінити стандартну дію браузера
		let video = event.target.parentNode.previousElementSibling;
		playVideo(video);
	}
});

function isTouchDevice() {
	return 'ontouchstart' in window || navigator.maxTouchPoints;
}







