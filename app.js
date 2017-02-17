var express=require('express')
var bodyParser = require('body-parser')
var mongoose=require("mongoose")

var User=require('./models/user').User

mongoose.connect('mongodb://localhost:27017/customers')


var app=express()
var puerto=4000

app.use('/misassets',express.static('assets'))

app.set('view engine','pug')

app.use(bodyParser.urlencoded( {extended:false}) )
app.use( bodyParser.json() )

app.get("/",(req,res)=>{
	//res.send("hola")
	res.render("index", {nombre:"Pablo"})
})

/*app.get("/:nombre",(req,res)=>{
	var n=req.params.nombre
	res.render("index", {nombre:n})
})*/

app.post("/registro", (req, res)=>{
	let nombre= req.body.nombre
	let email= req.body.email
	let password= req.body.password
	let confirmacion_password=req.body.confirmacion_password

	u=new User({nombre:nombre, email:email, password:password, confirmacion_password:confirmacion_password});
	u.save( (err,usuarioGuardado)=>{
		if(err){
			res.send("Error al registrarte: "+String(err))
		}else{
			res.send("Registro completado "+usuarioGuardado.nombre+" "+usuarioGuardado.email)
		}
	})
})



app.get("/form_registro", (req,res)=>{
	res.render("registro")
})


app.post("/login", (req, res)=>{
	let email= req.body.email
	let password= req.body.password

	//u=new User({email:email, password:password});

	User.findOne({email:email, password:password} (err, usuarioEncontrado)=>{
		if(err){
			res.send("Error al loguear: "+String(err))
		}else if(usuarioEncontrado){
			res.send("Bienvenido de nuevo "+usuarioEncontrado.nombre)
		}else{
			res.send("Email / Contraseña incorrectos"+String(err))
		}
	})
})



app.listen(puerto)

