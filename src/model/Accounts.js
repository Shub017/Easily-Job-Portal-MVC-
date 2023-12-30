const accounts = [];

export default class Account {
    constructor(name, password) {
        this.name = name;
        this.password = password;
    }

    static addAccount(acc) {
        accounts.push(acc);
        console.log(accounts);
    }

    static checkIfAccountExist(name, password) {
        // Check if an account with the given name and password exists
        const existingAccount = accounts.find(acc => acc.name === name && acc.password === password);

        if (existingAccount) {
            console.log('Account exists:', existingAccount);
            return true;
        } else {
            console.log('Account does not exist.');
            return false;
        }
    }
}

export { accounts };
