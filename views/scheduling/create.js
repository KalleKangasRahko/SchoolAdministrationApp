const template = require('../template');
const getSubject = require('../../utils');
const axios = require('axios');

module.exports = ({ req, teachers, errors, classes, tableId }) => {
    // List of classes we tried to book earlier
    let classesString = JSON.stringify(classes);
    if (classesString !== undefined) {
        classesString = classesString.slice(1, -1);
    }
    else {
        classesString = '';
    }
    console.log(classes);
    // We slice off the brackets so the timetable-variable in the <script> doesn't become an array of arrays

    // List of teachers
    const teacherList = teachers.map(teacher => {
        return `<option value='${teacher.id}'>${teacher.firstname}  ${teacher.lastname}</option>`
    }).join('');

    // List of teachers as an array of objects, for the <script>-section
    const teacherObjects = [];
    for (item of teachers) {
        teacherObjects.push(item);
    };

    // Possible errors if we return to the page after trying to book a taken teacher or classroom
    const getError = (errors, prop) => {
        // We use try-catch to avoid writing a ton of if-statements
        try {
            // .mapped() turns errors-array into an object with objects with keys corresponding to the prop names
            return errors.mapped()[prop].msg
        }
        catch (err) {
            return '';
        }
    }

    return template({
        req,
        content: `
        <div>
            <h2>Timetable editor</h2>
            <form id="classForm">
                <label>Weekday</label>
                <select id="weekdaySelector" class="required">
                    <option selected value=0>Choose a weekday...</option>
                    <option value=1>Monday</option>
                    <option value=2>Tuesday</option>
                    <option value=3>Wednesday</option>
                    <option value=4>Thursday</option>
                    <option value=5>Friday</option>
                </select>
                <br />
                <label>Slot</label>
                <select id="slotSelector">
                    <option selected value=1>08:00-08:45</option>
                    <option value=2>09:00-09:45</option>
                    <option value=3>10:00-10:45</option>
                    <option value=4>11:15-12:00</option>
                    <option value=5>12:15-13:00</option>
                    <option value=6>13:15-14:00</option>
                    <option value=7>14:15-15:00</option>
                </select>
                <br />
                <label>Teacher</label>
                <select id="teacherSelector" class="required">
                    <option selected value=0>Choose a teacher...</option>
                    ${teacherList}
                </select>
                <br />
                <label>Subject</label>
                <select id="subjectSelector" class="required">
                    <option selected value=0>Choose a subject...</option>
                    <option value=1>Finnish</option>
                    <option value=2>Mathematics</option>
                    <option value=3>Environmental studies</option>
                    <option value=4>Arts</option>
                    <option value=5>Crafts</option>
                    <option value=6>Music</option>
                    <option value=7>Physical education</option>
                    <option value=8>English</option>
                    <option value=9>Swedish</option>
                    <option value=10>Biology</option>
                    <option value=11>Geography</option>
                    <option value=12>Social studies</option>
                    <option value=13>Health education</option>
                    <option value=14>Woodworking</option>
                    <option value=15>Metalworking</option>
                    <option value=16>Textile working</option>
                    <option value=17>History</option>
                    <option value=18>Religion</option>
                    <option value=19>Physics</option>
                    <option value=20>Chemistry</option>
                    <option value=21>Home economics</option>
                </select>
                <br />
                <label>Classroom</label>
                <select id="roomSelector" class="required">
                    <option selected value=0>Choose a classroom...</option>
                    <option value=1>Room 11</option>
                    <option value=2>Room 12</option>
                    <option value=3>Room 13</option>
                    <option value=4>Room 14</option>
                    <option value=5>Room 15</option>
                    <option value=6>Room 21</option>
                    <option value=7>Room 22</option>
                    <option value=8>Room 23</option>
                    <option value=9>Room 24</option>
                    <option value=10>Room 25</option>
                    <option value=11>Arts</option>
                    <option value=12>Crafts</option>
                    <option value=13>Woodshop</option>
                    <option value=14>Metalshop</option>
                    <option value=15>Music room</option>
                    <option value=16>Gym</option>
                    <option value=17>Lab</option>
                    <option value=18>Kitchen</option>
                </select>
                <br />
                ${getError(errors, 'classes')}
                <br />
                <button type="submit" id="addButton" disabled>Add class</button>
            </form>
        </div>
        <div>
            <!-- A hidden form, that contains the info for the timetable itself, as well as an array of the classes in it -->
            <form method="POST" id="timetableForm">
                <input type="hidden" name="author" value="${req.session.user.id}"></input>
                <input type="hidden" name="tableId" value="${tableId}"></input>
                <input type="hidden" name="classes" id="tableInput"></input>
                <button type="submit" id="saveButton" disabled>Save timetable</button>
            </form>
        </div>
        <div>
            <!-- An illustration of the timetable so you can see what you're working on -->
            <table>
                <thead>
                    <th></th>
                    <th>Monday</th><th>Tuesday</th><th>Wednesday</th><th>Thursday</th><th>Friday</th>
                </thead>
                <tbody id="tableTemplate">
                </tbody>
            </table>
        </div>
        <br />
        <div>
            <a href="/scheduling/manage"><button>Back</button></a>
        </div>

        <script>

            <!-- Variables  -->
            let timetable = [${classesString}];
            let tableInput = document.querySelector('#tableInput');
            let saveButton = document.querySelector('#saveButton');
            let addButton = document.querySelector('#addButton');

            let weekdaySelector = document.querySelector('#weekdaySelector');
            let slotSelector = document.querySelector('#slotSelector');
            let subjectSelector = document.querySelector('#subjectSelector');
            let roomSelector = document.querySelector('#roomSelector');
            let teacherSelector = document.querySelector('#teacherSelector');

            let tableTemplate = document.querySelector('#tableTemplate');

            <!-- Changing the weekday subtly changes the values in the slot-input -->
            weekdaySelector.addEventListener('change', event => {
                const day = parseInt(event.target.value);
                if (day === 1) {
                    slotSelector.innerHTML = '<option selected value=1>08:00-08:45</option><option value=2>09:00-09:45</option><option value=3>10:00-10:45</option><option value=4>11:15-12:00</option><option value=5>12:15-13:00</option><option value=6>13:15-14:00</option><option value=7>14:15-15:00</option>'
                }
                if (day === 2) {
                    slotSelector.innerHTML = '<option selected value=8>08:00-08:45</option><option value=9>09:00-09:45</option><option value=10>10:00-10:45</option><option value=11>11:15-12:00</option><option value=12>12:15-13:00</option><option value=13>13:15-14:00</option><option value=14>14:15-15:00</option>'
                }
                if (day === 3) {
                    slotSelector.innerHTML = '<option selected value=15>08:00-08:45</option><option value=16>09:00-09:45</option><option value=17>10:00-10:45</option><option value=18>11:15-12:00</option><option value=19>12:15-13:00</option><option value=20>13:15-14:00</option><option value=21>14:15-15:00</option>'
                }
                if (day === 4) {
                    slotSelector.innerHTML = '<option selected value=22>08:00-08:45</option><option value=23>09:00-09:45</option><option value=24>10:00-10:45</option><option value=25>11:15-12:00</option><option value=26>12:15-13:00</option><option value=27>13:15-14:00</option><option value=28>14:15-15:00</option>'
                }
                if (day === 5) {
                    slotSelector.innerHTML = '<option selected value=29>08:00-08:45</option><option value=30>09:00-09:45</option><option value=31>10:00-10:45</option><option value=32>11:15-12:00</option><option value=33>12:15-13:00</option><option value=34>13:15-14:00</option><option value=35>14:15-15:00</option>'
                }
            });

            <!-- Each input has to have a value chosen before you can add the class -->
            const selectors =  document.querySelectorAll('.required');
            selectors.forEach((selector) => {
                selector.addEventListener('change', event => {
                    addButton.disabled = false;
                    selectors.forEach((selector) => {
                        if (selector.value === '0') {
                            addButton.disabled = true;
                        }
                    })
                });
            });

            <!-- Adding the class to the timetable -->
            document.querySelector('#classForm').addEventListener('submit', event => {
                event.preventDefault();
                saveButton.disabled = false;
                const slot = parseInt(slotSelector.value);
                const subject = parseInt(subjectSelector.value);
                const room = parseInt(roomSelector.value);
                const teacher = teacherSelector.value;
                const tableId = '${tableId}';

                <!--The class is turned into an object that gets pushed into an array  -->
                let lesson;
                if (tableId === 'undefined') {
                    lesson = { slot, subject, room, teacher };
                }
                else {
                    lesson = { slot, subject, room, teacher, timetable: tableId };
                }

                <!--If you try add a class to an already taken slot, it gets overwritten -->
                let overwrite = false;
                for (i = 0; i < timetable.length; i++) {
                    if (timetable[i].slot === lesson.slot) {
                        timetable[i] = lesson;
                        overwrite = true;
                    }
                }
                if (!overwrite) {
                    timetable.push(lesson);
                }
                <!-- The array is saved into the hidden form on the page -->
                tableInput.value = JSON.stringify(timetable);
                drawTable();
            });

            <!-- Getting the name of the subject by number -->
            const getSubject = (i) => {
                const subjects = ['Finnish', 'Mathematics', 'Environmental studies', 'Arts', 'Crafts', 'Music', 'Physical education', 'English', 'Swedish', 
                                'Biology', 'Geography', 'Social studies', 'Health education', 'Woodworking', 'Metalworking', 'Textile working', 'History', 'Religion', 'Physics', 'Chemisty', 'Home economics'];
                return subjects[i-1];
            }

            <!-- Getting the name of the classroom by number -->
            const getRoom = (i) => {
                const classrooms = ['Room 11', 'Room 12', 'Room 13', 'Room 14', 'Room 15', 'Room 21', 'Room 22', 'Room 23', 'Room 24', 
                                'Room 25', 'Arts', 'Crafts', 'Woodshop', 'Metalshop', 'Music room', 'Gym', 'Lab', 'Kitchen'];
                return classrooms[i - 1];
            }

            <!-- Getting the name of the teacher by id -->
            const getTeacher = (id) => {
                const teachers = ${JSON.stringify(teacherObjects)};
                const teacher = teachers.find(item => item.id === id);
                const teacherString = teacher.firstname + ' ' + teacher.lastname;

                return teacherString;
            }

            <!-- A function that draws an illustration of the timetable -->
            const drawTable = () => {
                tableTemplate.innerHTML = '';

                let tableData = [];

                const hours = [
                    '<tr><td>08:00-08:45</td>',
                    '<tr><td>09:00-09:45</td>',
                    '<tr><td>10:00-10:45</td>',
                    '<tr><td>11:15-12:00</td>',
                    '<tr><td>12:15-13:00</td>',
                    '<tr><td>13:15-14:00</td>',
                    '<tr><td>14:15-15:00</td>',
                ];

                let slot = 1;

                <!-- Since the table is drawn row at a time, and not column, we must pull some tricks -->
                for (let i = 0; i < 7; i++) {
                    <!-- First thing on each row is the time -->
                    tableData.push(hours[i]);
                    for (let j = 0; j < 5; j++) {
                        <!-- We then move horizontally, going through the same timeslot on each day -->
                        for (let k = 0; k < timetable.length; k++) {
                            <!-- We iterate through the array of added classes -->
                            if (timetable[k].slot === slot) {
                                <!-- If there is a class allocated for this timeslot, it gets added to the table -->
                                tableData.push('<td>' + getSubject(timetable[k].subject) + '<br />' + getTeacher(timetable[k].teacher) + '<br />' + getRoom(timetable[k].room) + '</td>');
                                <!-- Then we also move on to the next slot and the next day -->
                                j++;
                                slot = slot + 7;
                            }
                            <!-- If there was an else-clause here, we would end up creating too many empty slot-markers -->
                        }
                        <!-- If there is no class for the slot, mark it as empty and move on to the next slot and day -->
                        if (j < 5) {
                            tableData.push('<td>Empty slot<br />No teacher<br />No room</td>');
                            slot = slot + 7;
                        }
                    }

                    <!-- This little calculation moves us to the next row of the table -->
                    slot = slot - 34;

                    tableData.push('</tr>');
                }

                const finalTable = tableData.map((item) => {
                    return item;
                }).join('');

                tableTemplate.innerHTML = finalTable;
            }
            
            drawTable();
        </script>
        `
    })
}