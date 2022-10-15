import express from "express";
import bodyParser from "body-parser";
import { port } from "./config.js"
import {db} from "./mysqldb.js"

const app = express();
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());

app.get("/", (req, res) =>{
    res.render("../public/index2.ejs")
});
//---------------------------mostrar

app.get('/mostrar.ejs', (req, res)=>{

    db.query('SELECT * FROM characters', (error, results) => {
        if(error){
        throw error;
        }else{
            res.render('../public/mostrar.ejs', {results:results});
        }
    })
})

//---------------------------mostrar2

app.get('/mostrar2.ejs', (req, res)=>{

    db.query('SELECT * FROM monsters', (error, results) => {
        if(error){
        throw error;
        }else{
            res.render('../public/mostrar2.ejs', {results:results});
        }
    })
})
//---------------------------mostrar2

app.get('/mostrar3.ejs', (req, res)=>{

    db.query('SELECT * FROM biome', (error, results) => {
        if(error){
        throw error;
        }else{
            res.render('../public/mostrar3.ejs', {results:results});
        }
    })
})

//---------------------------delete

app.get("/General_Delete.ejs", (req, res)=>{
    res.render('../public/General_Delete.ejs');

})
app.post("/deleteAll", (req, res)=>{
    const input = req.body.deleteall;
    db.query('delete from characters where (idcharacters = "'+input+'")',(error, results)=>{
        if(error){
            console.log(error)
        }else{
            res.redirect("/")
        }
    })
})
//-------------------------delete2
app.get("/General_Delete2.ejs", (req, res)=>{
    res.render('../public/General_Delete2.ejs');

})

app.post("/deleteAll2", (req, res)=>{
    const input = req.body.deleteall2;
    db.query('delete from monsters where (idmonsters = "'+input+'")',(error, results)=>{
        if(error){
            console.log(error)
        }else{
            res.redirect("/")
        }
    })
})
//----------------------------delete3
app.get("/General_Delete3.ejs", (req, res)=>{
    res.render('../public/General_Delete3.ejs');

})

app.post("/deleteAll3", (req, res)=>{
    const input = req.body.deleteall3;
    db.query('delete from biome where (idbiome = "'+input+'")',(error, results)=>{
        if(error){
            console.log(error)
        }else{
            res.redirect("/")
        }
    })
})
//----------------------------create
app.get("/Add.ejs", (req, res)=>{
    res.render('../public/Add.ejs');

})

app.post('/agregarPersonaje', (req, res) => {
    let nombreP = req.body.personaje
    let descriptionP = req.body.descripcion
    db.query('insert into characters values ("' + nombreP + '", "' + descriptionP + '")', (error, results, fields) => {
        if(error){
            console.log(error)
        }else{
            res.redirect("/")
        }
    })
})
//----------------------------create2
app.get("/Add2.ejs", (req, res)=>{
    res.render('../public/Add2.ejs');

})

app.post('/agregarMonstruo', (req, res) => {
    let nombre = req.body.monstruo
    let description = req.body.descripcion
    db.query('insert into monsters values ("' + nombre + '", "' + description + '")', (error, results, fields) => {
        if(error){
            console.log(error)
        }else{
            res.redirect("/")
        }
    })
})
//----------------------------create3
app.get("/Add3.ejs", (req, res)=>{
    res.render('../public/Add3.ejs');

})

app.post('/agregarBioma', (req, res) => {
    let nombre = req.body.bioma
    let description = req.body.descripcion
    db.query('insert into biome values ("' + nombre + '", "' + description + '")', (error, results, fields) => {
        if(error){
            console.log(error)
        }else{
            res.redirect("/")
        }
    })
})
//--------------------------------------update
app.get("/Update.ejs", (req, res) =>{
    res.render("../public/Update.ejs",{data:req})
});

app.post("/actualizarPersonaje", (req,res)=>{
    let oldnombre = req.body.personajeOld;
    let nombre = req.body.personajeUpdate;
    let description = req.body.descripcion;
    db.query(`update characters set idcharacters="${nombre}", description="${description}" where idcharacters="${oldnombre}";`,(error, table)=>{
        if(error){
            console.log(error)
        }else{
            res.redirect("/")
        }
    })
})
//--------------------------------------update2

app.get("/Update2.ejs", (req, res) =>{
    res.render("../public/Update2.ejs",{data:req})
});

app.post("/actualizarMonstruo", (req,res)=>{
    let oldnombre = req.body.monstruoOld;
    let nombre = req.body.monstruoUpdate;
    let description = req.body.descripcion;
    db.query(`update monsters set idmonsters="${nombre}", description="${description}" where idmonsters="${oldnombre}";`,(error, table)=>{
        if(error){
            console.log(error)
        }else{
            res.redirect("/")
        }
    })
})

//--------------------------------------update3

app.get("/Update3.ejs", (req, res) =>{
    res.render("../public/Update3.ejs",{data:req})
});

app.post("/actualizarBioma", (req,res)=>{
    let oldnombre = req.body.biomaviejo;
    let nombre = req.body.biomaUpdate;
    let description = req.body.descripcion;
    db.query(`update biome set idbiome="${nombre}", description="${description}" where idbiome="${oldnombre}";`,(error, table)=>{
        if(error){
            console.log(error)
        }else{
            res.redirect("/")
        }
    })
})



const puerta = process.env.port || 0000

app.listen(puerta, ()=>{
    console.log(`Escuchando desde el puerto: ${port}`)
})
