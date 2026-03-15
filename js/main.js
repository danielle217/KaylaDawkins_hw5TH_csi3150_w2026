//Car inventory grid container
const inventory = document.getElementById('car-inventory');

// Mileage slider and its display label
const mileageValue = document.getElementById('mileage-value');
const mileageDisplay = document.getElementById('mileage');

// Update mileage display when slider value changes
mileageDisplay.addEventListener('input', function() {
    mileageValue.textContent = `${parseInt(mileageDisplay.value).toLocaleString()} miles`;
});

// Toggle each dropdown open/closed when its button is clicked
document.querySelectorAll('.dropbtn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.stopPropagation(); 
        const dropdownContent = this.nextElementSibling;
        const isopen = dropdownContent.classList.contains('open');

        document.querySelectorAll('.dropdown-content').forEach(content => {
            if (content !== dropdownContent) {
                content.classList.remove('open');
            }
        });
        document.querySelectorAll('.dropbtn').forEach(btn => {
            btn.setAttribute('aria-expanded', 'false');
        });

        if (!isopen) {
            dropdownContent.classList.add('open');
            this.setAttribute('aria-expanded', 'true');
        }

    });
});

// Close all dropdowns when clicking outside of them
document.addEventListener('click', function(e) {
    if (!e.target.closest('.dropdown')) {
        document.querySelectorAll('.dropdown-content').forEach(content => {
            content.classList.remove('open');
        });
        document.querySelectorAll('.dropbtn').forEach(btn => {
            btn.setAttribute('aria-expanded', 'false');
        });

    }
});


/** Function to display a list of cars in the inventory grid. 
 * It clears any existing cars and creates a card for each car in the provided array, 
 * showing its details and an image. If no cars match the filter criteria, 
 * it shows a message instead.*/
function displayCars(cars) {
    inventory.innerHTML = ''; //clear existing inventory

    // Show message if no cars match the filter criteria
    if (cars.length === 0) {
        inventory.innerHTML = '<p class="no-results">No cars available.</p>';
        return;
    }

    // Create a card for each car and add it to the inventory
    cars.forEach(car => {
        const card = document.createElement('article');
        card.classList.add('card');

        card.innerHTML = `
            <figure><img src="images/${car.make.toLowerCase()}.jpg" alt="${car.year} ${car.make} ${car.model}"></figure>
            <div class="card-info">
                <h3>${car.year} ${car.make} ${car.model}</h3>
                <p class="price">$${car.price.toLocaleString()}</p>
                <p>Color: ${car.color}</p>
                <p>Mileage: ${car.mileage.toLocaleString()} miles</p>
                <p>Gas Mileage: ${car.gasMileage}</p>
            </div>
        `;
        // Add the card to the inventory grid
        inventory.appendChild(card);
    });

}

/**
 * Function to filter the cars based on user-selected criteria from the form inputs.
 * It retrieves the selected year range, price range, mileage, make, and color from the form,
 * then filters the `usedCars` array accordingly and displays the filtered results.
 */
function filterCars(){
    // Get year range values, defaulting to 2000-2026 if not specified
    const selYearMin = parseInt(document.getElementById('year-min').value) || 2000;
    const selYearMax = parseInt(document.getElementById('year-max').value) || 2026;

    // Get price range values, defaulting to 0-68000 if not specified
    const PriceMin = parseInt(document.getElementById('price-min').value) || 0;
    const PriceMax = parseInt(document.getElementById('price-max').value) || 68000;

    // Get mileage value from the slider
    const MileageMax = parseInt(document.getElementById('mileage').value) || 60000;

    // Get selected make and color values, defaulting to empty string if not specified
    const selMakes = Array.from(document.querySelectorAll('.make-checkbox:checked')).map(cb => cb.value);
    const selColors = Array.from(document.querySelectorAll('.color-checkbox:checked')).map(cb => cb.value);

    const filteredCars = usedCars.filter(car => {
        const matchesYear = (car.year >= selYearMin && car.year <= selYearMax);
        const matchesMake = selMakes.length === 0 || selMakes.includes(car.make);
        const matchesColor = selColors.length === 0 || selColors.includes(car.color);
        const matchesPrice = car.price >= PriceMin && car.price <= PriceMax;
        const matchesMileage = car.mileage <= MileageMax;

        return matchesYear && matchesMake && matchesColor && matchesPrice && matchesMileage;
    });

    displayCars(filteredCars);
}

// Add event listener to the filter form to trigger filtering when submitted
document.getElementById('filter-form').addEventListener('submit', function(e) {
        e.preventDefault();
        filterCars();
    });

// Add event listener to the filter form to reset filters and display all cars when reset
document.getElementById('filter-form').addEventListener('reset', function(e) {
    mileageValue.textContent = '60,000 miles';
    document.querySelectorAll('.make-checkbox, .color-checkbox').forEach(cb => cb.checked = false);
    displayCars(usedCars);
});

displayCars(usedCars);