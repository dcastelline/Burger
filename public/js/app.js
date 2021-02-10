document.addEventListener('DOMContentLoaded', (event) => {
    if (event) {
        console.info('DOM loaded');
    }


    const addBurger = document.getElementById('add-form');

    if (addBurger) {
        addBurger.addEventListener('submit', (e) => {
            e.preventDefault();

            const newBurger = {
                burger_name: document.getElementById('add-burger').value.trim()
            };

            fetch('/api/burgers', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newBurger),
            }).then(() => {
                document.getElementById('add-burger').value = '';
                console.log('Added a burger');
                location.reload();
            })
        })
    }

    const devourBtns = document.querySelectorAll('.devour-burger');

    devourBtns.forEach((button) => {
        button.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');

            fetch(`/api/burgers/${id}`, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            }).then((response) => {
                if (response.ok) {
                    console.log(`Devored burger ${id}`);
                    location.reload();
                }
                else {
                    alert('Error');
                }
            })
        })
    })
});