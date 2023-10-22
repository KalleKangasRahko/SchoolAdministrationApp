const template = require('../template');

module.exports = ({ req, message }) => {
    const user = req.session.user;

    return template({
        req,
        content: `
            <div>
                <h2>${message.title}</h3>
            </div>
            <div>
                <h3>Sent by ${message.sender}</h3>
            </div>
            <div>
                <h4>${message.content}</h5>
            </div>
            <div>
                <a href="/inbox/user/${user.id}"><button>Back</button></a>
                <a href=""><button>Respond</button></a>
            </div>
        `
    })
}