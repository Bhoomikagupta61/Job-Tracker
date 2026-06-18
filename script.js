const totalCount = document.getElementById("totalCount");
const appliedCount = document.getElementById("appliedCount");
const interviewCount = document.getElementById("interviewCount");
const rejectedCount = document.getElementById("rejectedCount");

const addBtn = document.getElementById("addBtn");
const updateBtn = document.getElementById("updateBtn");

const applications = document.getElementById("applications");
const searchInput = document.getElementById("searchInput");
const filterStatus = document.getElementById("filterStatus");


let jobs = [];

const API_URL = "http://localhost:3000/jobs";

let editIndex = null;



// Load jobs when page opens
getJobs();



async function getJobs(){

    const response = await fetch(API_URL);

    jobs = await response.json();

    displayJobs(jobs);

}



// Add Job

addBtn.addEventListener("click", async function(){


    const title = document.getElementById("jobTitle").value;

    const company = document.getElementById("companyName").value;

    const status = document.getElementById("jobStatus").value;



    if(title === "" || company === ""){

        alert("Please fill all fields");

        return;

    }



    await fetch(API_URL, {

        method:"POST",

        headers:{

            "Content-Type":"application/json"

        },

        body: JSON.stringify({

            title,

            company,

            status

        })

    });



    getJobs();

    clearForm();


});







// Update Job

updateBtn.addEventListener("click", async function(){


    const job = jobs[editIndex];


    await fetch(`${API_URL}/${job.id}`, {


        method:"PUT",


        headers:{

            "Content-Type":"application/json"

        },


        body: JSON.stringify({

            title: document.getElementById("jobTitle").value,

            company: document.getElementById("companyName").value,

            status: document.getElementById("jobStatus").value

        })


    });



    getJobs();


    clearForm();


    addBtn.style.display="inline-block";

    updateBtn.style.display="none";



});









// Display Jobs

function displayJobs(jobList){



    applications.innerHTML="";


    updateDashboard();



    if(jobList.length === 0){


        applications.innerHTML="<p>No applications found</p>";

        return;


    }




    jobList.forEach(function(job){


        const index = jobs.indexOf(job);



        const card=document.createElement("div");


        card.className="job-card";



        card.innerHTML = `


        <h3>${job.title}</h3>


        <p>Company: ${job.company}</p>


        <p>

        Status:

        <span class="status">

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

        .addEventListener("click",function(){



            document.getElementById("jobTitle").value = job.title;


            document.getElementById("companyName").value = job.company;


            document.getElementById("jobStatus").value = job.status;



            editIndex=index;



            addBtn.style.display="none";


            updateBtn.style.display="inline-block";



        });


        // Delete


        card.querySelector(".delete-btn")

        .addEventListener("click", async function(){



            await fetch(`${API_URL}/${job.id}`,{


                method:"DELETE"


            });



            getJobs();



        });






        applications.appendChild(card);



    });



}


// Search

searchInput.addEventListener("input",function(){



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


filterStatus.addEventListener("change",function(){



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



function clearForm(){


    document.getElementById("jobTitle").value="";


    document.getElementById("companyName").value="";


    editIndex=null;


}
