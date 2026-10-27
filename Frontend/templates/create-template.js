const form = document.getElementById("forminput");
import { getProfile } from "../users/get-profile.js";
import getOneTemplate from "./get-one-template.js";

let url = "http://localhost:3000/templates/create";
let method = "POST";


const editTemplate = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const templateId = urlParams.get("id"); //If no id -> creating new template else -> editing


    if (templateId) {
        const template = await getOneTemplate(templateId)
        // console.log()
        if (template) {
            form.name.value = template.data[0].name;
            form.body.value = template.data[0].body;
            url = `http://localhost:3000/templates/update/${templateId}`;
            method = "PUT";

        }
        else {
            console.error("Error fetching template:", error);
            alert("Failed to load template");
        }
    }
}

const editOrCreate = async (body) => {

    const result = await (await fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(body)
    })).json();

    alert(result.message);

}

editTemplate()

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const bodyData = Object.fromEntries(formData.entries());
    editOrCreate(bodyData)

    window.location.href = "./get-templates.html";
});
window.addEventListener("DOMContentLoaded", async (e) => {
    e.preventDefault();
    const user = await getProfile()
    // console.log(user)
    if (!localStorage.getItem("token"))
        window.location.replace("http://127.0.0.1:5500/users/login.html");


    if (!user || user.role !== 1) {
        alert("Access Denied");
        window.location.href = "./get-templates.html";
    }
})