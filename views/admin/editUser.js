const template = require('../template');

const getError = (errors, prop) => {
    // We use try-catch to avoid writing a ton of if-statements
    try {
        // .mapped() turns errors-array into an object with objects with keys corresponding to the prop names
        return errors.mapped()[prop].msg
    }
    catch (err) {
        return '';
    }
};

module.exports = ({ req, user, errors }) => {
    let role;
    switch (user.role) {
        case 0:
            role = 'Admin';
            break;
        case 1:
            role = 'Teacher';
            break;
        case 2:
            role = 'Guardian';
            break;
        case 3:
            role = 'Student';
            break;
    }

    // Personal information-inputs for all but the admins
    let personalInfo = '';
    if (user.role !== 0) {
        personalInfo = `
        <label>First name</label>
            <input name="firstname" value="${user.firstname}"/>            
            ${getError(errors, 'firstname')}
        <label>Last name</label>
            <input name="lastname" value="${user.lastname}"/>
            ${getError(errors, 'lastname')}
        <label>Address</label>
            <input name="address" value="${user.address}"/>
            ${getError(errors, 'address')}
        <label>Phone number</label>
            <input name="phonenum" value="${user.phonenum}"/>
            ${getError(errors, 'phonenum')}
        `
    }

    // Button for guardians for adding or removing children
    let childrenButton = '';
    if (user.role === 2) {
        childrenButton = `<a href="/admin/edit/children/${user.id}">
            <button>Add or remove children</button></a>`;
    }

    // Grades-selector for student-users
    let grades = '';
    if (user.role === 1 || user.role === 3) {
        let gradeOptions = [];
        for (let i = 0; i < 10; i++) {
            let gradeOption;
            if (i === parseInt(user.ownGrade)) {
                gradeOption = `<option value=${i} selected>${i}</option>`
            }
            else {
                gradeOption = `<option value=${i}>${i}</option>`
            }
            gradeOptions.push(gradeOption);
        };
        const list = gradeOptions.map(grade => {
            return grade;
        }).join('');
        grades = `
            <label>Grade</label>
            <select name="grade" value=${user.grade}>
                ${list}
            </select>
        `
    }
    return template({
        req, 
        content: `
        <div>
        <h3>Edit user:</h3>
        <form method="POST">
            <label>E-mail</label>
                <input name="email" value="${user.email}"/>
                ${getError(errors, 'email')}
            <label>Password</label>
                <input name="password" type="password"/>
                ${getError(errors, 'password')}
                <select hidden name="role">
                    <option value="${user.role}" selected>${role}</option>
                </select>
            ${personalInfo}
            ${grades}
            </br>
            <button type="submit">Submit</button>
        </form>
        ${childrenButton}
        <a href="/admin">
            <button>Back</button>
        </a>
    </div>
    `
    }
    );
}