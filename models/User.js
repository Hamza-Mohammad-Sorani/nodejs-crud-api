const db = require('../utils/database');


module.exports = class User {
    constructor(name, email, mobile) {
        this.name = name;
        this.email = email;
        this.mobile = mobile;
    }
    save() {
        return db.execute('INSERT INTO users (name, email, mobile) VALUES (?, ?, ?)', [this.name, this.email, this.mobile]);
    }
    editById(id) {
        return db.execute("UPDATE users SET name = ?, email = ?, mobile = ? WHERE id = ?", [this.name, this.email, this.mobile, id])
    }
    static fetchAll() {
        return db.execute('SELECT * FROM users');
    }
    static findById(id) {
        return db.execute("SELECT * FROM users WHERE id = ?", [id]);
    }
    static deleteById(id) {
        return db.execute("DELETE FROM users WHERE id = ?", [id]);
    }
}