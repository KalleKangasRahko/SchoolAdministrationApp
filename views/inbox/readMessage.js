const template = require('../template');

module.exports = ({ req, messages }) => {
    const user = req.session.user;
    const shownMessages = messages.map((message) => {
        return `<div><h4>${message.sender} wrote:</h4></div><div><p>${message.content}</p></div>`;
    }).join('');

    // To cut corners the receiver of the reply is always automatically the person who last wrote to this thread.
    const lastIndex = messages.length - 1;
    const receiver = messages[lastIndex].senderId;

    return template({
        req,
        content: `
            <div>
                <h2>${messages[0].title}</h3>
            </div>
            ${shownMessages}
            <br />
            <div>
                <form method="POST" action="/inbox/compose">
                <input type="hidden" name="title" value="${messages[0].title}" />
                <input type="hidden" name="thread" value="${messages[0].thread}" />
                <input type="hidden" name="senderId" value="${user.id}" />
                <input type="hidden" name="receivers" value="${receiver}" />
                <textarea name="content"></textarea><br />
                <button type="submit">Send response</button></form>
            </div>
            <br />
            <div>
                <a href="/inbox/user/${user.id}"><button>Back</button></a>
            </div>
        `
    })
}