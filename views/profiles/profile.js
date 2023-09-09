const template = require('../template');

module.exports = ({ req, user }) => {
    return template({
        req,
        content: `
        <div>
            ${user.firstname} ${user.lastname}
        </div>
    `
    }
    );
}