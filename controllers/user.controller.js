const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if(!user){
            return res.status(401).json({ error: { message: 'Invalid email or password'}});
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            return res.status(401).json({ error: { message: 'Invalid email or password' } });
        }

        const token = jwt.sign(
            { userId: user._id,role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h'}
        );
    
        res.status(200).json({ 
            message: 'Login successful',
            token: token,
            user: {
                username: user.username,
                email: user.email,
                role: user.role
            }
         });
    } catch (error) {
        res.status(500).json({ error: { message: error.message } });
    }
};