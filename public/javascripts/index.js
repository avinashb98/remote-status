/* eslint-disable */

function reflectStatus(userId, status) {
    const userCard = document.getElementById(userId);
    userCard.className = `status ${status.toLowerCase()}`;
}

function updateStatus(userId, status) {
    const data = { userId, status }
    fetch('/user', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        reflectStatus(userId, status);
    });
}