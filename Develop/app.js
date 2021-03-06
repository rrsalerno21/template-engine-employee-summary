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
                },
                {
                    type: 'input',
                    name: 'id',
                    message: `What's the manager's id number?`,
                },
                {
                    type: 'input',
                    name: 'email',
                    message: `What's the manager's email?`,
                },
                {
                    type: 'input',
                    name: 'officeNumber',
                    message: `What's the manager's office number?`,
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
        const whichOne = await inquirer
            .prompt([
                {
                    name: 'typeOfEmployee',
                    type: 'list',
                    message: 'Which type of employee would you like to add?',
                    choices: ['Engineer', 'Intern']
                }
            ])
            
        return whichOne;

    } catch (error) {
        console.log(error);
    };
};

async function engineerPrompt() {
    try {
        const ePrompt = await inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'engName',
                    message: `What's the engineer's name?`,
                },
                {
                    type: 'input',
                    name: 'engId',
                    message: `What's the engineer's id number?`,
                },
                {
                    type: 'input',
                    name: 'engEmail',
                    message: `What's the engineer's email?`,
                },
                {
                    type: 'input',
                    name: 'github',
                    message: `What's the engineer's GitHub username?`,
                },
                {
                    type: 'confirm',
                    name:'addEmployee',
                    message:'Employee added.  Would you like to add another employee?'
                }
            ])
            
        return ePrompt;    
    } catch (error) {
        console.log(error);
    };
};

async function internPrompt() {
    try {
        const iPrompt = await inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'intName',
                    message: `What's the intern's name?`,
                },
                {
                    type: 'input',
                    name: 'intId',
                    message: `What's the intern's id number?`,
                },
                {
                    type: 'input',
                    name: 'intEmail',
                    message: `What's the intern's email?`,
                },
                {
                    type: 'input',
                    name: 'school',
                    message: `What's school does the intern's attend?`,
                },
                {
                    type: 'confirm',
                    name:'addEmployee',
                    message:'Employee added.  Would you like to add another employee?'
                }
            ])
            
            return iPrompt;
    } catch (error) {
        console.log(error);
    };
};

async function init() {
    const employees = [];

    const mPrompt = await managerPrompt();
    employees.push(new Manager(mPrompt.name, mPrompt.id, mPrompt.email, mPrompt.officeNumber))

    if (mPrompt.addEmployee) {
        let cont = true;
        while (cont) {
            const whichE = await whichEmployee();
            if (whichE.typeOfEmployee === 'Engineer') {
                const ePrompt = await engineerPrompt();
                employees.push(new Engineer(ePrompt.engName, ePrompt.engId, ePrompt.engEmail, ePrompt.github));
                if (!ePrompt.addEmployee) {
                    cont = false;
                    continue;
                }
            } else {
                const iPrompt = await internPrompt();
                employees.push(new Intern(iPrompt.intName, iPrompt.intId, iPrompt.intEmail, iPrompt.school));
                if (!iPrompt.addEmployee) {
                    cont = false;
                    continue;
                };
            };
        };
    }
    console.log(employees);
    const teamHTML = render(employees);
    fs.writeFile(outputPath, teamHTML, (err) => {
        if (err) throw err;
        console.log('Success');
    });
    console.log('Check out your directory to see your team.html file');
}

init();
