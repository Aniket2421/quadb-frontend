document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('https://quadb-backend-mjw4.onrender.com/data');
    const data = await response.json();
    console.log(data);

    const tableBody = document.getElementById('crypto-table');
    const cryptoSelect = document.getElementById('crypto-select');
    const dropdowns = document.querySelectorAll('.dropdown');
    const timerElement = document.getElementById('timer');
    const checkbox = document.getElementById('themeToggle');

    function renderTable(filteredData) {
        tableBody.innerHTML = '';
        filteredData.forEach((crypto, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${crypto.name}</td>
                <td>₹${crypto.last}</td>
                <td>₹${crypto.buy} / ₹${crypto.sell}</td>
                <td>${crypto.difference}%</td>
                <td>₹${crypto.savings}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    renderTable(data);

    cryptoSelect.addEventListener('click', (event) => {
        if (event.target.tagName === 'A') {
            const selectedCrypto = event.target.getAttribute('data-crypto');
            if (selectedCrypto === 'all') {
                renderTable(data);
            } else {
                const filteredData = data.filter(crypto => crypto.name === selectedCrypto);
                renderTable(filteredData);
            }
            cryptoSelect.previousElementSibling.textContent = selectedCrypto;
        }
    });

    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function () {
            this.classList.toggle('active');
        });
    });

    window.addEventListener('click', function (e) {
        if (!e.target.matches('.dropbtn')) {
            dropdowns.forEach(dropdown => {
                if (dropdown.classList.contains('active')) {
                    dropdown.classList.remove('active');
                }
            });
        }
    });

    function startCountdown(duration, display) {
        var timer = duration, minutes, seconds;
        var countdownInterval = setInterval(function () {
            seconds = parseInt(timer % 60, 10);

            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.textContent = seconds;

            if (--timer <= 2) {
                clearInterval(countdownInterval);
            }

            if (timer <= 3) {
                clearInterval(countdownInterval);
                startCountdown(60, display);
            }
        }, 1000);
    }

    startCountdown(60, timerElement);

    checkbox.addEventListener('change', function () {
        if (this.checked) {
            document.body.classList.add('white-theme');
        } else {
            document.body.classList.remove('white-theme');
        }
    });
});
