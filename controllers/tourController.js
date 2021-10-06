const fs = require('fs')

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkID = (req,res,next,val)=>{
    console.log(`id id ${val}`)
    if(req.params.id*1 > tours.length){
        return res.status(404).json({
            status:'not found',
            message:'Invalid id'
        });
    }
    next();
};

exports.checkBody = (req,res,next)=>{
    // console.log(`id id ${val}`)
    if(!req.body.name || !req.body.price){
        return res.status(400).json({
            status:'Bad Request',
            message:'Missing name or price'
        });
    };
    next();
};

exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    requestedAt: req.requestTime,
    status: "success",
    tours: tours,
  });
};

exports.getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

    // console.log(tour)
    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
      // tours: tours
    });
  }


exports.createTour = (req, res) => {
  // console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          tour: newTour,
        },
      });
    }
  );
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    staus: "success",
    data: null,
  });
};

