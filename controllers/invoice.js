const bcrypt = require("bcryptjs");
const invoiceCollenction = require("../model/invoice");
const findUser = (col, query) => {
  return new Promise((resolve, reject) => {
    MONGO.collection(col).findOne(query, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}
module.exports = {
  async getInvoices(req, res) {
      var _data = req.body;
      console.log(req.cookies)
    //   if()
    const data = req.body;
    // invoiceCollenction



  },
  async makeRecurringPayment(req, res){
    //Get All active Users
    let _users = await findUser('users', {isActive: true, paymentFailed: false});
    


  },
  makePaymentFk(req, res){
    


  }
}