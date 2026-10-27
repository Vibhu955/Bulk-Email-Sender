import { getProfile } from "../users/get-profile.js";

const btnDashboard = document.getElementById("btnDash");


export async function loadTemplates(mode, isAdmin) {
    const res = await fetch("http://localhost:3000/templates", {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    });

    const data = await res.json();
    // console.log(data)
    const templates = data.data;

    // Dropdown (create-mail page)
    if (mode === "dropdown") {

        const templateSelect = document.getElementById("templateSelect");
        templateSelect.innerHTML = `<option value="">Select Template</option>`;

        templates.forEach(template => {
            const option = document.createElement("option");
            option.value = template.id;
            option.textContent = template.name;
            templateSelect.appendChild(option);
        });

        return;
    }

    //Templates Page
    if (mode === "list") {

        const templateList = document.getElementById("templateList");
        const adminSection = document.getElementById("adminSection");
        const createBtn = document.getElementById("createBtn");

        templateList.innerHTML = "";

        if (isAdmin) {
            adminSection.style.display = "block";
            createBtn.onclick = () => {
                window.location.href = "./create-template.html";
            };
        } // if admin has clicked on create template then redirect

        templates.forEach(template => {

            const container = document.createElement("div"); //card
            container.style.border = "1px solid gray";
            container.style.padding = "10px";
            container.style.marginBottom = "10px";

            container.innerHTML = `
                <h4>${template.name}</h4>
                <p>${template.body}</p>
            `;

            if (isAdmin) {

                const editBtn = document.createElement("button");
                editBtn.innerText = "Edit";
                editBtn.onclick = () => {
                    window.location.href = `./create-template.html?id=${template.id}`;
                }; // redirect on that template

                const deleteBtn = document.createElement("button");
                deleteBtn.innerText = "Delete";
                deleteBtn.onclick = async () => {

                    if (!confirm("Are you sure?")) return;

                    await fetch(`http://localhost:3000/templates/delete/${template.id}`, {
                        method: "DELETE",
                        headers: {
                            "Authorization": `Bearer ${localStorage.getItem("token")}`
                        }
                    });

                    loadTemplates("list", isAdmin); // load all again 
                };

                container.appendChild(editBtn);
                container.appendChild(deleteBtn);
            }

            templateList.appendChild(container);
        });
    }
}


btnDashboard?.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.replace("http://127.0.0.1:5500/dashboard.html");
});


window.addEventListener("DOMContentLoaded", async (e) => {
    e.preventDefault();
    const user = await getProfile()
    // console.log(user)
    if (!localStorage.getItem("token"))
        window.location.replace("http://127.0.0.1:5500/users/login.html");

    if (!user) {
        window.location.href = "../users/login.html";
    }
    const isAdmin = user.role === 1;


    // console.log("object")
    if (window.location.pathname.includes("get-templates.html")) {
        loadTemplates("list", isAdmin);
    }

});

