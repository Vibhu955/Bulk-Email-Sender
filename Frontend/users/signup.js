const form = document.getElementById("forminput");

const signup = async () => {
    // console.log("object")
    const formData = new FormData(form);
    console.log(formData)
    const signupData = Object.fromEntries(formData.entries());

    try {
        const result = await (await fetch("http://localhost:3000/users/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(signupData),
        })).json()

        console.log(result);
        if (result.status == 400)
            alert(result.message)
        else {
            window.location.replace("http://127.0.0.1:5500/users/login.html");
        }

    } catch (error) {
        alert("Try again Later!")
        console.error("Error fetching data:", error.message);
    }
}


const login = async () => {
    const formData = new FormData(form);
    // console.log(typeof(formData.get("id")))
    const loginData = Object.fromEntries(formData.entries());

    try {
        const result = await (await fetch("http://localhost:3000/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData),
        })).json()

        console.log(result);
        if (result.status == 400)
            alert(result.message)
        else {
            localStorage.setItem("token", result.data);

            setTimeout(() => {
                window.location.replace("http://127.0.0.1:5500/dashboard.html")
            }, 3000);
        }

    } catch (error) {
        alert("Try again Later!")

        console.error("Error fetching data:", error.message);
    }
}


form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (window.location.pathname.includes("login.html")) {
        login();
    }
    else if (window.location.pathname.includes("signup.html")) {
        signup();
    }
});
