const Customer = require("globalpayments-api").Customer;
const Address = require("globalpayments-api").Address;
const {
  ServicesConfig,
  ServicesContainer,
  CreditCardData,
  // Address,
} = require("globalpayments-api")

const config = new ServicesConfig();
config.secretApiKey = "skapi_cert_MfJJAgB3FGIA_uuYpgoqCCiT90ApZED-IK80OUd7og";
config.serviceUrl = "https://cert.api2.heartlandportico.com";

ServicesContainer.configure(config);

module.exports = {
  // createToken: async (data) => {
  //   var card = new CreditCardData();

  //   card = Object.assign(card, data.card_data)

  //   var address = new Address();
  //   address.postalCode = data.address.postalCode;

  //   const ret_this = () => {
  //     return new Promise((resolve, reject) => {
  //       card.tokenize()
  //         .withCurrency("USD")
  //         .withAddress(address)
  //         .execute()
  //         .then((response) => {
  //           resolve(response);
  //         }).catch((err) => {
            
  //           reject(err)
  //         })
  //     })
  //   }
  //   return await ret_this();
  // },
  createToken(){
    const config = new ServicesConfig();
    config.secretApiKey = "skapi_cert_MTyMAQBiHVEAewvIzXVFcmUd2UcyBge_eCpaASUp0A";
    config.serviceUrl = "https://cert.api2.heartlandportico.com";
    
    ServicesContainer.configure(config);
    
    const card = new CreditCardData();
    card.number = "4111111111111111";
    card.expMonth = "12";
    card.expYear = "2025";
    card.cvn = "123";
    card.cardHolderName = "Joe Smith";
    
    const address = new Address();
    address.postalCode = "12345";
    
    card
      .tokenize()
      .withCurrency("USD")
      .withAddress(address)
      .execute()
      .then((response) => {
        console.log(response);
    
        const token = new CreditCardData();
        token.token = response.token;
        token.expMonth = "12";
        token.expYear = "2025";
    
        token
          .authorize(10)
          .withCurrency("USD")
          .execute()
          .then((authorization) => {
            console.log("auth:", authorization);
          })
          .catch((err) => console.log(err));
      })
      .catch((error) => console.log(error));
  },
  chargeToken: async (data) => {

    const token = new CreditCardData();
    token.token = data.tk;
    token.expMonth = data.expMonth;
    token.expYear = data.expYear;
    const ret_this = () => {
      return new Promise((resolve, reject) => {
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
  },
  verifyCard: async (data) => {
    var card = new CreditCardData();

    card = Object.assign(card, data.card_data);
    
    const ret_this = () => {
      return new Promise((resolve, reject) => {
        card.verify()
          .withCurrency("USD")
          .withAddress(address)
          .execute();
      })
    }

    return await ret_this();
  },
  //   const response = await card.authorize(10)
  // .withCurrency("USD")
  // .withAddress(address)
  // .execute();
// }
}