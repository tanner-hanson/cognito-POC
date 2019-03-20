global.fetch = require('node-fetch');
const fetch = require("node-fetch");
var AmazonCognitoIdentity = require('amazon-cognito-identity-js');
var CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;

exports.handler = (event) => {
var poolData = {
    UserPoolId : process.env.UserPoolId,
    ClientId : process.env.ClientId
};
var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

var attributeList = [];
var username = event.username;
var phonenumberValue = event.phonenumber;
var emailValue = event.email;

var dataEmail = {
    Name : 'email',
    Value : emailValue
};

var dataPhoneNumber = {
    Name : 'phone_number',
    Value : phonenumberValue
};



var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
var attributePhoneNumber = new AmazonCognitoIdentity.CognitoUserAttribute(dataPhoneNumber);

attributeList.push(attributeEmail);
attributeList.push(attributePhoneNumber);


userPool.signUp(username, 'ABCabc123!@#', attributeList, null, function(err, result){
    if (err) {
        console.log(err.message || JSON.stringify(err));
        return;
    }
    var cognitoUser = result.user;
    console.log('user name is ' + cognitoUser.getUsername());
});

};
