const template = require('../template');

module.exports = ({ req, tables }) => {

    const tableList = tables.map((table) => {
        return `<tr><td><a href="/scheduling/manage/${table.id}">${table.id}</a></td><td><a href="/profiles/${table.author}">${table.authorName}</a>
                </td><td>${table.grade}</td><td><a href="/scheduling/edit/${table.id}"><button>Edit</button></a></td><td>${table.edited}</td></tr>`;
    }).join('');

    return template({
        req,
        content: `
            <div>
                <h3>Timetables</h3>
            </div>
            <div>
                <a href="/scheduling/create">Create a new timetable</a>
            </div>
            <br />
            <div>
                <table>
                    <thead>
                        <th>Id</th>
                        <th>Last editor</th>
                        <th>Grade</th>
                        <th></th>
                        <th>Last edited</th>
                    </thead>
                    <tbody>
                        ${tableList}
                    </tbody>
                </table>
            </div>
        `
    })
}