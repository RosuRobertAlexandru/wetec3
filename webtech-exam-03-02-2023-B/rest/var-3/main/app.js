const express = require('express')
const Sequelize = require('sequelize')

const sequelize = new Sequelize('sqlite:memory')

class Device extends Sequelize.Model { };

Device.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
    },
    price: {
        type: Sequelize.FLOAT,
    }
}, {
    sequelize,
    modelName: 'devices',
    timestamps: false
});

const app = express();
app.use(express.json());

app.get('/create', async (req, res) => {
    await sequelize.sync({force: true});
    for(let i = 0; i < 10; i++) {
        await Device.create({name: `Device-${i}`, price: `${Math.random() * 100 + i + 10}`});
    }
    res.status(201).json({message: 'devices created'});
})

app.get('/device', async (req, res) => {
    const devices = await Device.findAll();
    res.status(200).send(devices);
})

app.post('/device', async (req, res) => {
    try{
        var keys=Object.keys(req.body);
        console.log(keys)
        if( keys.length === 0){
            res.status(400).json({message:'bad request'})
        }
        else{
            if(req.body.price<0)
            {
                res.status(400).json({message:'bad request'})
            }
            else{
                if(req.body.name.length < 4)
                {
                    res.status(400).json({message:'bad request'})
                }
                else{
                    const device=req.body
                    await Device.create(device)
                    res.status(201).json({message:'device created'})
                }}}}
    catch(err){
        console.warn(err)
    }
})

app.delete('/device/:id', async (req, res) => {
    try{
        const device=await Device.findByPk(req.params.id)
        if(device){
            await device.destroy()
            res.status(202).json({message:'device deleted'})
        }
    }
    catch(err){
        console.warn(err)
    }
   
})

module.exports = app;