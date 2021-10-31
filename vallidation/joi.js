const Joi = require('joi')

const authSchema = Joi.object({
    firstname:Joi.string().max(100).required(),
    lastname:Joi.string().max(100).required(),
    email:Joi.string().email(),
    password:Joi.string().required(),
    mobile:Joi.string().min(10).required(),
})
const authValidate = async(req,res,next)=>{
    await authSchema.validateAsync(req.query)
    .then(()=>next())
    .catch((e)=>res.send(e.message))

}

module.exports = {
    authSchema, authValidate
}