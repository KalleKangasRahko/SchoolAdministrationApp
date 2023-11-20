const template = require('./template');

module.exports = ({ req }) => {
    const user = req.session.user;
    return template({
        req,
        content: `
        <div>
            You are ${user.firstname} ${user.lastname}.
            </br>
            <a href="/logout">Log out</a>
        </div>
    `
    }
    );
}