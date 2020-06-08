const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

async function managerPrompt() {
    try {
        const mangPrompt = await inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'name',
                    message: `What's the manager's name?`,
                    default: 'Rocky'
                },
                {
                    type: 'input',
                    name: 'id',
                    message: `What's the manager's id number?`,
                    default: '123'
                },
                {
                    type: 'input',
                    name: 'email',
                    message: `What's the manager's email?`,
                    default: 'test@gmail.com'
                },
                {
                    type: 'input',
                    name: 'officeNumber',
                    message: `What's the manager's office number?`,
                    default: 'AB789'
                },
                {
                    type: 'confirm',
                    name:'addEmployee',
                    message:'Would you like to add an employee?'
                }
            ])

        return mangPrompt;
    } catch (error) {
        console.log(error);
    }
};



async function whichEmployee() {
    try {
        await inquirer
            .prompt([
                {
                    name: 'typeOfEmployee',
                    type: 'list',
                    message: 'Which type of employee would you like to add?',
                    choices: ['Engineer', 'Intern']
                }
            ])
            .then(answers => {
                console.log(answers);
                return answers;
            })
            .catch(error => {
                if (error.isTtyError) {
                    console.log(`Prompt couldn't be rendered in the current environment`);
                } else {
                    console.log(error);
                    console.log('Something is wrong');
                }
            });
    } catch (error) {
        console.log(error);
    };
};

async function engineerPrompt() {
    try {
        await inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'engName',
                    message: `What's the engineer's name?`,
                    default: 'Engineer Rocky'
                },
                {
                    type: 'input',
                    name: 'engId',
                    message: `What's the engineer's id number?`,
                    default: 'eng345'
                },
                {
                    type: 'input',
                    name: 'engEmail',
                    message: `What's the engineer's email?`,
                    default: 'engtest@gmail.com'
                },
                {
                    type: 'input',
                    name: 'github',
                    message: `What's the engineer's GitHub username?`,
                    default: 'rrsalerno21'
                },
                {
                    type: 'confirm',
                    name:'addEmployee',
                    message:'Employee added.  Would you like to add another employee?'
                }
            ])
            .then(answers => {
                const engineer = new Engineer(answers.engName, answers.engId, answers.engEmail, answers.github);
                employees.push(engineer);
                console.log(employees);
                return answers;
            })
            .catch(error => {
                if (error.isTtyError) {
                    console.log(`Prompt couldn't be rendered in the current environment`);
                } else {
                    console.log(error);
                    console.log('Something is wrong');
                }
            });
    } catch (error) {
        console.log(error);
    };
};

async function internPrompt() {
    try {
        await inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'intName',
                    message: `What's the intern's name?`,
                    default: 'Intern Rocky'
                },
                {
                    type: 'input',
                    name: 'intId',
                    message: `What's the intern's id number?`,
                    default: 'int678'
                },
                {
                    type: 'input',
                    name: 'intEmail',
                    message: `What's the intern's email?`,
                    default: 'inttest@gmail.com'
                },
                {
                    type: 'input',
                    name: 'school',
                    message: `What's school does the intern's attend?`,
                    default: 'UC Santa Barbara'
                },
                {
                    type: 'confirm',
                    name:'addEmployee',
                    message:'Employee added.  Would you like to add another employee?'
                }
            ])
            .then(answers => {
                console.log(answers);
                const intern = new Intern(answers.intName, answers.intId, answers.intEmail, answers.school);
                employees.push(intern);
                console.log(employees);
                return answers;
            })
            .catch(error => {
                if (error.isTtyError) {
                    console.log(`Prompt couldn't be rendered in the current environment`);
                } else {
                    console.log(error);
                    console.log('Something is wrong');
                }
            });
    } catch (error) {
        console.log(error);
    };
};

async function init() {
    const employees = [];

    const mPrompt = await managerPrompt();
    console.log(mPrompt);

    if (mPrompt.addEmployee) {
        console.log('here we go');
    }
    // const whichE = await whichEmployee();
    // const ePrompt = await engineerPrompt();
    // const iPrompt= await internPrompt();
}

init();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
