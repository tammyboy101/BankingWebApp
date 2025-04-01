const apiUrl = "https://banking-app-function.azurewebsites.net/api/signup?"; // Replace with your Azure API URL

document.getElementById("signup").addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    const response = await fetch(`${apiUrl}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    alert(await response.text());
});

document.getElementById("login").addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    const response = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (data.success) {
        document.getElementById("banking").style.display = "block";
        document.getElementById("user-email").innerText = email;
        document.getElementById("balance").innerText = data.balance;
    } else {
        alert(data.message);
    }
});

document.getElementById("deposit").addEventListener("click", async () => {
    const amount = parseInt(document.getElementById("amount").value);
    
    const response = await fetch(`${apiUrl}/deposit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount })
    });

    document.getElementById("balance").innerText = await response.text();
});

document.getElementById("withdraw").addEventListener("click", async () => {
    const amount = parseInt(document.getElementById("amount").value);
    
    const response = await fetch(`${apiUrl}/withdraw`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount })
    });

    document.getElementById("balance").innerText = await response.text();
});
