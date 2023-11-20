const template = require('../template');

module.exports = ({ req, users }) => {

    const renderedUsers = users.map(user => {
            let role;
            switch (user.role) {
            case 0:
                role = 'Admin';
                break;
            case 1:
                role = 'Teacher';
                break;
            case 2:
                role = 'Guardian';
                break;
            case 3:
                role = 'Student';
                break;
            }
            return `<tr>
                        <td>${user.id}</td>
                        <td>${user.email}</td>
                        <td><a href='/profiles/${user.id}'>${user.firstname} ${user.lastname}</a></td>
                        <td>${role}</td>
                        <td>
                            <a href='/admin/edit/${user.id}'>
                            <button>Edit</button>
                        </a>
                        </td>
                        <td>
                            <a href='/admin/delete/${user.id}'>
                            <button>Delete</button>
                        </td>
                        </a>
                    </tr>`
        }).join('');

    return template({
        req, 
        content: `
        <div>
            List of users: 
            <table>
            <thead>
                <th>Id</th><th>E-mail</th><th>Name</th><th>Role</th>
            </thead>
                ${renderedUsers}
            </table>
            <a href="/admin/adduser"><button>Add a user</button></a>
        </div>
    `
    }
    );
}