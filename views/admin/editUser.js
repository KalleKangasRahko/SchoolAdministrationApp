const template = require('../template');

module.exports = ({ req, user }) => {
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
        <label>Last name</label>
            <input name="lastname" value="${user.lastname}"/>
        <label>Address</label>
            <input name="address" value="${user.address}"/>
        <label>Phone number</label>
            <input name="phonenum" value="${user.phonenum}"/>
        `
    }

    // Grades-selector for student-users
    let grades = '';
    if (user.role === 3) {
        let gradeOptions = [];
        for (let i = 1; i < 10; i++) {
            let gradeOption;
            if (i === parseInt(user.grade)) {
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
            <label>Password</label>
                <input name="password" value="${user.password}"/>
            <label>Role</label>
                <select name="role">
                    <option value="${user.role}" selected>${role}</option>
                </select>
            ${personalInfo}
            ${grades}
            </br>
            <button type="submit">Submit</button>
        </form>
        <a href="/admin">
            <button>Cancel</button>
        </a>
    </div>
    `
    }
    );
}