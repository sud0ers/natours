const express = require('express');
const fs = require('fs');
const morgan = require('morgan')


const app = express();
//middlewares
app.use(morgan('dev'));


app.use(express.json());

app.use((req, res, next)=>{
    console.log('Hello from the middleware');
    next();
});

app.use((req, res, next)=>{
    req.requestTime = new Date().toISOString();
    next();
})

const tours = JSON.parse
            (fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

//routehandlers
const getAllTours = (req,res)=>{
    console.log(req.requestTime)
    res.status(200).json({
        requestedAt:req.requestTime,
        status: 'success',
        tours: tours
    });
}

const getTour = (req,res)=>{
    console.log(req.params);
    const id = req.params.id * 1;
    const tour = tours.find(el=> el.id === id);

    if(!tour){
        return (res.status(404).json({
            status: 'Not found',
            message: 'Invalid id'
        }));
    }

    else{  
    // console.log(tour)
    res.status(200).json({
        status: 'success',
        data:{
            tour
        }
        // tours: tours
    });}
}

const postTour = (req,res)=>{
    // console.log(req.body);
    const newId = tours[tours.length-1].id+1;
    const newTour = Object.assign({id: newId}, req.body);
    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours), err=>{
        res.status(201).json({
            status:'success',
            data:{
                tour: newTour
            }
        });
    });
}

const delTour = (req,res)=>{
    
    if(req.params.id*1 > tours.length){
        return (res.status(404).json({
            status: 'Not found',
            message: 'Invalid id'
        }));
    }
    res.status(204).json({
        staus:'success',
        data:null
    })
}

const getAllUsers = (req,res)=>{
    res.status(500).json({
        status:'err',
        message:'This route is not yet defined'
    })
}

const createUser = (req,res)=>{
    res.status(500).json({
        status:'err',
        message:'This route is not yet defined'
    })
}

const getUser = (req,res)=>{
    res.status(500).json({
        status:'err',
        message:'This route is not yet defined'
    })
}

const updateUser = (req,res)=>{
    res.status(500).json({
        status:'err',
        message:'This route is not yet defined'
    })
}

const deleteUser = (req,res)=>{
    res.status(500).json({
        status:'err',
        message:'This route is not yet defined'
    })
}

//routes

const tourRouter = express.Router();
const userRouter = express.Router();

tourRouter.
    route('/').
    get(getAllTours).
    post(postTour);

tourRouter
    .route('/:id').
    get(getTour).
    delete(delTour)

userRouter
    .route('/')
    .get(getAllUsers)
    .post(createUser);

userRouter
    .route('/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser);

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
    
    //server
const port = 3000;

app.listen(port,()=>{
    console.log(`server running on port ${port}`);
});