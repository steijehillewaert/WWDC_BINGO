document.addEventListener('DOMContentLoaded', (event) => {
    const init = () => {
        const $rows = document.querySelectorAll('.row');

        $rows.forEach(($row, rowIndex) => {
            const $divs = $row.querySelectorAll('div');
            $divs.forEach(($div, divIndex) => {
                $div.addEventListener('click', handleClickItem);

                // Check local storage for saved state and apply it
                if (localStorage.getItem(`div-${rowIndex}-${divIndex}`) === 'selected') {
                    $div.classList.add('selected');
                }
            });
        });

        checkAllRows();
        checkAllColumns();
    }

    const handleClickItem = e => {
        const $div = e.currentTarget;
        $div.classList.toggle('selected');

        const $row = $div.parentNode;
        const rowIndex = Array.from($row.parentNode.children).indexOf($row);
        const divIndex = Array.from($row.children).indexOf($div);

        // Save the state to local storage
        if ($div.classList.contains('selected')) {
            localStorage.setItem(`div-${rowIndex}-${divIndex}`, 'selected');
        } else {
            localStorage.removeItem(`div-${rowIndex}-${divIndex}`);
        }

        checkRow($row);
        checkAllColumns();
    }

    const checkRow = ($row) => {
        const $divs = $row.querySelectorAll('div');
        const allSelected = Array.from($divs).every($div => $div.classList.contains('selected'));
        if (allSelected) {
            $divs.forEach($div => $div.classList.add('full'));
            showPopup();
        } else {
            $divs.forEach($div => $div.classList.remove('full'));
        }
    }

    const checkAllRows = () => {
        const $rows = document.querySelectorAll('.row');
        $rows.forEach($row => checkRow($row));
    }

    const checkAllColumns = () => {
        const $rows = document.querySelectorAll('.row');
        const columnCount = $rows[0].children.length;

        for (let colIndex = 0; colIndex < columnCount; colIndex++) {
            const $columnDivs = Array.from($rows).map($row => $row.children[colIndex]);
            const allSelected = $columnDivs.every($div => $div.classList.contains('selected'));
            if (allSelected) {
                $columnDivs.forEach($div => $div.classList.add('full'));
                showPopup();
            } else {
                $columnDivs.forEach($div => $div.classList.remove('full'));
            }
        }
    }

    const showPopup = () => {
        const $popup = document.getElementById('popup');
        $popup.classList.add('active');
        setTimeout(() => {
            $popup.classList.remove('active');
        }, 1000); // Change timeout to 2 seconds
    }

    init();
});