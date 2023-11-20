const template = require('../template');
const { drawTimetable } = require('../../utils');

module.exports = ({ req, timetable }) => {

    const table = drawTimetable(timetable);

    return template({
        req,
        content: `
            <div>
                <h3>Timetable ${timetable[0].timetable}</h3>
            </div>
            <div>
                <form method="POST">
                    <label>Assing this timetable for grade</label>
                    <select name="grade" id="gradeSelector">
                        <option selected value=0>Choose a grade...</option>
                        <option value=1>1</option>
                        <option value=2>2</option>
                        <option value=3>3</option>
                        <option value=4>4</option>
                        <option value=5>5</option>
                        <option value=6>6</option>
                        <option value=7>7</option>
                        <option value=8>8</option>
                        <option value=9>9</option>
                    </select>
                    <button type="submit" id="saveButton" disabled>Save</button>
                </form>
                <br />
                <a href="/scheduling/edit/${timetable[0].timetable}"><button>Edit table</button></a>
            </div>
            <div>
                ${table}
            </div>
            <div>
                <a href="/scheduling/manage"><button>Back</button></a>
            </div>

            <script>
                const btn = document.querySelector('#saveButton');
                const gradeSelector = document.querySelector('#gradeSelector');

                gradeSelector.addEventListener('change', event => {
                    console.log(event.target.value);
                    if (event.target.value !== '0') {
                        btn.disabled = false;
                    }
                    else {
                        btn.disabled = true;
                    }
                });
            </script>
        `
    })
}