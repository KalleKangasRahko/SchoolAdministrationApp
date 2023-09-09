const template = require('./template');

module.exports = ({ req, role }) => {
    return template({
        req,
        content: `
        <div>
            This page is only for ${role}-type users. Please go away.
        </div>
    `
    }
    );
}