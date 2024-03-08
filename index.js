import express from 'express';
import connectDB from './db/db.js';
import {userData} from './model/usermodel.js';

let app = express();
app.use(express.json());


connectDB();

let server = app.listen(3001, ()=>{
    console.log(`Server started at port ${server.address().port}`);
});


app.get('/api',async (req, res)=>{
    try{
        let data = await userData.find({},{_id:0, __v:0});
        res.send({total: data.length, data: data});
    }catch(err){
        res.status(400).json({error:err});
    }
});
app.get('/api/:id',async (req, res)=>{
    try{
        let id = Number(req.params.id) - 1;
        let data = await userData.find({},{_id:0, __v:0});
        res.send({data: data[id]});
    }catch(err){
        res.status(400).json({error:err});
    }
});

app.post('/api', async (req, res)=>{
  try{
    let {name, age, email, phone} = req.body;
    let userobj = {name:name, age:age, email:email, phone:phone}; 
    let saveuser = await userData.create(userobj);
    saveuser.save();
 
     res.send({message:'your data successfully submitted', data:userobj});
  }catch(err){
    res.status(500).json({error:err.message});
  }
});

app.put('/api/:id', async(req, res)=>{
    try{
        let id = Number(req.params.id);
        let {name, age, email, phone }= req.body;

        let eidtable = await userData.find({});
        
        let updatedata = await userData.updateOne( { _id: eidtable[id - 1]._id}, { $set: {name:name, age:age, email:email, phone:phone }} ); 
        if(updatedata.matchedCount === 1){
            res.send({ message: 'data updated successfully' });
        }else {
            res.status(404).json({ message: 'User not found' });
        }
    }catch(err){
        res.status(500).json({error:err, message: 'Internal server error' });
    }

});

app.delete('/api/:id', async(req, res)=>{
    try{
        let id = Number(req.params.id);
        let {name, age, email, phone }= req.body;

        let eidtable = await userData.find({});
        
        let updatedata = await userData.deleteOne( { _id: eidtable[id - 1]._id} ); 
        if(updatedata.deletedCount  === 1){
            res.send({ message: `document of ${id} deleted successfully`});
        }else {
            res.status(404).json({ message: 'User not found' });
        }
    }catch(err){
        res.status(500).json({error:err, message: 'Internal server error' });
    }

});