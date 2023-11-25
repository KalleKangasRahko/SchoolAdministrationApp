module.exports = ({ req, content }) => {
    const user = req.session.user;
    let userData;
    let timetables;

    // Only an admin gets to see the list of all users and the options to manage it
    if (user && user.role === 0) {
        usersLink = '<a href="/admin">Users</a>';
    }
    else {
        usersLink = '';
    }

    // Link that only a teacher (or an admin) can see
    let teacherLinks;
    if (user && user.role < 2) {
        teacherLinks = '<a href="/profiles/students">Students</a>'
    }
    else {
        teacherLinks = '';
    }

    let notesLink;
    if (user && user.role > 1) {
        notesLink = `<a href="/notation/notes/${user.id}">Notes</a>`;
    }
    else {  
        notesLink = '';
    }

    let userInfo;
    if (req.session.user) {
        userInfo = `Logged in as ${user.firstname} ${user.lastname} <a href='/logout'>Log out</a>
        ${usersLink} <a href="/inbox/user/${user.id}">Messages</a> ${notesLink} <a href="/scheduling">Timetables</a> ${teacherLinks}`
    }
    else {
        userInfo = '';
    }

    return `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <title>School app</title>
        </head>
        <body>
            <h2>Tremendous School Administration Application</h2>
            <h4>${userInfo}</h4>
            ${content}
        </body>
    </html>
    `
}