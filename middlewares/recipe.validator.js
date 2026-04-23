const Joi = require('joi');

const recipeSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    description: Joi.string().min(10).allow(''),
    category: Joi.string().required(),
    prepTime: Joi.number().min(1).required(),
    difficulty: Joi.number().min(1).max(5),
    layers: Joi.array().items(
        Joi.object({
            description: Joi.string().required(),
            ingredients: Joi.array().items(Joi.string()).min(1).required()
        })
    ).min(1).required(),
    instructions: Joi.array().items(Joi.string()).min(1).required(),
    image: Joi.string().uri().allow(''),
    isPrivate: Joi.boolean().default(false)
});

exports.validateRecipe = (req, res, next) => {
    const { error } = recipeSchema.validate(req.body, { abortEarly: false });
    if (error) {
        // אנחנו משתמשים ב-next עם שגיאה כדי שה-ErrorHandler המרכזי יטפל בזה
        const validationError = new Error(error.details.map(d => d.message).join(', '));
        validationError.statusCode = 400;
        return next(validationError);
    }
    next();
};