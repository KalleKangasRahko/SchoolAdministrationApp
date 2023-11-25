const template = require('./template');

module.exports = ({ req }) => {
    return template({
        req,
        content: `
        <div>
            This page is not for your access. <a href="/">Return to the front page</a>
        </div>
    `
    }
    );
}