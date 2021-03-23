const Customer = require("globalpayments-api").Customer;
const Address = require("globalpayments-api").Address;
const {
  ServicesConfig,
  ServicesContainer,
  CreditCardData,
  // Address,
} = require("globalpayments-api")

const config = new ServicesConfig();
config.secretApiKey = "skapi_cert_MTyMAQBiHVEAewvIzXVFcmUd2UcyBge_eCpaASUp0A";
config.serviceUrl = "https://cert.api2.heartlandportico.com";

ServicesContainer.configure(config);

module.exports = {
  createToken: async (data) => {
    var card = new CreditCardData();

    card = Object.assign(card, data.card_data)
    
    var address = new Address();
    address.postalCode = data.address.postalCode;
  
  const ret_this = () =>{
    return new Promise((resolve , reject)=>{
      card.tokenize()
      .withCurrency("USD")
      .withAddress(address)
      .execute()
      .then((response) => {
        resolve(response);
      }).catch((err) => reject(err) )
    })
  }
   return await ret_this();
  },

  chargeToken: async (data) => {

    const token = new CreditCardData();
    token.token = data.tk;
    token.expMonth = data.expMonth;
    token.expYear = data.expYear;
    const ret_this = () =>{
      return new Promise((resolve , reject)=>{
        token
        .authorize(data.amount)
        .withCurrency("USD")
        .execute()
        .then((authorization) => {
          resolve(authorization)
        })
        .catch((err) => {
          reject(err)
        });
      })
    }

    return await ret_this();
  }
}