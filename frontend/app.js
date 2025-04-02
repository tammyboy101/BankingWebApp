document.getElementById("signup-btn").addEventListener("click", async function () {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");

    if (!email || !password) {
        message.textContent = "Please enter email and password!";
        return;
    }

    try {
        const response = await fetch("https://banking-app-function.azurestaticapps.net/api/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            message.style.color = "green";
            message.textContent = "Sign Up Successful!";
        } else {
            message.style.color = "red";
            message.textContent = `Error: ${data.message}`;
        }
    } catch (error) {
        message.textContent = "Failed to connect. Check console for details.";
        console.error(error);
    }
});
