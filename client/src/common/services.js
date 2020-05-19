
function postLogin(url, body) {
    fetch(`${url}/api/topchallenger/login/${body}`, {
        method: 'POST' }).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
        })
        .then(profile => {
            console.log(profile);
        })
        .catch(error => {
        console.error('Could not connect to server:', error);
    });
}

export default postLogin;
