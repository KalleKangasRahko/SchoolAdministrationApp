const template = require('../template');

module.exports = ({ req }) => {
    return template({
        req,
        content: `
        <div>
            <h3>Students by grade</h3>
        </div>
        <div>
            <table>
            <thead>
                <th>Grade</th><th>Timetable</th><th>Notes</th>
            </thead>
            <tbody>
                <tr><td><a href="/profiles/students/grade/1">1</a></td><td><a href="/scheduling/grade/1">Timetable</a></td><td><a href="/notation/grade/1">Notes</a></td></tr>
                <tr><td><a href="/profiles/students/grade/2">2</a></td><td><a href="/scheduling/grade/2">Timetable</a></td><td><a href="/notation/grade/2">Notes</a></td></tr>
                <tr><td><a href="/profiles/students/grade/3">3</a></td><td><a href="/scheduling/grade/3">Timetable</a></td><td><a href="/notation/grade/3">Notes</a></td></tr>
                <tr><td><a href="/profiles/students/grade/4">4</a></td><td><a href="/scheduling/grade/4">Timetable</a></td><td><a href="/notation/grade/4">Notes</a></td></tr>
                <tr><td><a href="/profiles/students/grade/5">5</a></td><td><a href="/scheduling/grade/5">Timetable</a></td><td><a href="/notation/grade/5">Notes</a></td></tr>
                <tr><td><a href="/profiles/students/grade/6">6</a></td><td><a href="/scheduling/grade/6">Timetable</a></td><td><a href="/notation/grade/6">Notes</a></td></tr>
                <tr><td><a href="/profiles/students/grade/7">7</a></td><td><a href="/scheduling/grade/7">Timetable</a></td><td><a href="/notation/grade/7">Notes</a></td></tr>
                <tr><td><a href="/profiles/students/grade/8">8</a></td><td><a href="/scheduling/grade/8">Timetable</a></td><td><a href="/notation/grade/8">Notes</a></td></tr>
                <tr><td><a href="/profiles/students/grade/9">9</a></td><td><a href="/scheduling/grade/9">Timetable</a></td><td><a href="/notation/grade/9">Notes</a></td></tr>
            </tbody>    
            </table>
        </div>
        `
    });
}