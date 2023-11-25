const template = require('../template');

module.exports = ({ req, user }) => {
    const userArray = user;
    user = user[0];

    const items = userArray.map(item => {
        return `<tr>
                    <td><a href="/profiles/user/${item.childId}">${item.child}</a></td>
                    <td>${item.grade}</td>
                    <td>
                        <form method="POST">
                            <input type="hidden" name="parentId" value="${user.id}" />
                            <input type="hidden" name="childId" value="${item.childId}" />
                            <button type="submit">Remove</button>
                        </form>
                    </td>
                </tr>`;
    }).join('');

    children = `<table>
                    <thead>
                        <th>Name</th><th>Grade</th>
                    </thead>
                    <tbody>
                    ${items}
                    </tbody>
                </table>`

    return template({
        req,
        content: `
        <div>
            Children of ${user.firstname} ${user.lastname}
        </div>
        <div>
            ${children}
        </div>
        <div>
            <a href="/admin/edit/children/add/${user.id}"><button>Add children</button></a>
            <a href="/admin/edit/${user.id}"><button>Back</button></a>
        </div>
        `
    }
    );
}