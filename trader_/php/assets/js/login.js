import { API_BASE_URL } from "./config.js";
console.log(API_BASE_URL)
document.getElementById("loginForm").addEventListener("submit",async(e)=>{
    e.preventDefault();
    const form = e.target;

    const data = {
        email : form.querySelector('[name="email"]').value.trim(),
        password : form.querySelector('[name="password"]').value
    }
    // console.log(data);
    try {
        const response = await fetch(`${API_BASE_URL}/accounts/login/`, 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }
        );

        const result = await response.json();
        
        if (response.ok) {
            localStorage.setItem("access",result.access);
            localStorage.setItem("refresh",result.refresh);
            localStorage.setItem("user",JSON.stringify(result.user));
            window.location.href = "./../Home.php";
        } else {
            console.log("Error Occers");
        }

    } catch (error) {
        document.getElementById("message").textContent = "Server connection failed";
    }
})
