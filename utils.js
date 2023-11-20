const crypto = require('crypto');
const util = require('util');
const scrypt = util.promisify(crypto.scrypt);

// Function for encrypting the password before sending it to the db
const cryptPassword = async (password) => {
    // Generate a salt for the password
    const salt = crypto.randomBytes(8).toString('hex');
    // Combine the salt and the password and hash it
    const buf = await scrypt(password, salt, 64);
    // We store into the db the password + salt, hashed together, as well as the salt, separated with a dot
    const hashed = `${buf.toString('hex')}.${salt}`;
    return hashed;
}

// Comparing password used for the login attempt to the one for the same user in db
const comparePasswords = async (saved, supplied) => {
    // Saved is the password in the db, supplied is the one used in a login attempt
    const [hashed, salt] = saved.split('.');
    // Hashed is the original password + salt, hashed, salt is the salt that was hashed with original password
    const hashedSupplied = await scrypt(supplied, salt, 64);
    // If the supplied + salt = hashed, then the password is correct
    return hashed === hashedSupplied.toString('hex');
}

const getSubject = (i) => {
    const subjects = ['Finnish', 'Mathematics', 'Environmental studies', 'Arts', 'Crafts', 'Music', 'Physical education', 'English', 'Swedish',
        'Biology', 'Geography', 'Social studies', 'Health education', 'Woodworking', 'Metalworking', 'Textile working', 'History', 'Religion'];
    return subjects[i - 1];
}

const getRoom = (i) => {
    const classrooms = ['Room 11', 'Room 12', 'Room 13', 'Room 14', 'Room 15', 'Room 21', 'Room 22', 'Room 23', 'Room 24', 'Room 25', 'Arts', 'Crafts', 'Woodshop', 'Metalshop', 'Music room', 'Gym'];
    return classrooms[i - 1];
}

const drawTimetable = (classes) => {

    const hours = [
        '<tr><td>08:00-08:45</td>',
        '<tr><td>09:00-09:45</td>',
        '<tr><td>10:00-10:45</td>',
        '<tr><td>11:15-12:00</td>',
        '<tr><td>12:15-13:00</td>',
        '<tr><td>13:15-14:00</td>',
        '<tr><td>14:15-15:00</td>',
    ];

    let tableData = [];
    let slot = 1;

    // Since the table is drawn row at a time, and not column, we must pull some tricks
    for (let i = 0; i < 7; i++) {
        // First thing on each row is the time
        tableData.push(hours[i]);
        for (let j = 0; j < 5; j++) {
            // We then move horizontally, going through the same timeslot on each day 
            for (let k = 0; k < classes.length; k++) {
                // We iterate through the array of added classes
                if (classes[k].slot === slot) {
                    // If there is a class allocated for this timeslot, it gets added to the table
                    tableData.push(`<td>${getSubject(classes[k].subject)}<br />${getRoom(classes[k].room)}<br />${classes[k].teacherName}</td>`);
                    // Then we also move on to the next slot and the next day
                    j++;
                    slot = slot + 7;
                }
                // If there was an else-clause here, we would end up creating too many empty slot-markers
            }
            // If there is no class for the slot, mark it as empty and move on to the next slot and day 
            if (j < 5) {
                tableData.push('<td></td>');
                slot = slot + 7;
            }
        }

        // This little calculation moves us to the next row of the table
        slot = slot - 34;

        tableData.push('</tr>');
    }

    const mappedClasses = tableData.map((item) => {
        return item;
    }).join('');

    const timetable = `<table>
                        <thead><th></th><th>Monday</th><th>Tuesday</th><th>Wednesday</th><th>Thursday</th><th>Friday</th></thead>
                        <tbody>${mappedClasses}</tbody>
                    </table>`

    return timetable;
}

module.exports = {
    cryptPassword, comparePasswords, getSubject, getRoom, drawTimetable
}