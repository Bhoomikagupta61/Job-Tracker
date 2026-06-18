const addBtn = document.getElementById("addBtn");
const applications = document.getElementById("applications");
const searchInput = document.getElementById("searchInput");
const filterStatus = document.getElementById("filterStatus");


let jobs = JSON.parse(localStorage.getItem("jobs")) || [];


// Initial display
displayJobs(jobs);


// Add application
addBtn.addEventListener("click", function () {

    const title = document.getElementById("jobTitle").value;
    const company = document.getElementById("companyName").value;
    const status = document.getElementById("jobStatus").value;


    if (title === "" || company === "") {
        alert("Please fill all fields");
        return;
    }


    const job = {
        title,
        company,
        status
    };


    jobs.push(job);

    saveJobs();

    displayJobs(jobs);


    document.getElementById("jobTitle").value = "";
    document.getElementById("companyName").value = "";

});



// Display jobs
function displayJobs(jobList) {


    applications.innerHTML = "";


    jobList.forEach(function(job) {


        const index = jobs.indexOf(job);


        const card = document.createElement("div");

        card.className = "job-card";


        card.innerHTML = `

            <h3>${job.title}</h3>

            <p>Company: ${job.company}</p>

            <p>
                Status:
                <span class="status ${job.status.toLowerCase().replace(" ","-")}">
                ${job.status}
                </span>
            </p>

            <button class="delete-btn">
                Delete
            </button>

        `;



        card.querySelector(".delete-btn")
        .addEventListener("click", function(){

            jobs.splice(index,1);

            saveJobs();

            displayJobs(jobs);

        });



        applications.appendChild(card);


    });

}



// Search
searchInput.addEventListener("input", function(){


    const text = searchInput.value.toLowerCase();


    const filtered = jobs.filter(function(job){


        return (

            job.title.toLowerCase().includes(text) ||

            job.company.toLowerCase().includes(text)

        );


    });


    displayJobs(filtered);


});




// Filter
filterStatus.addEventListener("change", function(){


    const selected = filterStatus.value;


    if(selected === "All"){

        displayJobs(jobs);

        return;

    }


    const filtered = jobs.filter(function(job){


        return job.status === selected;


    });


    displayJobs(filtered);


});




// Save to LocalStorage
function saveJobs(){

    localStorage.setItem(
        "jobs",
        JSON.stringify(jobs)
    );

}