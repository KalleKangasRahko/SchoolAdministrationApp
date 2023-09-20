const template = require('../template');

module.exports = ({ req, students, id }) => {
    // TODO:
    /*
    Sisäkkäiset for-loopit
        1) Otetaan id:t taulukosta yksi kerrallaan
        2) Jos id esiintyy toisen kerran taulukossa, toistuva rivi poistetaan
    */
    console.log('students at first:');
    console.log(students);
    let studentToRemove;

    // If we find a student whose guardian is the current user, we make a note of their id
    for (let i = 0; i < students.length; i++) {
        if (students[i].parentId === id) {
            studentToRemove = students[i].id;
            console.log('student to remove: ' + studentToRemove);
            // We then remove that student from the array altogether, because otherwise the student 
            // might still occur in the list because they are regarded as their other guardian's child
            students = students.filter((student) => {
                return student.id !== studentToRemove;
            });
        }
    }

    // Removing duplicate students from the array
    const ids = students.map(( {id }) => id);
    const filteredStudents = students.filter(({ id }, index) => 
        !ids.includes(id, index + 1));

    students = filteredStudents;
    const items = students.map(student => {
        return `<option value="${student.id}">${student.name}, grade ${student.grade}</option>`;
    }).join('');

    return template({
        req,
        content:
            `<div>
        Add children for user ${id}
        </div>
        <div>
            <form method="POST">
                <input type="hidden" name="parentId" value="${id}" />
                <select name="childId">${items}</select>
                <button type="submit">Add as a child</button>
            </form>
        </div>`});
}