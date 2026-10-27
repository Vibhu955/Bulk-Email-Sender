const mailForm = document.getElementById("mailForm");

const templateSelect = document.getElementById("templateSelect");
const csvFileInput = document.getElementById("csvFile");


const usersTable = document.getElementById("usersTable");
const templatePreview = document.getElementById("templatePreview");
const previewBtn = document.getElementById("previewBtn");

const scheduleDiv = document.getElementById("scheduleDiv");
const scheduleAtInput = document.getElementById("scheduleAt");

const btnDashboard = document.getElementById("btnDash");

import { loadTemplates } from "../templates/get-templates.js";

// const attachmentInput = document.getElementById("attachments");
if (!localStorage.getItem("token"))
  window.location.replace("http://127.0.0.1:5500/users/login.html");

document.querySelectorAll("input[name='mailOption']").forEach(radio => { //check for schedule or send imemediately radios
  // all <input> elements that have a name attribute with the exact value "mailOption"
  radio.addEventListener("change", (e) => {
    if (e.target.value === "schedule") {
      scheduleDiv.classList.remove("hidden");
    } else {
      scheduleDiv.classList.add("hidden");
    }
  });
});

// Load Templates with dropdown because we need only its name 
loadTemplates("dropdown");


const preview = async () => {
    const file = csvFileInput.files[0];
    if (!file) return alert("Upload CSV first");

    const text = await file.text();
    const rows = text.split("\n").slice(1).filter(r => r.trim() !== ""); // converts into array of data rows(w/o header) w/o extra spaces

    usersTable.innerHTML = "";

    const users = rows.map(row => {
      const [name, email, phone] = row.split(",");
      return {
        name: name?.trim(),
        email: email?.trim(),
        phone_number: phone?.trim()
      };
    });

    const templateId = templateSelect.value;
    if (!templateId) return alert("Select template first");

    // Fetch template once
    const templateData = await (await fetch(`http://localhost:3000/templates/${templateId}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })).json()

    // const templateData = await res.json();
    const templateBody = templateData.data[0].body;

    // template for specific user
    function userTemplate(user) {
      let body = templateBody;

      Object.keys(user).forEach(key => {
        const regex = new RegExp(`{{${key}}}`, "g");
        body = body.replace(regex, user[key] || "");
      });

      templatePreview.innerHTML = body;
    }

    // users table in preview 
    users.forEach((user, index) => {
      const tr = document.createElement("tr"); //row

      tr.innerHTML = `
        <td>
          <a href="#" data-index="${index}" class="user-link">
            ${user.name}
          </a>
        </td>
        <td>${user.email}</td>
        <td>${user.phone_number}</td>
      `; // data

      usersTable.appendChild(tr);
    });

    // Add click listeners
    document.querySelectorAll(".user-link").forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const index = e.target.dataset.index;
        userTemplate(users[index]);
      });
    });

    // Auto preview first
    if (users.length > 0) {
      userTemplate(users[0]);
    }
}


const mailSend = async () => {
    const formData = new FormData();
    // console.log(templateSelect.value)
    // console.log(csvFileInput.files)
    formData.append("template_id", templateSelect.value);
    formData.append("users.csv", csvFileInput.files[0]);
    
    const mailOption = document.querySelector("input[name='mailOption']:checked").value; //get watever is checked

    if (mailOption === "schedule") {
      formData.append("schedule_at", scheduleAtInput.value);
    }
    // console.log(formData)
    const result = await (await fetch(`http://localhost:3000/mails/create`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,

      },
      body: formData
    })).json();

    alert(result.message);
}

// Submit
mailForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  mailSend()
});

previewBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  preview()
})

btnDashboard?.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.replace("http://127.0.0.1:5500/dashboard.html");
});
