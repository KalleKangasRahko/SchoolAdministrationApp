module.exports = ({ req, content }) => {
    let userInfo;
    if (req.session.user) {
        userInfo = `Logged in as ${req.session.user.firstname} ${req.session.user.lastname} <a href='/logout'>Log out</a>
        <a href="/inbox/user/${req.session.user.id}">Messages</a>`
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