const Joi = require('joi');

const userSchema = Joi.object({
    username: Joi.string().min(2).max(30).required,
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).required()
        .messages({ 'string.pattern.base': 'Password must be at least 6 characters and contain letters and numbers' }),
    email: Joi.string().email().required(),
    address: Joi.string().required(),
    role: Joi.string().valid('admin', 'user', 'guest').default('user')
});

exports.validateUseer = (req, res, next) => {
    const { error } =userSchema.validate(req.body);
    if(error){
        return res.status(400).json({ error: { message: error.details[0].message }})
    }
    next();
};