const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');

// Api-routes
const userRoutes = require('./src/routes/apiRoutes/userRoutes');
const parentChildRoutes = require('./src/routes/apiRoutes/parentChildRoutes');
const messageRoutes = require('./src/routes/apiRoutes/messageRoutes');
const classRoutes = require('./src/routes/apiRoutes/classRoutes');
const timetableRoutes = require('./src/routes/apiRoutes/timetableRoutes');
const noteRoutes = require('./src/routes/apiRoutes/noteRoutes');

// Other routes
const authRoutes = require('./src/routes/authRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const profileRoutes = require('./src/routes/profileRoutes');
const inboxRoutes = require('./src/routes/inboxRoutes');
const schedulingRoutes = require('./src/routes/schedulingRoutes');
const notationRoutes = require('./src/routes/notationRoutes');

const { checkIfAdmin, checkIfUser } = require('./src/routes/middlewares');

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({
    keys: ['8iw-,{YH8XboU}-6s[#3&ar4Z7Wg[@o{qNkNDI5nPaU4D92&;!{J=-(6lbMN6Emp']
}));

// Api-routes:
app.use('/api', userRoutes);
app.use('/api', parentChildRoutes);
app.use('/api', messageRoutes);
app.use('/api', classRoutes);
app.use('/api', timetableRoutes);
app.use('/api', noteRoutes);

// Other routes
app.use(authRoutes);
app.use('/admin', [checkIfAdmin], adminRoutes);
app.use('/profiles', [checkIfUser], profileRoutes);
app.use('/inbox', [checkIfUser], inboxRoutes);
app.use('/scheduling', [checkIfUser], schedulingRoutes);
app.use('/notation', [checkIfUser], notationRoutes);

app.listen(3000, () => {
    console.log('Server running');
});

console.log("Let's get started.");