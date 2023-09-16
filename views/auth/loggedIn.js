const template = require('../template');

module.exports = ({ req }) => {
    let dashboard;
    const user = req.session.user;
    switch (user.role) {
        case 0:
            dashboard = `<a href='/admin'>dashboard</a>`;
            break;
        case 1:
            dashboard = `<a href='/teacher'>dashboard</a>`;
            break;
        case 2:
            dashboard = `<a href='/guardian'>dashboard</a>`;
            break;
        case 3:
            dashboard = `<a href='/student'>dashboard</a>`;
            break;
    }

    return template({
        req,
        content: `
        <div>
            You are logged in as ${user.firstname} ${user.lastname}. Continue to ${dashboard} or <a href="/logout">log out</a>.
        </div>
    `
    }
    );
}