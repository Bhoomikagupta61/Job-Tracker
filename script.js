const addBtn = document.getElementById("addBtn");
const applications = document.getElementById("applications");

let jobs = JSON.parse(localStorage.getItem("jobs")) || [];

displayJobs();


addBtn.addEventListener("click", function () {

    const jobTitle = document.getElementById("jobTitle").value;
    const companyName = document.getElementById("companyName").value;
    const jobStatus = document.getElementById("jobStatus").value;


    if(jobTitle === "" || companyName === "") {
        alert("Please fill all fields");
        return;
    }


    const job = {
        title: jobTitle,
        company: companyName,
        status: jobStatus
    };


    jobs.push(job);


    localStorage.setItem("jobs", JSON.stringify(jobs));


    displayJobs();


    document.getElementById("jobTitle").value = "";
    document.getElementById("companyName").value = "";

});



function displayJobs(){

    applications.innerHTML = "";


    jobs.forEach(function(job, index){


        const card = document.createElement("div");

        card.classList.add("job-card");


        card.innerHTML = `
            <h3>${job.title}</h3>
            <p>Company: ${job.company}</p>
            <p>Status: ${job.status}</p>
            <button class="delete-btn">Delete</button>
        `;


        applications.appendChild(card);



        card.querySelector(".delete-btn").addEventListener("click", function(){

            jobs.splice(index,1);

            localStorage.setItem("jobs", JSON.stringify(jobs));

            displayJobs();

        });


    });

}