
import {getAll, postData, getDatawithParams, updatedata,deleteData} from './controller.js';
import express from 'express';

let app = express();

app.use(express.json());


app.get('/api/employee', async(req, res)=>{

    let alldata = await getAll();

    if(alldata.error){
        return res.status(500).send({error:alldata.error}); 
    }
    return res.send({total:alldata.length, empData : alldata});

    
});

app.post('/api/employee',async (req, res)=>{

    let createdata = await postData(req.body);
    if(createdata.error){
        return res.status(500).send({error:createdata.error.message});
    }
    return res.send({message:'data Saved successfully', data:createdata});
});

app.get('/api/employee/:id', async (req, res)=>{
    let passedid = req.params.id
    let savedData = await getDatawithParams(passedid);

    if(savedData == null){
        return res.status(400).send({error:'data not found'})
    }
    else if(savedData.error){
        return res.status(500).send({error:savedData.error});
    }
    res.send({name:savedData.empName, salary:savedData.empSalary})
});


app.put('/api/employee',async (req, res)=>{

    let updateData = await updatedata(req.body);
    
    if(updateData.error){
       return res.status(500).send({error:updateData.error});
    }
    return res.send({message:'Record Update successfully'});
   
});

app.delete('/api/employee/:id', async(req, res)=>{

    let deleted_data = await deleteData(req.params.id);

    if(deleted_data.error){
        return res.status(500).send({error:deleted_data.error});
    }
    return res.send({message:'record deleted sucessfully', data: deleted_data.data})
})













let server = app.listen(8080, ()=>{
    console.log(`server started at port ${server.address().port}`);
});
