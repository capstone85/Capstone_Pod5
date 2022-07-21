const Nutrition = require("../models/nutrition")
const { BadRequestError, NotFoundError, ForbiddenError } = require("../utils/errors")

const authedUserOwnsNutrition = async (req, res, next) => {
    try{
        const { user } = res.locals
        const { nutritionId } = req.params
        const nutrition = await Nutrition.fetchNutritionById(nutritionId)
        if(nutrition.user_email != user.email){
            throw new ForbiddenError(`User is not allowed to update other users's posts.`)
        }
        res.locals.nutrition = nutrition
        return next()
    }catch(err){
        return next(err)
    }
}

module.exports = {
    authedUserOwnsNutrition
}