import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {createUser, findByEmail} from '../models/userModels.js'



const register = async (req, res) => {
    const {name, email, password} = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await createUser({name, email, password: hashPassword});

    res.status(202).json({id: user.id, email: user.email});
};

const login = async (req, res) => {
    const {email, password} = req.body;
    const user = findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({message: "Invalid Credentials"})
    }

    const token = jwt.sign({id: user.id}, process.env.JWT_SECRET)
    res.json({token})
}

module.exports = {register, login}