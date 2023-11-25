const template = require('../template');
const { drawTimetable } = require('../../utils');

module.exports = ({ req, personalTable }) => {
    const table = drawTimetable(personalTable);
    const header = `<h3>Timetable for grade ${req.params.grade}</h3>`;

    return template({
        req,
        content: `
            <div>
                <br />
                    ${header}
                <br />
                    ${table}
            </div>
        `
    })
}