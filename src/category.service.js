const categoryDal = require('./category.dal');
const uuidv4 = require('uuidv4');

exports.getCategorys =  () => {
  return categoryDal.getCategorys();
}

exports.createCategory = async (category) => {
  category.id = uuidv4.uuid();
  const newCategory = await categoryDal.createCategory(category);
  return newCategory;
}
