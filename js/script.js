document.addEventListener('DOMContentLoaded', (event) => {
    const init = () => {
        loadItems();
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
        checkDiagonals();
    }

    const loadItems = () => {
        const savedItems = JSON.parse(localStorage.getItem('bingoItems'));
        if (savedItems) {
            const $rows = document.querySelectorAll('.row');
            $rows.forEach(($row, rowIndex) => {
                const $divs = $row.querySelectorAll('div');
                $divs.forEach(($div, divIndex) => {
                    const p = $div.querySelector('p');
                    if (savedItems[rowIndex * 4 + divIndex]) {
                        p.textContent = savedItems[rowIndex * 4 + divIndex];
                    }
                });
            });
        }
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
        checkDiagonals();
    }

    const checkRow = ($row) => {
        const $divs = $row.querySelectorAll('div');
        const allSelected = Array.from($divs).every($div => $div.classList.contains('selected'));
        if (allSelected) {
            showPopup('row');
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
                showPopup('column');
            }
        }
    }

    const checkDiagonals = () => {
        const $rows = document.querySelectorAll('.row');
        const rowCount = $rows.length;
        const colCount = $rows[0].children.length;

        let leftToRightDiagonal = [];
        let rightToLeftDiagonal = [];

        for (let i = 0; i < rowCount; i++) {
            leftToRightDiagonal.push($rows[i].children[i]);
            rightToLeftDiagonal.push($rows[i].children[colCount - i - 1]);
        }

        const leftToRightAllSelected = leftToRightDiagonal.every($div => $div.classList.contains('selected'));
        const rightToLeftAllSelected = rightToLeftDiagonal.every($div => $div.classList.contains('selected'));

        if (leftToRightAllSelected) {
            showPopup('left-to-right diagonal');
        }

        if (rightToLeftAllSelected) {
            showPopup('right-to-left diagonal');
        }
    }

    const showPopup = (type) => {
        const $popup = document.getElementById('popup');
        $popup.innerHTML = `<p>BINGO! You have a full ${type}!</p>`;
        $popup.classList.add('active');
        setTimeout(() => {
            $popup.classList.remove('active');
        }, 2000); // Popup duration is 2 seconds
    }

    init();
});