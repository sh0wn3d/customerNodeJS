var mongoose=require("mongoose")
var Schema=mongoose.Schema

var userSchemaJSON={
	nombre:String,
	email:String,//{type:String, maxLength:[10,'El email ha de tener menos de 10 carácteres']}Así le damos atributos
	password:String,
	edad: Number,
	fecha_nac: Date,
	sexo: String

}

var userSchema=new Schema(userSchemaJSON)
var User=mongoose.model('User', userSchema)

module.exports.User=User