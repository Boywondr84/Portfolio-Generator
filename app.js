const inquirer = require("inquirer");
// const fs = require("fs");
const { writeFile, copyFile } = require("./utils/generate-site.js");
const generatePage = require('./src/page-template');

// const mockData = {
//     name: "Lernantino",
//     github: "lernantino",
//     projects: []
// }

const promptUser = () => {
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your name? (Required)",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter your name!');
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "GitHub Name",
            message: "What is your GitHub Account Name? (Required)",
            validate: githubInput => {
                if (githubInput) {
                    return true;
                } else {
                    console.log('Please enter a GitHub username');
                    return false;
                }
            }
        },
        {
            type: "confirm",
            name: "confirmAbout",
            message: "Would you like to enter some information about yourself for an 'About' section?",
            default: true
        },
        {
            type: "input",
            name: "about",
            message: "Provide some information about yourself:",
            when: ({ confirmAbout }) => {
                if (confirmAbout) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    ]);
};

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
            message: "What is the name of your project?",
            validate: projectName => {
                if (projectName) {
                    return true;
                } else {
                    console.log('Please enter a name for your project.')
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "description",
            message: "Project description (Required):",
            validate: projectDescription => {
                if (projectDescription) {
                    return true;
                } else {
                    console.log('Please describe your project.');
                    return false;
                }
            }
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
            message: "Enter the GitHub link to your project. (Required)",
            validate: githubLink => {
                if (githubLink) {
                    return true;
                } else {
                    console.log('Please enter the GitHub link to your project.');
                    return false;
                }
            }
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

// const pageHTML = generate(mockData);
promptUser()
    .then(promptProject)
    .then(portfolioData => {
        return generatePage(portfolioData);
    })
    .then(pageHTML => {
        return writeFile(pageHTML);
    })
    .then(writeFileResponse => {
        console.log(writeFileResponse);
        return copyFile();
    })
    .then(copyFileResponse => {
        console.log(copyFileResponse);
    })
    .catch(err => {
        console.log(err);
    });

    //     fs.writeFile("./dist/index.html", pageHTML, err => {
    //         if (err) {
    //             console.log(err);
    //             return;
    //         }

    //         console.log("Page created! View index.html in this directory.");

    //         fs.copyFile("./src/style.css", "./dist/style.css", err => {
    //             if (err) {
    //                 console.log(err);
    //                 return;
    //             }
    //             console.log("Style sheeet copied successfully");
    //         });
    //     });
    // });