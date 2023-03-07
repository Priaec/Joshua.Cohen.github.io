class Project{
    //name of project
    name;
    //description of project
    description;
    //image of project
    image;

    //constructor for each project
    constructor(name, description, image){
        this.name = name;
        this.description = description; 
        this.image = image;
    }

    //getter methods for each field
    getName(){return this.name}
    getDescription(){return this.description}
    getImage(){return this.image}

    //setter methods for each field
    setName(name){
        this.name = name;
    }

    setDescription(description){
        this.description = description;
    }

    setImage(image){
        this.image = image;
    }

    //this will work for relative window depth
    displayProject(){
        setTimeout(()=>{

        },800);
        //define variables
        let headerDiv = document.getElementById('projectsMain');
        let projectContainer = document.createElement('div');
        let projectContainerDesc = document.createElement('div');
        let name = document.createElement('h2');
        let description = document.createElement('h4');
        let image = document.createElement('img');
        //give the necessary class names to each element
        projectContainer.className = 'projectContainer';
        projectContainerDesc.className = 'projectContainerDesc'
        name.className = 'name';
        description.className = 'description';
        image.className = 'logo';
        //give each item their necessary fields
        name.innerHTML = this.name;
        description.innerHTML = this.description;
        image.src = this.image;
        //define structure
        //set projContainer as child of main
        headerDiv.appendChild(projectContainer);
        //set description div as the child of the headerDiv
        projectContainer.appendChild(projectContainerDesc);
        //set name as a child of description div
        projectContainerDesc.appendChild(name);
        //set description as a child of the description div
        projectContainerDesc.appendChild(description);
        //set the image as a child of the project container
        projectContainer.appendChild(image);
    }
}

//define the project structure
let projectss= [ 
        {
            name: "Face Recognition Deep Learning",
            description: "Currently working on application that learns to recognize one particular person. Emphasizes deep learning image processing using Convolutional Neural Networks. Expected to be fully functional by May 2023.",
            image: "images/projects/FaceRecognition2.PNG"
        },
        {
            name: "BeFit Senior Design",
            description: "Created a native application for Android and Apple (iOS) with a team of 5. Users can track daily fitness metrics leveraging native Health APIs. Users can create individual accounts with user credentials. Ability to display individualized health metrics post login.",
            image : "images/projects/BeFitV3.JPG"
        }, 
        {
            name: "Task Management Application",
            description: "As a group project created a application for managing user tasks on a mobile phone. Users had the ability to create, modify, edit, and delete tasks. My responsibility was to write all the database code, user interface creation and several back-end components.",
            image : "images/projects/taskManagementPixel3a.jpg"
        }, 
        {
            name: "Mailer Website",
            description: "Website where authenticated users can schedule automated emails to be sent to designated users.",
            image: "images/projects/MailerWeb.png"
        }
    ]


    //when the document loads, this function will run
    onload = () =>{
        //iterate over each project
        projectss.forEach((item)=>{
            //create new project
            let project = new Project(item.name, item.description, item.image);
            project.displayProject();
        });
    }
    /*
        Structure of the elements
        <div class="projectContainer">
            <div class="projectContainerDesc">
                <h2 class="name">Name</h2>
                <h4 class="description">
                    description
                </h4>
            </div>
            <img src="images/image.PNG" class="logo">
        </div>
    */




