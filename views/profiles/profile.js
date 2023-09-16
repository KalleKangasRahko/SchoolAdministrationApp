const { add } = require('nodemon/lib/rules');
const template = require('../template');

module.exports = ({ req, user }) => {   
    console.log('heres the user:');
    const userArray = user;
    user = user[0];
    let addressAndPhone;
    let grade;
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

    // If the user is a guardian, show their children
    if (user.role === 2) {
        const items = userArray.map(item => {
            return `<li>${item.child}, grade ${item.grade}</li>`;
        }).join('');

        children = `<h4>Children</h4>
                    <ul>${items}</ul>`
    }
    else {
        children = '';
    }

    // If the user is a student, show their guardians
    if (user.role === 3) {
        grade = `<li>Grade ${user.ownGrade}</li>`
        const items = userArray.map(item => {
            return `<li>${item.parent}</li>`
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