const userDal = require('./user.dal');
const uuidv4 = require('uuidv4');
const bcryptjs = require('bcryptjs');
const serviceEmail = require('./email.service');
const cryptoRandomString = require("crypto-random-string");

exports.getUsers =  () => {
  return userDal.getUsers();
}

exports.getUser =  (id) => {
  return userDal.getUser(id);
}

exports.createUser = async (user) => {
  user.id = uuidv4.uuid();
  user.password = await bcryptjs.hash(user.password,10);
  const newUser = await userDal.createUser(user);
  delete newUser.password;
  return newUser;
}

exports.login = async (user) => {
  
  const userSaved = await userDal.loginUser(user);
  const passwordIsValid = await bcryptjs.compare(user.password, userSaved.password|| '')
  if(!passwordIsValid){
    throw {
      message:'invalid email or password',
      status:400
    }
  }

  delete userSaved.password;

  return userSaved;

}


exports.deleteUser = (id) => {
  return userDal.deleteUser(id);
}

exports.confirmEmail = async (user) =>{
  const userSaved = await this.getUser(user.id);
  const code = cryptoRandomString({
    length: 6,
    type: "distinguishable",
  });


  await userDal.updateCodeUser({
    id:user.id,
    code
  });

  await serviceEmail.sendEmail(userSaved.email,'Confirmação do email (Doação)',`O código é ${code}.`)

  return code;

}

exports.codeIsValid = async (user)=>{
  const userSaved = await userDal.getUserCode(user.id);

  if(user.code == userSaved.code){
    await userDal.updateCodeUser({
      id:user.id,
      code:''
    });
    return true;
  }
  return false;

}

exports.updateUser = async (user) => {
  const userSaved = await this.getUser(user.id);
  if(!userSaved || !userSaved.id ){
    throw { status:400 , message : 'id is not valid'}
  }

  if(user.password != undefined){
    const passwordIsValid = await bcryptjs.compare(user.oldPassword, userSaved.password|| '')
    if(!passwordIsValid){
      throw {
        message:'invalid password',
        status:400
      }
    }
    user.password = await bcryptjs.hash(user.password,10);
  }
  else{
    user.password = userSaved.password;
  }
  

  user.name = user.name != undefined ? user.name : userSaved.name;
  user.email = user.email != undefined ? user.email : userSaved.email;
  user.dateOfBirth = user.dateOfBirth != undefined ? user.dateOfBirth : userSaved.dateOfBirth;
  user.typeUser = user.typeUser != undefined ? user.typeUser : userSaved.typeUser;
  user.cep = user.cep != undefined ? user.cep : userSaved.cep;
  user.address = user.address != undefined ? user.address : userSaved.address;
  user.number = user.number != undefined ? user.number : userSaved.number;
  user.complement = user.complement != undefined ? user.complement : userSaved.complement;
  user.city = user.city != undefined ? user.city : userSaved.city;
  user.uf = user.uf != undefined ? user.uf : userSaved.uf;

  const userUpdated = await userDal.updateUser(user);
  delete userUpdated.password;
  return userUpdated;
}
