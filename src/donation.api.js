const { Router } = require('express')
const donationService = require('./donation.service');
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

const router = Router();
router.get("/", async (req, res) => { 
  try {
    const users = await donationService.getDonations();
    return  res.status(200).send(users);

  } catch (error) {
    error = handlerError(error);
    return res.status(error.status).send({messageError:error.message});
  }
});

router.get("/:id", async (req, res) => {
  try {
    const {id} = req.params;
    if(!id || !uuidv4.isUuid(id)){
      throw { status:400 , message : 'id is not valid'}
    }
    const donation = await donationService.getDonation(id);
    return  res.status(200).send(donation);

  } catch (error) {
    error = handlerError(error);
    return res.status(error.status).send({messageError:error.message});
  }
});

router.post("/", async (req, res) => {
  try {
    const donation = req.body;
    if(isEmptyObject(donation)){
      throw { message:'invalid user', status:400 }
    }

    const newDonation = await donationService.createDonation(donation);

    return res.status(200).send(newDonation);
    
  } catch (error) {
    error = handlerError(error);
    return res.status(error.status).send({messageError:error.message});
  }
});


router.put("/:id", async (req, res) => {
  try {
    const {id} = req.params;
    if(!id || !uuidv4.isUuid(id)){
      throw { status:400 , message : 'id is not valid'}
    }
    
    const donation = req.body;
    
    if(isEmptyObject(donation)){
      throw { message:'invalid user', status:400 }
    }

    const updatedDonation = await donationService.updateDonation({
      id,
      ...donation
    });

    return res.status(200).send(updatedDonation);
    
  } catch (error) {
    error = handlerError(error);
    return res.status(error.status).send({messageError:error.message});
  }
});

router.delete("/:id", async (req, res) => {

  try {
    const {id} = req.params;
    if(!id || !uuidv4.isUuid(id)){
      throw { status:400 , message : 'id is not valid'}
    }
    const deletedDonation = await donationService.deleteDonation(id);

    return res.status(200).send(deletedDonation);
    
  } catch (error) {
    error = handlerError(error);
    return res.status(error.status).send({messageError:error.message});
  }


});

module.exports = router;