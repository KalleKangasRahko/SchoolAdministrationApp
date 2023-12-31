const template = require('../template');

module.exports = ({ req, messages }) => {
    const user = req.session.user;
    
    // Removing duplicate messages so each thread only shows up once
    const threads = messages.map(( { thread }) => thread);
    const filteredMessages = messages.filter(({ thread }, index) => 
        !threads.includes(thread, index + 1));
    messages = filteredMessages;
    
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
                <td><a href="/inbox/thread/${message.thread}">${title}</a></td>
                <td><a href="/profiles/${message.senderId}">${message.sender}</td>
                <td>${message.timeAndDate}</td>
            </tr>
        `;
    }).join('');
    return template({
        req,
        content: `
        <div><h3>Messages for ${user.firstname}<h3></div>
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