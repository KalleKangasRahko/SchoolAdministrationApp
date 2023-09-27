const template = require('../template');

module.exports = ({ req, user }) => {   
    const userArray = user;
    user = user[0];
    let addressAndPhone;
    let grade;
    let teacherInfo;
    let children;
    let guardians;

    // If the user is not an admin, show their personal info
    if (user.role > 0) {
        addressAndPhone = `
            <li>Address: ${user.address}</li>
            <li>Phone number: ${user.phonenum}</li>
            `;
    }
    else {
        addressAndPhone = '';
    }

    // If the user is a teacher, show relevant info
    if (user.role === 1 && user.ownGrade > 0) {
        teacherInfo = `<h4>Grade ${user.ownGrade} class supervisor</h4>`;
    }
    else {
        teacherInfo = '';
    }

    // If the user is a guardian, show their children
    if (user.role === 2 && user.childId !== null) {
        const items = userArray.map(item => {
            return `<li><a href="/profiles/${item.childId}">${item.child}</a>, grade ${item.grade}</li>`;
        }).join('');

        children = `<h4>Children</h4>
                    <ul>${items}</ul>`
    }
    else if (user.role === 2){
        children = '<h4>Children</h4><h4>No children assigned, yet</h4>';
    }
    else {
        children = '';
    }

    // If the user is a student, show their guardians
    if (user.role === 3) {
        grade = `<li>Grade ${user.ownGrade}</li>`
        const items = userArray.map(item => {
            return `<li><a href="/profiles/${item.parentId}">${item.parent}</a></li>`
        }).join('');

        guardians = `<h4>Guardians</h4>
                     <ul>${items}</ul>`
    }
    else {
        grade = '';
        guardians = '';
    }

    return template({
        req,
        content: `
        <div>
            <h3>${user.firstname} ${user.lastname}</h3>
            ${teacherInfo}
            <ul>
                ${addressAndPhone}
                ${grade}
            </ul>
            ${children}
            ${guardians}
        </div>
        <div>
            <a href="/admin">Back to the list</a>
        </div>
    `
    }
    );
}