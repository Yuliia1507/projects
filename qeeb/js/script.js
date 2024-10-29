"use strict"

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

function startCounters() {
	const counters = document.querySelectorAll('.item-counter__number');

	counters.forEach(function (counter) {
		let start = parseInt(counter.getAttribute('data-start'));
		let end = parseInt(counter.getAttribute('data-end'));
		let duration = 2000; // Adjust as needed

		let range = end - start;
		let current = start;
		let increment = end > start ? 1 : -1;
		let stepTime = Math.abs(Math.floor(duration / range));

		function updateCounter() {
			current += increment;
			counter.textContent = current + 'K';
			if (current !== end) {
				setTimeout(updateCounter, stepTime);
			}
		}

		updateCounter();
	});
}

startCounters();

document.addEventListener("DOMContentLoaded", function () {
	const btn7Days = document.getElementById("btn-7days");
	const btn30Days = document.getElementById("btn-30days");
	const collection7Days = document.getElementById("collection-7days");
	const collection30Days = document.getElementById("collection-30days");
	const showMoreBtn = document.querySelector(".collection__button");

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
		const items = activeCollection.querySelectorAll(".collection__item");

		if (window.innerWidth <= 767) {
			items.forEach((item, index) => {
				item.style.display = index < itemsShown ? "flex" : "none";
			});
		} else {
			items.forEach(item => {
				item.style.display = "flex";
			});
		}

		// Update button text based on the number of visible items
		showMoreBtn.textContent = itemsShown >= items.length ? "Hide" : "See All Collection";
	}

	// Initial call to set up the visibility of the active collection
	toggleItems();

	showMoreBtn.addEventListener("click", function () {
		const items = activeCollection.querySelectorAll(".collection__item");

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



const swiper = new Swiper(".category__swiper", {
	loop: true,
	autoplay: true,
	speed: 500, // Швидкість анімації у мілісекундах

	spaceBetween: 30,

	pagination: {
		el: '.swiper-pagination',
		clickable: true,
		dynamicBullets: true,

	},

	navigation: {
		nextEl: ".category__button--next",
		prevEl: ".category__button--prev",
	},

	breakpoints: {
		320: {
			slidesPerView: 1.2,
		},
		450: {
			slidesPerView: 2,
		},
		600: {
			slidesPerView: 3,
		},
		800: {
			slidesPerView: 4,
		},
		1100: {
			slidesPerView: 5,
		},
		1400: {
			slidesPerView: 6,
		},
	},
});

const trandingSwiper = new Swiper(".tranding__swiper", {
	loop: true,
	autoplay:true,
	speed: 500, // Швидкість анімації у мілісекундах

	spaceBetween: 30,

	pagination: {
		el: '.swiper-pagination',
		clickable: true,
		dynamicBullets: true,

	},

	navigation: {
		nextEl: ".tranding__button--next",
		prevEl: ".tranding__button--prev",
	},

	breakpoints: {
		320: {
			slidesPerView: 1,
		},
		550: {
			slidesPerView: 2,
		},
		900: {
			slidesPerView: 3,
		},
		1400: {
			slidesPerView: 4,
		},
	},
});


document.addEventListener("DOMContentLoaded", function () {
	function moveElements() {
		let screenWidth = window.innerWidth;
		let elementsToMove = document.querySelectorAll("[data-da]");

		elementsToMove.forEach(function (element) {
			var data = element.getAttribute("data-da").split(",");
			if (data.length === 3) {
				let order = parseInt(data[1].trim());
				let requiredScreenWidth = parseInt(data[2].trim());
				let initialParentSelector = element.closest('[data-da-parent]');
				let initialParent = initialParentSelector ? initialParentSelector : element.parentElement;

				if (screenWidth <= requiredScreenWidth && !element.classList.contains("moved")) {
					let destinationSelector = data[0].trim();
					let destination = document.querySelector(destinationSelector);

					if (!destination) return;

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
					element.dataset.initialParent = initialParentSelector ? initialParentSelector.getAttribute('data-da-parent') : null;
				} else if (screenWidth > requiredScreenWidth && element.classList.contains("moved")) {
					let initialParentSelector = element.dataset.initialParent;
					let initialParent = document.querySelector('[data-da-parent="' + initialParentSelector + '"]');

					if (initialParent && initialParent instanceof HTMLElement) {
						initialParent.appendChild(element);
						element.classList.remove("moved");
						delete element.dataset.initialParent;
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


