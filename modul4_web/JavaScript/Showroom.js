// Menampilkan Login Form
function showLoginForm() {
    document.getElementById("login-form").style.display = "flex";
}

// Menampilkan Sign Up Form
function showSignUpForm() {
    document.getElementById("signup-form").style.display = "flex";
}

// Menampilkan Profil Form
function showProfileForm() {
    var username = localStorage.getItem("username");
    var email = localStorage.getItem("email");
    var gender = localStorage.getItem("gender");

    document.getElementById("profile-name").value = username;
    document.getElementById("profile-email").value = email;

    if (gender) {
        document.getElementById("gender-" + gender.toLowerCase()).checked = true;
    }

    document.getElementById("profile-form").style.display = "flex";
}

// Menutup Modal
function closeForm(formId) {
    document.getElementById(formId).style.display = "none";
}

// Simulasi Login (GET Data dari API)
function login() {
    var username = document.getElementById("login-username").value;
    var password = document.getElementById("login-password").value;

    if (username && password) {
        var data = { username, password };

        fetch('/modul4_web/api.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                localStorage.setItem("username", username);
                localStorage.setItem("loggedIn", true);
                updateUI();
                closeForm('login-form');
            } else {
                alert("Login failed: " + data.message);
            }
        })
        .catch(error => alert("Error: " + error));
    } else {
        alert("Please enter both username and password!");
    }
}

// Simulasi Sign Up (POST Data ke API)
function signUp() {
    var username = document.getElementById("signup-username").value;
    var email = document.getElementById("signup-email").value;
    var password = document.getElementById("signup-password").value;

    if (username && email && password) {
        var data = {
            username: username,
            email: email,
            password: password
        };

        fetch('/modul4_web/api.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Sign up successful');
                localStorage.setItem("username", username);
                localStorage.setItem("loggedIn", true);
                updateUI();
                closeForm('signup-form');
            } else {
                alert('Sign up failed: ' + data.message);
            }
        })
        .catch(error => alert("Error: " + error));
    } else {
        alert("Please fill all fields!");
    }
}

// Memperbarui UI setelah login
function updateUI() {
    var username = localStorage.getItem("username");
    var loginBtn = document.getElementById("login-btn");
    var userInfo = document.getElementById("user-info");

    if (localStorage.getItem("loggedIn") === "true") {
        loginBtn.style.display = "none"; // Hide login button
        userInfo.innerHTML = `<span onclick="showProfileForm()" style="cursor: pointer; color: #800080;">${username}</span> | <span onclick="logout()" style="cursor: pointer; color: #800080;">Logout</span>`;
    } else {
        loginBtn.style.display = "inline-block"; // Show login button again
        userInfo.innerHTML = ''; // Clear user info
    }
}

// Fungsi untuk menyimpan profil pengguna (PUT)
function saveProfile() {
    var name = document.getElementById("profile-name").value;
    var email = document.getElementById("profile-email").value;
    var gender = document.querySelector('input[name="gender"]:checked') ? document.querySelector('input[name="gender"]:checked').value : '';

    if (name && email && gender) {
        var data = {
            username: name,
            email: email,
            gender: gender
        };

        fetch('/modul4_web/api.php', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                localStorage.setItem("username", name);
                localStorage.setItem("email", email);
                localStorage.setItem("gender", gender);
                updateUI();
                closeForm('profile-form');
            } else {
                alert('Profile update failed: ' + data.message);
            }
        })
        .catch(error => alert("Error: " + error));
    } else {
        alert("Please fill all fields!");
    }
}

// Logout dan reset data (DELETE)
function logout() {
    fetch('/modul4_web/api.php', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            localStorage.removeItem("username");
            localStorage.removeItem("email");
            localStorage.removeItem("gender");
            localStorage.removeItem("loggedIn");
            updateUI();
        } else {
            alert('Logout failed: ' + data.message);
        }
    })
    .catch(error => alert("Error: " + error));
}

// Cek status login saat halaman dimuat
window.onload = function() {
    updateUI();
};
