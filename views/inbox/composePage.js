const template = require('../template');

module.exports = ({ req, users }) => {
    const userList = users.map(user => {
        return `<input name="receivers" type="checkbox" value="${user.id}">${user.firstname} ${user.lastname}</input>`
    }).join('<br />');

    return template({
        req,
        content: `
        <div>Compose a new message</div> 
        <br />
        <div>
            <form method="POST">
            <input type="hidden" name="senderId" value="${req.session.user.id}">
            <label>Receiver</label>
            <br />
            ${userList}
            <br />
            <label>Title</label>
            <br />
            <input name="title" />
            <br />
            <label>Type the message:</label>
            <br />
            <textarea name="content" /></textarea>
            <br />
            <button type="submit">Send message</button>
            </form>
        </div>
        `
    })
}