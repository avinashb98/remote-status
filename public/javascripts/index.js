/* eslint-disable */

$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();   
});

function reflectStatus(userId, status, message) {
    const statusBar = document.getElementById(userId);
    statusBar.className = `status ${status.toLowerCase()}`;
    $(`#${userId}-card`).tooltip('hide')
      .attr('data-original-title', message)
      .tooltip('show');
}

function updateStatus(userId, status) {
    const data = { userId, status }
    if (status === 'Away') {
        let message = document.getElementById(`${userId}-away-input`).value
        if (!message) {
            message = 'Away for uncertain time'
        } else {
            message = `Next Available at: ` + message
        }
        data.message = message
    } else {
        data.message = status
    }
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
    .then((result) => {
        reflectStatus(userId, status, data.message);
    });
}