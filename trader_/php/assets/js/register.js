import { API_BASE_URL } from "./config.js";

document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = e.target;

    const password = form.querySelector('[name="password"]').value;
    const confirmPassword = form.querySelector('[name="confirm_password"]').value;

    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    const data = {
        username: form.querySelector('[name="username"]').value.trim(),
        first_name: form.querySelector('[name="first_name"]').value.trim(),
        last_name: form.querySelector('[name="last_name"]').value.trim(),
        email: form.querySelector('[name="email"]').value.trim(),
        phone: form.querySelector('[name="phone"]').value.trim(),
        password: password
    };

    try {
        const response = await fetch(`${API_BASE_URL}/accounts/register/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
            console.log("Registration Success");
            console.log(result);

            window.location.href = "./login.php";
        } else {
            console.error(result);
            alert(result.message || "Registration failed");
        }

    } catch (error) {
        console.error(error);
        alert("Server connection failed");
    }
});