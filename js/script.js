document.addEventListener('DOMContentLoaded', (event) => {
    const init = () => {
        const $divs = document.querySelectorAll('div');

        for (let i = 0; i < $divs.length; i++) {
            const $div = $divs[i];

            $div.addEventListener('click', handleClickItem);

            // Check local storage for saved state and apply it
            if (localStorage.getItem(`div-${i}`) === 'selected') {
                $div.classList.add('selected');
            }
        }
    }

    const handleClickItem = e => {
        const $div = e.currentTarget;
        $div.classList.toggle('selected');

        // Save the state to local storage
        const index = Array.from($div.parentNode.children).indexOf($div);
        if ($div.classList.contains('selected')) {
            localStorage.setItem(`div-${index}`, 'selected');
        } else {
            localStorage.removeItem(`div-${index}`);
        }
    }

    init();
});