const getOneTemplate = async (id) => {

    const result = await (await fetch(`http://localhost:3000/templates/${id}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })).json();

    return result;
}

export default getOneTemplate;