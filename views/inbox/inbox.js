const template = require('../template');

module.exports = ({ req, messages }) => {
    const user = req.session.user;
    const messageList = messages.map(message => {
        let title;
        if (!message.opened) {
            title = `<b>${message.title}</b>`;
        }
        else {
            title = message.title;
        }

        return `
                <tr>
                    <td><a href="/inbox/message/${message.id}">${title}</a></td>
                    <td><a href="/profiles/${message.senderId}">${message.sender}</td>
                    <td>${message.timeAndDate}</td>
                </tr>
        `
    })
    return template({
        req,
        content: `
        <div>Messages for ${user.firstname}</div>
        <div><a href="/inbox/compose">Write a new message</a></div>
        <div>
            <table>
                <thead>
                    <th>Title</th>
                    <th>Sent by</th>
                    <th>Date and time</th>
                </thead>
                <tbody>
                    ${messageList}
                </tbody>
            </table>
        </div>
        `
    })
}