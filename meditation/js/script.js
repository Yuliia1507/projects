"use strict"
document.addEventListener("click", documentActions);

function documentActions(e) {
	const targetElement = e.target;

	// Toggle menu open/close on burger icon click
	if (targetElement.closest('.icon-menu')) {
		document.body.classList.toggle('menu-open');
		document.querySelector('.menu__body').classList.toggle('open');
		document.querySelector('.icon-menu').classList.toggle('open'); // Toggle icon state
	}
}

let wrapperMenu = document.querySelector('.icon-menu');

// Close menu and reset icon state when menu links are clicked
document.querySelectorAll('.menu__link').forEach(link => {
	link.addEventListener('click', function () {
		// Remove 'active' class from previously active link and add to the clicked link
		document.querySelector('.menu__link.active').classList.remove('active');
		this.classList.add('active');

		// Close the menu
		document.querySelector('.menu__body').classList.remove('open');
		document.body.classList.remove('menu-open');
		document.querySelector('.icon-menu').classList.remove('open'); // Reset icon state
	});
});

//==================================

document.addEventListener('DOMContentLoaded', () => {
	const animation = document.querySelector('.animation');

	function updateAnimationPosition() {
		const windowWidth = window.innerWidth;
		const activeLink = document.querySelector('.menu__link.active');

		if (windowWidth >= 800) {
			if (activeLink) {
				const rect = activeLink.getBoundingClientRect();
				const headerRect = document.querySelector('header').getBoundingClientRect();

				// Використовуємо requestAnimationFrame для плавного оновлення позиції
				requestAnimationFrame(() => {
					animation.style.left = `${rect.left - headerRect.left - 15}px`;
					animation.style.width = `${rect.width + 30}px`;
					animation.classList.add('show');
				});
			} else {
				animation.classList.remove('show');
			}
		} else {
			animation.classList.remove('show');
		}
	}

	// Оновлюємо позицію після завантаження всіх ресурсів
	window.addEventListener('load', () => {
		setTimeout(updateAnimationPosition, 200); // Збільшена затримка для повного завантаження стилів та ресурсів
	});

	// Оновлюємо позицію при зміні розміру вікна
	window.addEventListener('resize', () => {
		requestAnimationFrame(updateAnimationPosition);
	});

	// Динамічне перемикання активного пункту меню
	document.querySelectorAll('.menu__link').forEach(link => {
		link.addEventListener('click', () => {
			document.querySelectorAll('.menu__link').forEach(l => l.classList.remove('active'));
			link.classList.add('active');

			// Використовуємо тайм-аут для коректного оновлення анімації
			setTimeout(updateAnimationPosition, 50);
		});
	});
});



const svgElement = document.querySelector('.hero');
const circles = document.querySelectorAll('.movable-circle');

svgElement.addEventListener('mousemove', (e) => {
	circles.forEach((circle, index) => {
		const rect = svgElement.getBoundingClientRect();
		const mouseX = e.clientX - rect.left;
		const mouseY = e.clientY - rect.top;

		// Обчислюємо відстань від центра кожного кружечка до позиції миші
		const dx = (index % 2 === 0 ? 1 : -1) * (mouseX / 50);
		const dy = (index % 2 === 0 ? 1 : -1) * (mouseY / 50);

		// Додаємо зсуви до позицій кружечків
		circle.style.transform = `translate(${dx}px, ${dy}px)`;
	});
});

svgElement.addEventListener('mouseleave', () => {
	// Відновлюємо положення кружечків при виході миші зі SVG
	circles.forEach((circle) => {
		circle.style.transform = `translate(0, 0)`;
	});
});

// Масив для зберігання всіх елементів audio
const audioPlayers = document.querySelectorAll('audio');

function toggleAudio(audioId) {
	// Зупинити всі аудіо
	audioPlayers.forEach(audio => {
		if (audio.id !== audioId) {
			audio.pause();
			audio.currentTime = 0; // Скинути час відтворення
			// Змінити іконки для зупиненого аудіо
			const btn = document.querySelector(`button[onclick="toggleAudio('${audio.id}')"]`);
			btn.classList.remove('active'); // Видалити активний клас
		}
	});

	// Знайти та керувати обраним аудіо
	const audioPlayer = document.getElementById(audioId);
	const btn = document.querySelector(`button[onclick="toggleAudio('${audioId}')"]`);
	if (audioPlayer.paused) {
		audioPlayer.play();
		btn.classList.add('active'); // Додати активний клас
	} else {
		audioPlayer.pause();
		btn.classList.remove('active'); // Видалити активний клас
	}
}

document.addEventListener("DOMContentLoaded", function () {
	// Перевіряємо наявність елементів перед додаванням класу
	const heroTitle = document.querySelector('.hero__title');
	const heroText = document.querySelector('.hero__text');
	const heroBtn = document.querySelector('.hero__btn');

	if (heroTitle && heroText && heroBtn) {
		// Додаємо клас для кожного елемента окремо, якщо вони існують
		heroTitle.classList.add('visible');
		heroText.classList.add('visible');
		heroBtn.classList.add('visible');
	}
});

const items = document.querySelectorAll('.meditation__item,.title,.practice__text, .sound__text,.advantages__text, .transformation__text,.practice__item,.practice__image,.hero__image, .transformation__image--right, .transformation__image--left, .item-transformation--left, .item-transformation--right,.sound__content, .sound__image, .advantages__left, .advantages__right');

const observer = new IntersectionObserver((entries) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			entry.target.classList.add('visible');
		}
	});
}, { threshold: 0.1 });

items.forEach(item => {
	observer.observe(item);
});

let lastScrollTop = 0;
const header = document.querySelector('.header');
let ticking = false;

window.addEventListener('scroll', function () {
	const scrollTop = window.scrollY || document.documentElement.scrollTop;

	if (!ticking) {
		window.requestAnimationFrame(() => {
			if (scrollTop > lastScrollTop) {
				// Скролимо вниз, додаємо клас hide
				header.classList.add('hide');
			} else {
				// Скролимо вгору, видаляємо клас hide
				header.classList.remove('hide');
			}

			lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Звертаємо увагу на граничні значення
			ticking = false;
		});

		ticking = true;
	}
});
