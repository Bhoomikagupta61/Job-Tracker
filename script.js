const addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", function () {

    const jobTitle = document.getElementById("jobTitle").value;
    const companyName = document.getElementById("companyName").value;
    const jobStatus = document.getElementById("jobStatus").value;

    if (jobTitle.trim() === "" || companyName.trim() === "") {
        alert("Please fill all fields");
        return;
    }

    const applications = document.getElementById("applications");

    const newCard = document.createElement("div");
    newCard.classList.add("job-card");

    newCard.innerHTML = `
        <h3>${jobTitle}</h3>
        <p>Company: ${companyName}</p>
        <p>Status: ${jobStatus}</p>
        <button class="delete-btn">Delete</button>
    `;

    applications.appendChild(newCard);

    const deleteBtn = newCard.querySelector(".delete-btn");

    deleteBtn.addEventListener("click", function () {
        newCard.remove();
    });

    document.getElementById("jobTitle").value = "";
    document.getElementById("companyName").value = "";
    document.getElementById("jobStatus").value = "Applied";
});

const existingDeleteButtons = document.querySelectorAll(".delete-btn");

for (const button of existingDeleteButtons) {
    button.addEventListener("click", function () {
        button.parentElement.remove();
    });
}