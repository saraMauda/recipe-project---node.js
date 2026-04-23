const Joi = require('joi');

const userSchema = Joi.object({
    username: Joi.string().min(2).max(30).required(),
    password: Joi.string().min(6).max(30).required(), 
    email: Joi.string().email().required(),
    address: Joi.string().required(),
    role: Joi.string().valid('admin', 'user', 'guest').default('user')
});

exports.validateUser = (req, res, next) => {
        const { error } = userSchema.validate(req.body, { abortEarly: false });    if(error){
        if (error) {
            return res.status(400).json({ 
                error: { 
                    message: error.details.map(detail => detail.message).join(', ') 
                } 
            });
        }
    }
    next();
};