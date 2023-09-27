const { get } = require('../../src/routes/adminRoutes');
const template = require('../template');

const getError = (errors, prop) => {
    // We use try-catch to avoid writing a ton of if-statements
    try {
        // .mapped() turns errors-array into an object with objects with keys corresponding to the prop names
        return errors.mapped()[prop].msg
    }
    catch (err) {
        return '';
    }
};

module.exports = ({ req, errors }) => {
    return template({
        req,
        content: `
        <div>
            <h3>Add a new user:</h3>
            <form method="POST">
                <label>E-mail</label>
                <input name="email"/>
                ${getError(errors, 'email')}
                <label>Password</label>
                <input name="password" type="password"/>
                ${getError(errors, 'password')}
                <label>Password confirm</label>
                <input name="passwordConfirmation" type="password"/>
                ${getError(errors, 'passwordConfirmation')}
                <select id="roleSelector" name="role">
                    <option>Choose role...</option>
                    <option value=0>Admin</option>
                    <option value=1>Teacher</option>
                    <option value=2>Guardian</option>
                    <option value=3>Student</option>
                </select>
                ${getError(errors, 'role')}
                </br>
                <span id="userInputs"></span>
                <span id="gradeSelector"></span>
                </br>
                <button type="submit">Add user</button>
            </form>
            <a href="/admin">
                <button>Cancel</button>
            </a>
        </div>
        <script>
            const personalInfo = '<label>First name</label><input name="firstname"/><label>Last name</label><input name="lastname"/><label>Address</label><input name="address"/><label>Phone number</label><input name="phonenum"/>';
            const grades = '<label>Grade</label><select name="grade"><option value=1>1</option><option value=2>2</option><option value=3>3</option><option value=4>4</option><option value=5>5</option><option value=6>6</option><option value=7>7</option><option value=8>8</option><option value=9>9</option></select>'
            const supervisor = '<label>Class supervisor for grade</label><select name="grade"><option value=0>None</option><option value=1>1</option><option value=2>2</option><option value=3>3</option><option value=4>4</option><option value=5>5</option><option value=6>6</option><option value=7>7</option><option value=8>8</option><option value=9>9</option></select>'

            const roleSelector = document.querySelector('#roleSelector');
            const userInputs = document.querySelector('#userInputs');
            const gradeSelector = document.querySelector('#gradeSelector');
            roleSelector.addEventListener('change', (event) => {
                const role = parseInt(event.target.value);
                if (role === 0) {
                    userInputs.innerHTML = '';
                    gradeSelector.innerHTML = '';
                }
                else if (role === 1) {
                    userInputs.innerHTML = personalInfo;
                    gradeSelector.innerHTML = supervisor;
                }
                else if (role === 2) {
                    userInputs.innerHTML = personalInfo;
                    gradeSelector.innerHTML = '';
                }
                else if (role === 3) {
                    userInputs.innerHTML = personalInfo;
                    gradeSelector.innerHTML = grades;
                }
            });
        </script>
    `
    }
    );
}