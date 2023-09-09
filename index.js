const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const userRoutes = require('./src/routes/userRoutes');
const authRoutes = require('./src/routes/authRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const guardianRoutes = require('./src/routes/guardianRoutes');
const studentRoutes = require('./src/routes/studentRoutes');
const profileRoutes = require('./src/routes/profileRoutes');

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({
    keys: ['8iw-,{YH8XboU}-6s[#3&ar4Z7Wg[@o{qNkNDI5nPaU4D92&;!{J=-(6lbMN6Emp']
}));

app.use('/api', userRoutes);
app.use(authRoutes);
app.use('/admin', adminRoutes);
app.use('/student', studentRoutes);
app.use('/guardian', guardianRoutes);
app.use('/profiles', profileRoutes);

app.listen(3000, () => {
    console.log('Server running');
});

console.log("Let's get started.");

// Password for admin@school.com: Kekkonen321