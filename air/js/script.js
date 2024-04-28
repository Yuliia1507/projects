"use strict"

document.addEventListener("click", documentActions);

function documentActions(e) {
	const targetElement = e.target;

	if (targetElement.closest('.icon-menu')) {
		document.body.classList.toggle('menu-open');
	}
}

window.addEventListener('scroll', function () {
	let header = document.querySelector('.header');
	if (window.scrollY > 0) {
		header.classList.add('scrolled');
	} else {
		header.classList.remove('scrolled');
	}
});


document.addEventListener("DOMContentLoaded", function () {
	function moveElements() {
		let screenWidth = window.innerWidth;
		let elementsToMove = document.querySelectorAll("[data-da]");

		elementsToMove.forEach(function (element) {
			var data = element.getAttribute("data-da").split(",");
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
						let previousElement = destination.children[order - 2];
						if (previousElement) {
							destination.insertBefore(element, previousElement.nextSibling);
						} else {
							destination.appendChild(element);
						}
					}
					element.classList.add("moved");
				} else if (screenWidth > requiredScreenWidth && element.classList.contains("moved")) {
					let initialParent = document.querySelector(destinationSelector);
					if (initialParent) {
						let headerActions = document.querySelector(".header__actions.action-header");
						headerActions.appendChild(element);
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





document.addEventListener("DOMContentLoaded", function () {
	const itemsToShow = 1;
	const itemLocation = document.querySelectorAll(".item-charters");
	const showMoreBtn = document.querySelector(".more");

	let itemsShown = itemsToShow; // Початкова кількість показаних елементів

	function toggleItems() {
		if (window.innerWidth <= 480) {
			itemLocation.forEach((item, index) => {
				if (index < itemsShown) {
					item.style.display = "block";
				} else {
					item.style.display = "none";
				}
			});
		} else {
			itemLocation.forEach(item => {
				item.style.display = "block";
			});
		}

		// Перевіряємо, чи всі елементи вже видимі, і змінюємо текст кнопки відповідно
		if (itemsShown === itemLocation.length) {
			showMoreBtn.textContent = "Less";
		} else {
			showMoreBtn.textContent = "More";
		}
	}

	toggleItems(); // Викликаємо перевірку вікна при завантаженні сторінки

	showMoreBtn.addEventListener("click", function () {
		if (itemsShown === itemLocation.length) {
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



document.addEventListener("DOMContentLoaded", function () {
	// Define available countries
	const availableCountries = [
		"MIA",
		"Canada",
		"LAX",
		"Germany",
		"France",
		"Italy",
		"Ukraine"
		// Add more countries as needed
	];

	// Populate select dropdowns with available countries
	const selectFrom = document.getElementById("from");
	const selectTo = document.getElementById("to");

	availableCountries.forEach(function (country) {
		const optionFrom = document.createElement("option");
		optionFrom.value = country;
		optionFrom.textContent = country;

		const optionTo = document.createElement("option");
		optionTo.value = country;
		optionTo.textContent = country;

		selectFrom.appendChild(optionFrom);
		selectTo.appendChild(optionTo);
	});
});


document.addEventListener("DOMContentLoaded", function () {
	let currentDate = new Date();
	let daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

	// Function to format date as "Day Mon dd"
	function formatDate(date) {
		let dayOfWeek = daysOfWeek[date.getDay()];
		let month = months[date.getMonth()];
		let day = date.getDate();
		return dayOfWeek + ' ' + month + ' ' + (day < 10 ? '0' + day : day);
	}

	// Function to update dates in dropdown
	function updateDates(selectElement, startDate, numDays) {
		selectElement.innerHTML = "";

		for (let i = 0; i < numDays; i++) {
			let date = new Date(startDate);
			date.setDate(startDate.getDate() + i);

			let option = document.createElement("option");
			option.value = formatDate(date);
			option.textContent = formatDate(date);
			selectElement.appendChild(option);
		}
	}

	// Update dates initially for departure and return
	updateDates(document.getElementById("departureDate"), currentDate, 20); 
	updateDates(document.getElementById("returnDate"), currentDate, 20); 

	// Button event listeners for departure
	document.getElementById("prevDepartureButton").addEventListener("click", function () {
		currentDate.setDate(currentDate.getDate() - 1);
		updateDates(document.getElementById("departureDate"), currentDate, 20); 
	});

	document.getElementById("nextDepartureButton").addEventListener("click", function () {
		currentDate.setDate(currentDate.getDate() + 1);
		updateDates(document.getElementById("departureDate"), currentDate, 20); 
	});

	// Button event listeners for return
	document.getElementById("prevReturnButton").addEventListener("click", function () {
		currentDate.setDate(currentDate.getDate() - 1);
		updateDates(document.getElementById("returnDate"), currentDate, 20); 
	});

	document.getElementById("nextReturnButton").addEventListener("click", function () {
		currentDate.setDate(currentDate.getDate() + 1);
		updateDates(document.getElementById("returnDate"), currentDate, 20); // Змінено на 20 днів
	});
});


let airportMappings = {
	"Canada": "Toronto International Airport",
	"Germany": "Frankfurt, Hesse",
	"France": "Paris Beauvais Airport",
	"Italy": "Venice Marco Polo Airport",
	"Ukraine": "Boryspil International Airport",
	"MIA": "Miami Intl, Miami",
	"LAX": "Los Angeles Intl Arpt, Los Angeles",
};

function updateAirport(elementId) {
	let selectElement = document.getElementById(elementId);
	let airportSpan = document.getElementById(elementId + 'Airport');
	let selectedOption = selectElement.options[selectElement.selectedIndex];
	let airportCode = selectedOption.value;
	airportSpan.innerText = airportMappings[airportCode];
}

function swapOptions() {
	let fromSelect = document.getElementById('from');
	let toSelect = document.getElementById('to');

	let tempValue = fromSelect.value;
	fromSelect.value = toSelect.value;
	toSelect.value = tempValue;

	updateAirport('from');
	updateAirport('to');
}

updateAirport('from');
updateAirport('to');

// Показати або приховати кнопку при прокрутці
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		document.getElementById("scrollToTopBtn").style.display = "block";
	} else {
		document.getElementById("scrollToTopBtn").style.display = "none";
	}
}

document.getElementById("scrollToTopBtn").onclick = function () { topFunction() };

function topFunction() {
	window.scrollTo({ top: 0, behavior: 'smooth' });

}
