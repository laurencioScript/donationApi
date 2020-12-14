const dbConnection = require('./../database/index');
const camelcaseKeys = require("camelcase-keys");

exports.getDonations = async () => {
  const connection = dbConnection();
  try {
    const queryResult = await connection.query(`SELECT 
    * 
    FROM 
    public.donation;
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

exports.getDonation = async (id) => {
  const connection = dbConnection();
  try {
    
    const queryResult = await connection.query("SELECT * FROM public.donation where id = $1", [id])

    if(queryResult.rows.length == 0){
      return {};
    }

    return camelcaseKeys(queryResult.rows[0]);

  } catch (error) {
    console.log('>>> error',error);
    throw error;
  }
  finally{
    connection.end();
  }
}

exports.createDonation = async (donation) => {
  const connection = dbConnection();
  try {
    
    const queryResult = await connection.query(`INSERT INTO public.donation
    (id, "name", donor_id, recipient_id,  status, equipment_description, interested_student, equipment_delivery, 
    category, allow_withdrawal_my_address, creation_date)
    VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) returning *;`, [
      donation.id, donation.name, donation.donorId, donation.recipientId, 
      donation.status, donation.equipmentDescription, donation.interestedStudent, donation.equipmentDelivery, 
      donation.category, donation.allowWithdrawalAddress, donation.creationDate])

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

exports.updateDonation = async (donation) => {
  const connection = dbConnection();
  try {
    
    const queryResult = await connection.query(`UPDATE public.donation
    SET "name"=$2, donor_id=$3, recipient_id=$4, status=$5, equipment_description=$6, 
    interested_student=$7, equipment_delivery=$8, category=$9, allow_withdrawal_my_address=$10, creation_date=$11
    WHERE id=$1 returning *;
    `, [
      donation.id, donation.name, donation.donorId, donation.recipientId,
      donation.status, donation.equipmentDescription, donation.interestedStudent, donation.equipmentDelivery, 
      donation.category, donation.allowWithdrawalAddress, donation.creationDate]);

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

exports.deleteDonation = async (id) => {
  const connection = dbConnection();
  try {
    
    const queryResult = await connection.query("DELETE FROM public.donation WHERE id = $1 returning *;", [id]);

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

