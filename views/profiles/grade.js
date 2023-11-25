const template = require('../template');

module.exports = ({ req, students }) => {
    const studentList = students.map((student) => {
        return `<tr><td><a href="/profiles/user/${student.id}">${student.lastname}, ${student.firstname}</a></td></tr>`
    }).join('');

    return template({
        req,
        content: `
        <div>
            <h3>Grade ${req.params.grade}</h3>
        </div>
        <div>
            <table>
                ${studentList}
            </table>
        </div>
        `
    })
}