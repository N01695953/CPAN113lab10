// Function to display error messages
function displayError(message) {
    document.getElementById('result').innerHTML = `<p style="color: red;">Error: ${message}</p>`;
}

// Task 1: Fetch Data with fetch()
document.getElementById('fetchFetch').addEventListener('click', function() {
    fetch('https://jsonplaceholder.typicode.com/posts/1')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Server Error: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('result').innerHTML = `<h2>${data.title}</h2><p>${data.body}</p>`;
        })
        .catch(error => {
            if (error.message.includes('NetworkError')) {
                displayError('Network Error: Please check your internet connection.');
            } else {
                displayError(error.message);
            }
        });
});


// Task 2: Fetch Data with XMLHttpRequest
document.getElementById('fetchXHR').addEventListener('click', function() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts/2');
    xhr.onload = function() {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            document.getElementById('result').innerHTML = `<h2>${data.title}</h2><p>${data.body}</p>`;
        } else {
            displayError(`Server Error: ${xhr.status}`);
        }
    };
    xhr.onerror = function() {
        displayError('Network Error: Please check your internet connection.');
    };
    xhr.send();
});


// Task 3: Send Data Using POST
document.getElementById('postForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('postTitle').value;
    const body = document.getElementById('postBody').value;

    if (!title || !body) {
        displayError('Invalid Input: Title and body are required.');
        return;
    }

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, body })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Server Error: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        document.getElementById('result').innerHTML = `<p>Post created with ID: ${data.id}</p>`;
    })
    .catch(error => {
        if (error.message.includes('NetworkError')) {
            displayError('Network Error: Please check your internet connection.');
        } else {
            displayError(error.message);
        }
    });
});


// Task 4: Update Data Using PUT
document.getElementById('putForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const id = document.getElementById('postId').value;
    const title = document.getElementById('updateTitle').value;
    const body = document.getElementById('updateBody').value;

    if (!id || !title || !body) {
        displayError('Invalid Input: ID, title, and body are required.');
        return;
    }

    const xhr = new XMLHttpRequest();
    xhr.open('PUT', `https://jsonplaceholder.typicode.com/posts/${id}`);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function() {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            document.getElementById('result').innerHTML = `<p>Post updated: <strong>${data.title}</strong></p><p>${data.body}</p>`;
        } else {
            displayError(`Server Error: ${xhr.status}`);
        }
    };

    xhr.onerror = function() {
        displayError('Network Error: Please check your internet connection.');
    };

    xhr.send(JSON.stringify({ title, body }));
});