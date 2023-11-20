module.exports = ({ req, content }) => {
    const user = req.session.user;
    let userData;
    let timetables;

    if (user && user.role === 0) {
        userData = '<a href="/admin">Users</a>';
    }
    else {
        userData = '';
    }

    let userInfo;

    if (req.session.user) {
        userInfo = `Logged in as ${user.firstname} ${user.lastname} <a href='/logout'>Log out</a>
        ${userData} <a href="/inbox/user/${user.id}">Messages</a> <a href="/scheduling">Timetables</a>`
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