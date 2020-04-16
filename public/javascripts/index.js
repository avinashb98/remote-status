/* eslint-disable */

// Prefetch loader gif
const loader = new Image();
loader.src = '/remote-status/static/images/loading.gif'

$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
    $('form').submit(function (evt) {
        evt.preventDefault(); //prevents the default action
     });
});

function reflectStatus(userId, status, message) {
    const statusBar = document.getElementById(`${userId}-status`);
    statusBar.className = `status ${status.toLowerCase()}`;
    $(`#${userId}-card`).tooltip('hide')
      .attr('data-original-title', message)
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
    let editIcon = document.getElementById(`${userId}-edit-button`);
    editIcon.src = '/remote-status/static/images/loading.gif'
    editIcon.className = "loading"
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
        editIcon.className = ""
        editIcon.src = '/remote-status/static/images/edit.png'
    })
    .catch(console.log)
}