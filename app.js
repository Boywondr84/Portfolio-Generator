const inquirer = require("inquirer");
// const fs = require("fs");
// const generatePage = require('./src/page-template-js');

// const pageHTML = generatePage(name, github);

// fs.writeFile("./index.html", pageHTML, err => {
//     if (err) throw err;

//     console.log("Portfolio complete! Check out index.html to see the output!");
// });

const promptUser = () => {
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your name?"
        },
        {
            type: "input",
            name: "GitHub Name",
            message: "What is your GitHub Account Name?"
        },
        {
            type: "input",
            name: "about",
            message: "Provide some information about yourself:"
        }
    ]);
};

// promptUser().then(answers => console.log(answers))
// .then(promptProject)
// .then(projectAnswers => console.log(projectAnswers));

const promptProject = portfolioData => {
    console.log(`
    =================
    Add a New Project
    =================
    `);

    // If there is no 'projects' array property, create one
    if (!portfolioData.projects) {
        portfolioData.projects = [];
    }

    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the name of your project?"
        },
        {
            type: "input",
            name: "description",
            message: "Project description (Required):"
        },
        {
            type: "checkbox",
            name: "languages",
            message: "With what languages did you build this project? (Check all that apply)",
            choices: ['HTML', 'CSS', 'JavaScript', 'ES6', 'jQuery', 'Bootstrap', 'Node']
        },
        {
            type: "input",
            name: "link",
            message: "Enter the GitHub link to your project. (Required)"
        },
        {
            type: "confirm",
            name: "feature",
            message: "Would you like to feature this project?",
            default: false
        },
        {
            type: "confirm",
            name: "confirmAddProject",
            message: "Would you like to enter another project?",
            default: false
        }
    ])
    .then(projectData => {
        portfolioData.projects.push(projectData);
        if (projectData.confirmAddProject) {
            return promptProject(portfolioData);
        } else {
            return portfolioData;
        }
    });
};

promptUser()
    .then(promptProject)
    .then(projectAnswers => console.log(projectAnswers));