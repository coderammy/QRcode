const Joi = require('joi')

const schema = Joi.object({
    email:Joi.string().email(),
    password:Joi.string().required(),
})
const luthValidate = async(req,res,next)=>{
    await schema.validateAsync(req.query)
    .then(()=>next())
    .catch((e)=>res.send(e.message))

}

module.exports = {
    schema, luthValidate
}