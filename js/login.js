$(document).ready(function() {

    $("form").submit(function(e) {
        e.preventDefault();
    });

    $("form#login").submit(function() {
        var mail = $('input[name="email"').val().trim();
        var pwd = $('input[name="password"').val().trim();

        login(mail, pwd);
    });

    async function login(mail, pwd) {
        try{
            const data = await postData('http://localhost:3000/users/auth/login', { email: mail, password: pwd });
            console.log(JSON.stringify(data));
            localStorage.setItem('token', data.data.token);
            window.location.href='./dashboard.html';
        } catch ( error ) {
            console.error(error);
        }
    }

    async function postData(url = '', data = {}) {

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    }
});