const totalCount = document.getElementById("totalCount");
const appliedCount = document.getElementById("appliedCount");
const interviewCount = document.getElementById("interviewCount");
const rejectedCount = document.getElementById("rejectedCount");

const addBtn = document.getElementById("addBtn");
const updateBtn = document.getElementById("updateBtn");

const applications = document.getElementById("applications");
const searchInput = document.getElementById("searchInput");
const filterStatus = document.getElementById("filterStatus");


let jobs = JSON.parse(localStorage.getItem("jobs")) || [];

let editIndex = null;



// Load data
displayJobs(jobs);




// Add Job
addBtn.addEventListener("click", function(){


    const title = document.getElementById("jobTitle").value;
    const company = document.getElementById("companyName").value;
    const status = document.getElementById("jobStatus").value;



    if(title === "" || company === ""){

        alert("Please fill all fields");
        return;

    }



    jobs.push({

        title,
        company,
        status

    });



    saveJobs();

    displayJobs(jobs);

    clearForm();


});





// Update Job
updateBtn.addEventListener("click", function(){


    jobs[editIndex] = {


        title: document.getElementById("jobTitle").value,

        company: document.getElementById("companyName").value,

        status: document.getElementById("jobStatus").value


    };


    saveJobs();

    displayJobs(jobs);


    clearForm();


    addBtn.style.display = "inline-block";

    updateBtn.style.display = "none";


});






// Display Jobs
function displayJobs(jobList){


    applications.innerHTML = "";


    updateDashboard();



    if(jobList.length === 0){


        applications.innerHTML = "<p>No applications found</p>";

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


        <button class="edit-btn">
        Edit
        </button>


        <button class="delete-btn">
        Delete
        </button>

        `;




        // Edit
        card.querySelector(".edit-btn")
        .addEventListener("click", function(){


            document.getElementById("jobTitle").value = job.title;

            document.getElementById("companyName").value = job.company;

            document.getElementById("jobStatus").value = job.status;



            editIndex = index;


            addBtn.style.display = "none";

            updateBtn.style.display = "inline-block";


        });

        // Delete
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

// Dashboard
function updateDashboard(){
    totalCount.innerText = jobs.length;
    appliedCount.innerText =
    jobs.filter(job => job.status === "Applied").length;
    interviewCount.innerText =
    jobs.filter(job => job.status === "Interview").length;
    rejectedCount.innerText =
    jobs.filter(job => job.status === "Rejected").length;
}
// Local Storage
function saveJobs(){
    localStorage.setItem(
        "jobs",
        JSON.stringify(jobs)
    );
}
// Clear Form
function clearForm(){
    document.getElementById("jobTitle").value = "";
    document.getElementById("companyName").value = "";
    editIndex = null;
}