# SchoolAdministrationApp
A portfolio project for everyday administration of a primary school.
This readme contains a description of the project, as well as instructions on how to set it up locally.

Made using vanilla Javascript, as well as Node.js and Express.js. Database made with MySQL.

**Description**
There are four different types of users: admins, teachers, guardians and students. They all have different rights in the app. 
The features include:
1) For admins:
     -creating, editing, and removing users
     -connecting parents to their children, and disconnecting
3) For teachers:
     -creating timetables and assigning them to different grades
     -sending and reading messages to and from all the other users
     -adding notes to students (as in: good work, late for class, absence, etc.)
4) For students and guardians
     -checking timetables and notes
     -messaging

A few credentials:
Admin: admin@school.com, password: Kekkonen321
Teachers: hellin.laukkanen@school.com, reino.reiska@school.com and kerttu-liisa.koskinen@school.com
Guardians: petrus.potkonen@gmail.com, mirja.mantyla@gmail.com

All the passwords, expect for the admin, are firstname with a capital first letter and 123. So: Hellin123, Reino123, Petrus123 and so forth.
Feel free to click around, create users, create timetables, send messages and add notes.

As of 25.11.2023 this project is severely unfinished, and will receive updates and improvements in the future.

**Instructions**
1) Open Visual Studio Code, and choose Source Control => Clone Repository => Clone from GitHub
2) Search for KalleKangasRahko/SchoolAdministrationApp, and choose it as it pops up. Choose a folder where you wish to clone the repository.
3) Once the repository is cloned, open up HeidiSQL, and log in to your SQL-server. Choose File => Load SQL file and choose the schooldb.sql-file from the project folder
4) Once the database has been imported, go to src => db.js and change the credentials in the file to match your SQL-server
5) Enjoy
