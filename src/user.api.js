const { Router } = require('express')
const userService = require('./user.service');
const uuidv4 = require('uuidv4');

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

const userRouter = Router();
userRouter.get("/", async (req, res) => { 
  try {
    const users = await userService.getUsers();
    return  res.status(200).send(users);

  } catch (error) {
    error = handlerError(error);
    return res.status(error.status).send({messageError:error.message});
  }
});

userRouter.get("/:id", async (req, res) => {
  try {
    const {id} = req.params;
    if(!id || !uuidv4.isUuid(id)){
      throw { status:400 , message : 'id is not valid'}
    }
    const user = await userService.getUser(id);
    return  res.status(200).send(user);

  } catch (error) {
    error = handlerError(error);
    return res.status(error.status).send({messageError:error.message});
  }
});

userRouter.post("/", async (req, res) => {
  try {
    const user = req.body;
    if(isEmptyObject(user)){
      throw { message:'invalid user', status:400 }
    }

    const newUser = await userService.createUser(user);

    return res.status(200).send(newUser);
    
  } catch (error) {
    error = handlerError(error);
    return res.status(error.status).send({messageError:error.message});
  }
});

userRouter.post("/confirm-email", async (req, res) => {
  try {
    const user = req.body;
    if(isEmptyObject(user)){
      throw { message:'invalid user', status:400 }
    }

    const code = await userService.confirmEmail(user);

    return res.status(200).send({code});
    
  } catch (error) {
    error = handlerError(error);
    return res.status(error.status).send({messageError:error.message});
  }
});

userRouter.post("/code-is-valid", async (req, res) => {
  try {
    const user = req.body;
    if(isEmptyObject(user)){
      throw { message:'invalid user', status:400 }
    }

    const codeIsValid = await userService.codeIsValid(user);

    return res.status(200).send({codeIsValid});
    
  } catch (error) {
    error = handlerError(error);
    return res.status(error.status).send({messageError:error.message});
  }
});

userRouter.post("/login", async (req, res) => {

  try {
    const usercredentials = req.body;
    if(isEmptyObject(usercredentials) || !usercredentials.email || !usercredentials.password){
      throw { message:'invalid email or password', status:400 }
    }

    const userSession = await userService.login(usercredentials);

    return res.status(200).send(userSession);
    
  } catch (error) {
    error = handlerError(error);
    return res.status(error.status).send({messageError:error.message});
  }

});

userRouter.put("/:id", async (req, res) => {
  try {
    const {id} = req.params;
    console.log('>>> id',id);
    if(!id || !uuidv4.isUuid(id)){
      throw { status:400 , message : 'id is not valid'}
    }
    
    const user = req.body;
    
    if(isEmptyObject(user)){
      throw { message:'invalid user', status:400 }
    }

    const updatedUser = await userService.updateUser({
      id,
      ...user
    });

    return res.status(200).send(updatedUser);
    
  } catch (error) {
    error = handlerError(error);
    return res.status(error.status).send({messageError:error.message});
  }
});

userRouter.delete("/:id", async (req, res) => {

  try {
    const {id} = req.params;
    if(!id || !uuidv4.isUuid(id)){
      throw { status:400 , message : 'id is not valid'}
    }
    const deletedUser = await userService.deleteUser(id);

    return res.status(200).send(deletedUser);
    
  } catch (error) {
    error = handlerError(error);
    return res.status(error.status).send({messageError:error.message});
  }


});

module.exports = userRouter;