const template = require('../template');
const { getSubject, getNote, getTimeBySlot } = require('../../utils');

module.exports = ({ req, notes }) => {
    const user = req.session.user;
    let tableRows;
    let notesTable = '';
    const tableHeaders = `<thead><th>Note</th><th>Class</th><th>Date</th><th>Time</th></thead>`;

    // A guardian might receive the notes of several people, if they have several kids in the school
    if (user.role === 2) {
        // This gets all the unique ids in the array.
        const set = [... new Set(notes.map((note) => note.studentId))];
        console.log(set);
        for (let i = 0; i < set.length; i++) {
            let name = notes[0].studentName;
            let noteArray = [];
            // We keep pushing classes into that header as long as the id doesn't change
            for (let j = 0; j < notes.length; j++) {
                if (notes[j].studentId === set[i]) {
                    noteArray.push(notes[j]);
                    name = notes[j].studentName;
                }
            }
            tableRows = noteArray.map((note) => {
                const date = note.date.slice(0, 10);
                return `<tr><td style="background-color: ${getNote(note.reason).color}">${getNote(note.reason).reason}</td>
                    <td>${getSubject(note.subject)}</td><td>${date}</td><td>${getTimeBySlot(note.slot)}</td></tr>`;
            }).join('');
            notesTable = notesTable + `<h3>Notes of ${name}</h3><br /><table>${tableHeaders}${tableRows}</table>`;
        }
    }
    // Otherwise we're just dealing with a student, who only gets their own notes
    else if (user.role === 3) {
        const header = `<h3>Notes of ${req.session.user.firstname} ${req.session.user.lastname}</h3>`;
        tableRows = notes.map((note) => {
            const date = note.date.slice(0, 10);
            return `<tr><td style="background-color: ${getNote(note.reason).color}">${getNote(note.reason).reason}</td>
                <td>${getSubject(note.subject)}</td><td>${date}</td><td>${getTimeBySlot(note.slot)}</td></tr>`;
        }).join('');
        notesTable = `${header}<br /><table>${tableHeaders}<tbody>${tableRows}</tbody></table>`;
    }
    else {
        notesTable = '';
    }

    return template({
        req,
        content: `
        <div>
            ${notesTable}
        </div>
        `
    })
}