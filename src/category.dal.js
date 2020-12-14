const dbConnection = require('./../database/index');
const camelcaseKeys = require("camelcase-keys");

exports.getCategorys = async () => {
  const connection = dbConnection();
  try {

    const queryResult = await connection.query(`SELECT * FROM public.category;`);
    return camelcaseKeys(queryResult.rows);

  } catch (error) {
    throw error;
    console.log('>>> error',error);
  }
  finally{
    connection.end();
  }
}

exports.createCategory = async (category) => {
  const connection = dbConnection();
  try {
    
    const queryResult = await connection.query(`INSERT INTO public.category (id, "name") VALUES($1,$2) returning *; `, [
      category.id, category.name])

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