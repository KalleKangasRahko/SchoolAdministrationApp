const template = require('../template');
const { drawTimetable } = require('../../utils');

module.exports = ({ req, personalTable }) => {
    let manageLink;

    if (req.session.user.role === 2 || req.session.user.role === 3) {
        manageLink = '';
    }
    else {
        manageLink = '<div><a href="/scheduling/manage">Manage timetables</a></div>';
    }

    let table = '';
    let header;

    // All the other user types only receive one timetable, but the Guardian might receive several. One per child.
    // They all arrive as one array of objects, so we need to separate them into distinct timetables.
    if (req.session.user.role === 2) {
        header = '';
        // This gets all the unique ids in the array.
        const set = [... new Set(personalTable.map((student) => student.id))];

        // For each distinct id in the set-array we draw a table
        for (let i = 0; i < set.length; i++) {
            let name = personalTable[0].firstname + ' ' + personalTable[0].lastname;
            // Then we create an empty array
            let classes = [];
            // We keep pushing classes into that header as long as the id doesn't change
            for (let j = 0; j < personalTable.length; j++) {
                if (personalTable[j].id === set[i]) {
                    classes.push(personalTable[j]);
                    name = personalTable[j].firstname + ' ' + personalTable[j].lastname;
                }
            }
            // Then we draw a timetable based on that array
            const drawnTable = drawTimetable(classes);
            // First we add a header
            table = table + `<br />Timetable of ${name}<br/>`;
            // Then we add that table into our HTML-string
            table = table + drawnTable;
        }
    }
    else {
        table = drawTimetable(personalTable);
        header = `Timetable of ${req.session.user.firstname} ${req.session.user.lastname}`;
    }

    return template({
        req,
        content: `
        ${manageLink}
            <div>
                <br />
                    ${header}
                <br />
                    ${table}
            </div>
        `
    })
}