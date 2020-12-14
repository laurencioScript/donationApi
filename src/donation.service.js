const donationDal = require('./donation.dal');
const uuidv4 = require('uuidv4');

exports.getDonations =  () => {
  return donationDal.getDonations();
}

exports.getDonation =  (id) => {
  return donationDal.getDonation(id);
}

exports.createDonation = async (donation) => {
  donation.id = uuidv4.uuid();
  const newDonation = await donationDal.createDonation(donation);
  return newDonation;
}


exports.deleteDonation = (id) => {
  return donationDal.deleteDonation(id);
}


exports.updateDonation = async (donation) => {
  const donationSaved = await this.getDonation(donation.id);
  if(!donationSaved || !donationSaved.id ){
    throw { status:400 , message : 'id is not valid'}
  }
  donation.name = donation.name != undefined ? donation.name : donationSaved.name;
  donation.donorId = donation.donorId != undefined ? donation.donorId : donationSaved.donorId;
  donation.recipientId = donation.recipientId != undefined ? donation.recipientId : donationSaved.recipientId;
  donation.status = donation.status != undefined ? donation.status : donationSaved.status;
  donation.equipmentDescription = donation.equipmentDescription != undefined ? donation.equipmentDescription : donationSaved.equipmentDescription;
  donation.interestedStudent = donation.interestedStudent != undefined ? donation.interestedStudent : donationSaved.interestedStudent;
  donation.equipmentDelivery = donation.equipmentDelivery != undefined ? donation.equipmentDelivery : donationSaved.equipmentDelivery;
  donation.category = donation.category != undefined ? donation.category : donationSaved.category;
  donation.allowWithdrawalAddress = donation.allowWithdrawalAddress != undefined ? donation.allowWithdrawalAddress : donationSaved.category;
  donation.creationDate = donation.creationDate != undefined ? donation.creationDate : donationSaved.creationDate;

  return donationDal.updateDonation(donation);
}
