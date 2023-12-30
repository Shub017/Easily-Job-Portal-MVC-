import {accounts} from "../model/Accounts.js";

export default function checkAccount(req, res, next){
    console.log(req.body.email, req.body.password);
    const existingAccount = accounts.some(acc => acc[0] == req.body.email && acc[1] == req.body.password);
    console.log(existingAccount);
        if (existingAccount) {
            console.log('Account exists:', existingAccount);
            next();
        } else {
            console.log('Account does not exist.');
            res.send('Account not found');
        }
}