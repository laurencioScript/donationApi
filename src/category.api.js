const { Router } = require('express')
const categoryService = require('./category.service');

function isEmptyObject(obj) {
  return Object.keys(obj).length === 0;
}

function handlerError(e){
  console.log('>>> e',e);
  if(e.status && e.message){
    return e;
  }
  else{
    return {
      message:'there was an error',
      status:400
    }
  }
}

const router = Router();

router.get("/", async (req, res) => { 
  try {
    const categorys = await categoryService.getCategorys();
    return  res.status(200).send(categorys);

  } catch (error) {
    error = handlerError(error);
    return res.status(error.status).send({messageError:error.message});
  }
});

router.post("/", async (req, res) => {
  try {
    const category = req.body;
    if(isEmptyObject(category)){
      throw { message:'invalid category', status:400 }
    }

    const newCategory = await categoryService.createCategory(category);

    return res.status(200).send(newCategory);
    
  } catch (error) {
    error = handlerError(error);
    return res.status(error.status).send({messageError:error.message});
  }
});

module.exports = router;
