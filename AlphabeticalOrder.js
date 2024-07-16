document.addEventListener('DOMContentLoaded', function() {
    const list = document.querySelector('#sortableList'); // Select the ul element by ID
    const items = Array.from(list.getElementsByTagName('li'));

    items.sort((a, b) => {
        const textA = a.querySelector('a').textContent.trim(); // Get text content of <a> inside <li>
        const textB = b.querySelector('a').textContent.trim(); // Get text content of <a> inside <li>

        // Check if both texts are in Greek or not
        const isAGreek = isGreek(textA);
        const isBGreek = isGreek(textB);

        if (isAGreek && isBGreek) {
            return textA.localeCompare(textB, 'el', { sensitivity: 'base' });
        } else if (isAGreek && !isBGreek) {
            return -1; // A should come before B (Greek before English)
        } else if (!isAGreek && isBGreek) {
            return 1; // B should come before A (Greek before English)
        } else {
            // Both are in English or other non-Greek, sort alphabetically
            return textA.localeCompare(textB, 'en', { sensitivity: 'base' });
        }
    });

    // Clear existing list
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }

    // Append sorted items back to the list
    items.forEach(item => list.appendChild(item));
});

// Function to check if text contains Greek characters
function isGreek(text) {
    const greekPattern = /[\u0370-\u03FF\u1F00-\u1FFF]/;
    return greekPattern.test(text);
}