export async function getProfile() {
    const result = await fetch("http://localhost:3000/users/profile", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });

    const data = await result.json();
    console.log(data.user);
    return data.user
}