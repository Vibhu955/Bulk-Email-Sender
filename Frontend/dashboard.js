const btnlog = document.getElementById("btnlog");

if (!localStorage.getItem("token"))
    window.location.replace("http://127.0.0.1:5500/users/login.html");

btnlog?.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    window.location.replace("http://127.0.0.1:5500/app.html");
});
