const User = require('../models/user.model');
const bcrypt = require('bcrypt');

exports.register = async (req, res) =>{
    try{
        const{ username, password, email, address, role } = req.body;
        
        const existingUser = await User.findOne({ email });
        if (existingUser){
            return res.status(400).json({ error: { message: 'User already exists'} });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            password :hashedPassword,
            email,
            address,
            role
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully'});
    
    } catch (error){
        res.status(500).json({ error: { message: error.message} });
    }
};

exports.login = async (req, res) => {
    try {
        // כאן בהמשך נוסיף אימות ובדיקת טוקן
        res.status(200).json({ message: 'User logged in (placeholder)' });
    } catch (error) {
        res.status(500).json({ error: { message: error.message } });
    }
};