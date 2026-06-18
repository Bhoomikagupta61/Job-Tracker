const totalCount = document.getElementById("totalCount");
const appliedCount = document.getElementById("appliedCount");
const interviewCount = document.getElementById("interviewCount");
const rejectedCount = document.getElementById("rejectedCount");

const addBtn = document.getElementById("addBtn");
const applications = document.getElementById("applications");
const searchInput = document.getElementById("searchInput");
const filterStatus = document.getElementById("filterStatus");


let jobs = JSON.parse(localStorage.getItem("jobs")) || [];


// Load existing jobs
displayJobs(jobs);



// Add Job
addBtn.addEventListener("click", function () {


    const title = document.getElementById("jobTitle").value;
    const company = document.getElementById("companyName").value;
    const status = document.getElementById("jobStatus").value;



    if(title === "" || company === ""){

        alert("Please fill all fields");
        return;

    }



    const job = {

        title: title,
        company: company,
        status: status

    };



    jobs.push(job);


    saveJobs();


    displayJobs(jobs);



    document.getElementById("jobTitle").value = "";
    document.getElementById("companyName").value = "";

});





// Display Jobs
function displayJobs(jobList){


    applications.innerHTML = "";


    updateDashboard();



    if(jobList.length === 0){

        applications.innerHTML = `
        <p>No applications found</p>
        `;

        return;

    }




    jobList.forEach(function(job){



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



    const filteredJobs = jobs.filter(function(job){



        return (

            job.title.toLowerCase().includes(text) ||

            job.company.toLowerCase().includes(text)

        );


    });



    displayJobs(filteredJobs);



});








// Filter
filterStatus.addEventListener("change", function(){



    const selectedStatus = filterStatus.value;



    if(selectedStatus === "All"){


        displayJobs(jobs);


        return;

    }





    const filteredJobs = jobs.filter(function(job){



        return job.status === selectedStatus;



    });




    displayJobs(filteredJobs);



});







// Dashboard Counters
function updateDashboard(){



    totalCount.innerText = jobs.length;



    appliedCount.innerText = jobs.filter(function(job){


        return job.status === "Applied";


    }).length;




    interviewCount.innerText = jobs.filter(function(job){


        return job.status === "Interview";


    }).length;




    rejectedCount.innerText = jobs.filter(function(job){


        return job.status === "Rejected";


    }).length;



}







// Save Jobs
function saveJobs(){


    localStorage.setItem(

        "jobs",

        JSON.stringify(jobs)

    );


}