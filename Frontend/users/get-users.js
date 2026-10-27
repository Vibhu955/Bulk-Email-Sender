const btnDashboard = document.getElementById("btnDash");

if (!localStorage.getItem("token"))
    window.location.replace("http://127.0.0.1:5500/users/login.html");

const displayUsers = async () => {
    try {
        const result = await (await fetch("http://localhost:3000/users/", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            }
        })).json();
        console.log(result)
        if (result.status == 400) {
            const p = document.createElement("p");
            p.innerText = result.message;
            document.body.appendChild(p);
        } else {
            if (result.data.length !== 0) {
                console.log("Users received:", result);
                createUsersTable(result.data);
            }
        }

    } catch (err) {
        console.error("Fetch failed:", err);
    }
};


const createUsersTable = (data) => {

    const heading = document.createElement("h3");
    heading.innerText = "All Users";
    document.body.appendChild(heading);

    const table = document.createElement("table");
    table.border = "1";
    table.style.marginTop = "20px";
    table.id = "usersTable";

    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");

    ["ID", "Name", "Email", "Role", "Created At"]
        .forEach(text => {
            const th = document.createElement("th");
            th.textContent = text;
            headerRow.appendChild(th);
        });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");

    data.forEach(user => {
        const row = document.createElement("tr");

        ["id", "name", "email", "role_name", "created_at"]
            .forEach(field => {
                const td = document.createElement("td");

                if (field === "name") {
                    const link = document.createElement("a");
                    link.href = "#";
                    link.textContent = user[field];

                    link.addEventListener("click", (e) => {
                        e.preventDefault();
                        alert(`User ID: ${user.id}`);
                        // You can redirect to user details page if needed
                        // window.location.href = `user-details.html?id=${user.id}`;
                    });

                    td.appendChild(link);
                } else {
                    td.textContent = user[field];
                }

                row.appendChild(td);
            });

        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    document.body.appendChild(table);
};

btnDashboard?.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.replace("http://127.0.0.1:5500/dashboard.html");
});


window.addEventListener("DOMContentLoaded", () => {
    // const pg = window.location.pathname;

    if (window.location.pathname.includes("get-users.html")) {
        if (!localStorage.getItem("token"))
            window.location.replace("http://127.0.0.1:5500/app.html");

        displayUsers();
    }
});

