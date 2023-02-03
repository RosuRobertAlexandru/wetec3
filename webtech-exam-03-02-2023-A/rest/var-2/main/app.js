const express = require('express')
const Sequelize = require('sequelize')

const sequelize = new Sequelize('sqlite:memory')
let Ship = sequelize.define('student', {
    name : Sequelize.STRING,
    portOfSail : Sequelize.STRING,
    displacement : Sequelize.INTEGER
},{
    timestamps : false
})

const app = express()
app.use(express.json())

app.get('/create', async (req, res) => {
    try{
        await sequelize.sync({force : true})
        for (let i = 0; i < 10; i++){
            let ship = new Ship({
                name : `name${i}`,
                portOfSail : `port ${i}`,
                displacement : 3000 + 10 * i
            })
            await ship.save()
        }
        res.status(201).json({message : 'created'})
    }
    catch(err){
        console.warn(err.stack)
        res.status(500).json({message : 'server error'})
    }
})

app.get('/ships', async (req, res) => {
    const page = parseInt(req.query.pageNo) 
    const limit = parseInt(req.query.pageSize)
    let mySHIPS = await Ship.findAll()
  
    if(!(parseInt(page)) && !(parseInt(limit))){
        
        res.status(200).json(mySHIPS)

    }else if(parseInt(page) && parseInt(limit)){

            //se afiseaza elementele de pe pagina 'page' cu cate 'limit' elemente pe response
            const StartIndex = (page)*limit
            const EndIndex = (page+1)*limit
            let myResponse = mySHIPS.slice(StartIndex, EndIndex)
            res.status(200).json(myResponse)

    }else if(parseInt(page) && !(parseInt(limit))){
        
            //se da din 5 in 5 obiecte pe pagina
            const StartIndex = page*5
            const EndIndex = (page+1)*5
            let myResponse = mySHIPS.slice(StartIndex, EndIndex)
            res.status(200).json(myResponse)
    }
})

app.post('/ships', async (req, res) => {
	try{
		let ship = new Ship(req.body)
		await ship.save()
		res.status(201).json({message : 'created'})
	}
	catch(err){
		res.status(500).json({message : 'server error'})		
	}
})

module.exports = app