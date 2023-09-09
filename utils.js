const crypto = require('crypto');
const util = require('util');
const scrypt = util.promisify(crypto.scrypt);

// Function for encrypting the password before sending it to the db
const cryptPassword = async (password) => {
    // Generate a salt for the password
    const salt = crypto.randomBytes(8).toString('hex');
    // Combine the salt and the password and hash it
    const buf = await scrypt(password, salt, 64);
    // We store into the db the password + salt, hashed together, as well as the salt, separated with a dot
    const hashed = `${buf.toString('hex')}.${salt}`;
    return hashed;
}

// Comparing password used for the login attempt to the one for the same user in db
const comparePasswords = async (saved, supplied) => {
    // Saved is the password in the db, supplied is the one used in a login attempt
    const [hashed, salt] = saved.split('.');
    // Hashed is the original password + salt, hashed, salt is the salt that was hashed with original password
    const hashedSupplied = await scrypt(supplied, salt, 64);
    // If the supplied + salt = hashed, then the password is correct
    return hashed === hashedSupplied.toString('hex');
}

module.exports = {
    cryptPassword, comparePasswords
}