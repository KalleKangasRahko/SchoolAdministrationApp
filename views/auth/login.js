const template = require('../template');

module.exports = ({ req, errors }) => {

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
            <h3>Please log in:</h3>
            <form method="POST">
                <label>E-mail</label>
                <input name="email"/>
                ${getError(errors, 'email')}
                <label>Password</label>
                <input name="password"/>
                ${getError(errors, 'password')}
                <button>Log in</button>
            </form>
        </div>
    `
    }
    );
}