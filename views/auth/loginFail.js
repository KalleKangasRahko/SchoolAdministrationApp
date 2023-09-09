const template = require('../template');

module.exports = () => {
    return template({
        content: `
        <div>
            Login failed. Incorrect e-mail or password (or both).</br>
            <a href="/">Return to the login page</a>
        </div>
    `
    }
    );
}