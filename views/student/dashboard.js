const template = require('../template');

module.exports = ({ req }) => {
    const user = req.session.user;
    return template({
        req,
        content: `
        <div>
            Welcome student. You are logged in as ${user.firstname} ${user.lastname}, role ${user.role}
            </br>
            <a href="/logout">Log out</a>
        </div>
    `
    }
    );
}