const dbConnection = require('./../database/index');
const camelcaseKeys = require("camelcase-keys");

exports.getUsers = async () => {
  const connection = dbConnection();
  try {
    const queryResult = await connection.query(`SELECT 
    id, name, email, password, date_of_birth, type_user, cep, address, number, complement, city, uf 
    FROM 
    public.userdonation;
    `);

    
    return camelcaseKeys(queryResult.rows);

  } catch (error) {
    throw error;
    console.log('>>> error',error);
  }
  finally{
    connection.end();
  }
}

exports.getUser = async (id) => {
  const connection = dbConnection();
  try {
    
    const queryResult = await connection.query("SELECT id, name, email, password, date_of_birth, type_user, cep, address, number, complement, city, uf, password FROM public.userdonation where id = $1", [id])

    if(queryResult.rows.length == 0){
      return {};
    }

    return camelcaseKeys(queryResult.rows[0]);

  } catch (error) {
    throw error;
    console.log('>>> error',error);
  }
  finally{
    connection.end();
  }
}

exports.getUserCode = async (id) => {
  const connection = dbConnection();
  try {
    
    const queryResult = await connection.query("SELECT id, code FROM public.userdonation where id = $1", [id])

    if(queryResult.rows.length == 0){
      return {};
    }

    return camelcaseKeys(queryResult.rows[0]);

  } catch (error) {
    throw error;
    console.log('>>> error',error);
  }
  finally{
    connection.end();
  }
}

exports.loginUser = async (user) => {
  const connection = dbConnection();
  try {
    
    const queryResult = await connection.query("SELECT id,name,password FROM public.userdonation where email = $1", [user.email])

    if(queryResult.rows.length == 0){
      return {};
    }

    return camelcaseKeys(queryResult.rows[0]);

  } catch (error) {
    throw error;
    console.log('>>> error',error);
  }
  finally{
    connection.end();
  }
}

exports.createUser = async (user) => {
  const connection = dbConnection();
  try {
    
    const queryResult = await connection.query(`INSERT INTO public.userdonation
    (id, "name", email, "password", date_of_birth, type_user, cep, address, "number", complement, city, uf)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) returning *;
    `, [
      user.id, user.name, user.email, user.password, 
      user.dateOfBirth, user.typeUser, user.cep, user.address, 
      user.number, user.complement, user.city, user.uf])

    if(queryResult.rows.length == 0){
      return {};
    }

    return camelcaseKeys(queryResult.rows[0]);

  } catch (error) {
    throw error;
    console.log('>>> error',error);
  }
  finally{
    connection.end();
  }
}

exports.updateUser = async (user) => {
  const connection = dbConnection();
  try {
    
    const queryResult = await connection.query(`UPDATE public.userdonation
    SET "name"=$2, email=$3, "password"=$4, date_of_birth=$5, type_user=$6, cep=$7, address=$8, "number"=$9, complement=$10, city=$11, uf=$12
    WHERE id=$1 returning *;
    `, [
      user.id, user.name, user.email, user.password, 
      user.dateOfBirth, user.typeUser, user.cep, user.address, 
      user.number, user.complement, user.city, user.uf]);

    if(queryResult.rows.length == 0){
      return {};
    }

    return camelcaseKeys(queryResult.rows[0]);

  } catch (error) {
    throw error;
    console.log('>>> error',error);
  }
  finally{
    connection.end();
  }
}

exports.updateCodeUser = async (user) => {
  const connection = dbConnection();
  try {
    
    const queryResult = await connection.query(`UPDATE public.userdonation
    SET "code"=$2
    WHERE id=$1 returning *;
    `, [
      user.id, user.code]);

    if(queryResult.rows.length == 0){
      return {};
    }

    return camelcaseKeys(queryResult.rows[0]);

  } catch (error) {
    throw error;
    console.log('>>> error',error);
  }
  finally{
    connection.end();
  }
}



exports.deleteUser = async (id) => {
  const connection = dbConnection();
  try {
    
    const queryResult = await connection.query("DELETE FROM public.userdonation WHERE id= $1 returning *;", [id]);

    if(queryResult.rows.length == 0){
      return {};
    }

    return camelcaseKeys(queryResult.rows[0]);

  } catch (error) {
    throw error;
    console.log('>>> error',error);
  }
  finally{
    connection.end();
  }
}

