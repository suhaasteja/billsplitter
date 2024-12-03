document.addEventListener('DOMContentLoaded', () => {
    const addPersonForm = document.getElementById('add-person-form');
    const finalizeButton = document.getElementById('finalize-button');
    const itemsTable = document.getElementById('items-table');

    // Handle adding a new person dynamically
    addPersonForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const personName = addPersonForm.person_name.value.trim();

        if (!personName) {
            alert('Please enter a valid name.');
            return;
        }

        const response = await fetch('/add_person', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: personName }),
        });

        const data = await response.json();
        if (response.ok) {
            //alert(data.message);

            // Dynamically add a column for the new person
            const peopleColumns = document.getElementById('people-columns');
            const rows = itemsTable.querySelectorAll('tbody tr');

            rows.forEach((row) => {
                const newCheckbox = document.createElement('label');
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.classList.add('allocation-checkbox');
                checkbox.dataset.item = row.cells[0].textContent;
                checkbox.dataset.person = personName;

                newCheckbox.appendChild(checkbox);
                newCheckbox.append(personName);
                row.cells[2].appendChild(newCheckbox);
            });
        } else {
            alert(data.error || 'Failed to add person.');
        }
    });

    // Handle finalizing the split
    finalizeButton.addEventListener('click', async () => {
        const allocations = {};

        // Collect allocation data from checkboxes
        document.querySelectorAll('.allocation-checkbox:checked').forEach((checkbox) => {
            const item = checkbox.dataset.item;
            const person = checkbox.dataset.person;

            if (!allocations[item]) {
                allocations[item] = [];
            }
            allocations[item].push(person);
        });

        const response = await fetch('/finalize', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ allocations }),
        });

        if (response.ok) {
            window.location.href = '/summary';
        } else {
            const error = await response.json();
            alert('Error finalizing split: ' + error.error);
        }
    });
});