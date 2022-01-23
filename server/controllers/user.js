import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

const secret = 'shaco';

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const oldUser = await User.findOne({ email });

        if(!oldUser) return res.status(404).json({ message: "El usuario no existe" });

        const isPassOk = await bcrypt.compare(password, oldUser.password);

        if(!isPassOk) return res.status(400).json({ message: "Usuario o password incorrecto" });

        const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {expiresIn: "1h" });

        res.status(200).json({ result: oldUser, token });
    } catch (error) {
        res.status(500).json({ message: 'Algo fué mal :('});
    }
};

export const signup = async (req, res) => {
    const { email, password, nombre, apellido} = req.body;

    try {
        const oldUser = await User.findOne({ email });

        if(oldUser) return res.status(400).json({ message: "Ese usuario ya existe" });

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ email, password: hashedPassword, nombre: `${nombre} ${apellido}` });

        console.log(result);

        const token = jwt.sign({ email: result.email, id: result._id }, secret, {expiresIn: "1h" });

        res.status(200).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: 'Algo fué mal :('});
        console.log(error);
    }
};
