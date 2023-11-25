const template = require('../template');
const { getSubjectShort } = require('../../utils');

module.exports = ({ req, classes, students, notes }) => {
    console.log(notes);

    // Current date for the date-selector
    const today = () => {
        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth();
        month++;
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
    }

    return template({
        req,
        content: `
        <div>
            <h3>Notes for grade ${req.params.grade}</h3>
        </div>
        <div>
            <input type="date" id="dateSelector" value="${today()}">
        </div>
        <br />
        <div>
            <form id="addNoteForm">
                <label>Note:</label>
                <select id="noteSelector">

                </select>
                <br />
                <br />
                <button>Add note</button>
            </form>
        </div>
        <br />
        <div>
            <table>
                <thead>
                    <tr><td>Name</td><td>Grade</td><td>08:00</td><td>09:00</td><td>10:00</td><td>11:00</td><td>12:00</td><td>13:00</td><td>14:00</td>
                </thead>
                <tbody id="classTable">
                </tbody>
            </table>
        </div>
        <div>
            <form method="POST" id="saveNotesForm">
                <input type="hidden" name="notes" id="notesInput"></input>
                <button type="submit">Save notes</button>
            </form>
        </div>

        <script>
            <!-- Assigning relevant variables -->
            const classes = ${JSON.stringify(classes)};
            const students = ${JSON.stringify(students)};
            const notes = ${JSON.stringify(notes)};
            const dateSelector = document.querySelector('#dateSelector');
            const noteSelector = document.querySelector('#noteSelector');
            const timetable = document.querySelector('#classTable');

            <!-- Getting the day of the week so that we end showing a correct timetable -->
            const date = new Date();
            let weekday = date.getDay();
            
            <!-- Capturing what slot was clicked -->
            let recentClick;

            const getSubjectShort = (i) => {
                const subjects = ['-', 'FIN', 'MATH', 'ENV', 'ART', 'CRFT', 'MU', 'PE', 'ENG', 'SWE', 'BIO', 'GEO', 'SOC', 'HE', 'WOOD', 'MTL', 'TXTL', 'HIS', 'REL'];
                return subjects[i];
            }

            const legend = [
                { reason: 'No note', color: 'white' },
                { reason: 'Absent, no clearance', color: 'yellow' },
                { reason: 'Absent, clearance', color: 'cyan' },
                { reason: 'Late for class', color: 'orange' },
                { reason: 'Homework not done', color: 'blueviolet' },
                { reason: 'Misbehaviour', color: 'red' },
                { reason: 'Excellent work', color: 'green' }
            ]

            const createNoteSelector = () => {
                const options = legend.map((note, index) => {
                    return '<option value=' + index + '>' + note.reason + '</option>'
                }).join('');
                noteSelector.innerHTML = options;
            }
            createNoteSelector();

            const getNotes = (slot, student) => {

                let string;
                const note = notes.find(note => note.studentId === student && note.noteSlot === slot);

                const selectedDate = dateSelector.value;

                if (note) {
                    const date = new Date(note.date);
                    let day = date.getDate();
                    let month = date.getMonth();
                    month++;
                    const year = date.getFullYear();
                    const noteDateString = year + '-' + month + '-' + day;

                    if (selectedDate === noteDateString) {
                        const color = legend[note.reason].color;
                        string = 'style="background-color:' + color + '"';
                    }
                }
                else {
                    string = '';
                }

                return string;
            }

            const drawClasses = (day, student) => {
                let todaysClasses;
                switch (day) {
                case 1:
                    todaysClasses = classes.slice(0, 7);
                    break;
                case 2:
                    todaysClasses = classes.slice(7, 14);
                    break;
                case 3:
                    todaysClasses = classes.slice(14, 21);
                    break;
                case 4:
                    todaysClasses = classes.slice(21, 28);
                    break;
                case 5:
                    todaysClasses = classes.slice(28, 35);
                    break;
                case 6:
                case 0:
                    return '';
                }
                return todaysClasses.map(lesson => {
                    const color = getNotes(lesson.slot, student);
                    return '<td ' + color + ' class="classSlot" id="' + lesson.slot + '">' + getSubjectShort(lesson.subject) + '</td>';
                }).join('');
            } 

            const drawTable = (weekday) => {
                const tableData = students.map(student => {
                    const string = '<tr class="studentRow" id="' + student.studentId + '"><td>' + student.studentName + '</td><td>${req.params.grade}</td>' + drawClasses(weekday, student.studentId) + '</tr>';
                    return string;
                }).join('');
                document.querySelector('#classTable').innerHTML = tableData;
            }
            drawTable(weekday);

            let studentId;
            let classSlot;
            let subject;

            <!-- Adding an event listener to each row, so that clicking on the row picks the id of the student -->
            <!-- Adding an event listener to each slot, so that clicking on it picks the slot -->
            const addListenersToSlots = () => {
                const rows = document.querySelectorAll(".studentRow");
                rows.forEach((row) => {
                    row.addEventListener('click', event => {
                        studentId = event.currentTarget.id;
                    });
                });
    
                const slots = document.querySelectorAll(".classSlot");
                slots.forEach((slot) => {
                    slot.addEventListener('click', event => {
                        classSlot = parseInt(event.target.id);
                        const slotObject = classes.find(o => o.slot === classSlot);
                        subject = slotObject.subject;
                        if (recentClick) {
                            recentClick.style.backgroundColor = "white";
                        }
                        event.target.style.backgroundColor = "grey";
                        recentClick = event.target;
                    });
                });
            }
            addListenersToSlots();
            
            <!-- Adding an event listener to the date selector so the timetable will change accordingly -->
            dateSelector.addEventListener('change', event => {
                const date = new Date(event.target.value);
                const day = date.getDay();
                drawTable(day);
                addListenersToSlots();
            });

            <!-- Adding an event listener for the form that adds the notes, but doesn't save them yet -->
            const addNoteForm = document.querySelector('#addNoteForm');
            const notesInput = document.querySelector('#notesInput');
            let addedNotes = [];
            addNoteForm.addEventListener('submit', event => {
                event.preventDefault();
                const noteReason = noteSelector.value;
                const date = dateSelector.value;
                const note = { student: studentId, date, slot: classSlot, subject, reason: noteReason };
                console.log(note);
                addedNotes.push(note);
                recentClick.style.backgroundColor = legend[noteReason].color;
                recentClick = null;

                notesInput.value = JSON.stringify(addedNotes);
            });
        </script>
        `
    })
}