"use strict";
// interface UserAuth {
//     checkPassword(password: string) : boolean;
//     resetPassword();
//     setGoogleToken(token : string);
//     checkGoogleLogin(token : string) : boolean;
//     setFacebookToken(token : string);
//     getFacebookLogin(token : string) : boolean;
// }
class User {
    constructor() {
        this._password = "user";
    }
    //Interesting detail here: while I did not define a return type or param type, any deviation from the interface will give you an error.
    // Test it out by uncommenting the code below.
    checkGoogleLogin(token) {
        // return "this will not work";
        return token === this._googleToken;
    }
    setGoogleToken(token) {
        this._googleToken = token;
    }
    getFacebookLogin(token) {
        return token === this._facebookToken;
    }
    setFacebookToken(token) {
        this._facebookToken = token;
    }
    checkPassword(password) {
        return password === this._password;
    }
    resetPassword() {
        this._password = prompt("What is your new password?") || "";
    }
}
//admin cannot use google or facebook token
class Admin {
    constructor() {
        this._password = "admin";
    }
    checkPassword(password) {
        return password === this._password;
    }
    resetPassword() {
        this._password = prompt("What is your new password?") || "";
    }
}
class GoogleBot {
    checkGoogleLogin(token) {
        return token === this._googleToken;
    }
    setGoogleToken(token) {
        this._googleToken = token;
    }
}
const passwordElement = document.querySelector("#password");
const typePasswordElement = document.querySelector("#typePassword");
const typeGoogleElement = document.querySelector("#typeGoogle");
const typeFacebookElement = document.querySelector("#typeFacebook");
const loginAsAdminElement = document.querySelector("#loginAsAdmin");
const resetPasswordElement = document.querySelector("#resetPassword");
const loginForm = document.querySelector("#login-form");
let guest = new User();
let admin = new Admin();
let googleBot = new GoogleBot();
loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let user = loginAsAdminElement.checked ? admin : guest;
    if (user === guest) {
        user.setGoogleToken("secret_token_google");
        user.setFacebookToken("secret_token_fb");
    }
    // debugger
    let auth = false;
    switch (true) {
        case typePasswordElement.checked:
            auth = user.checkPassword(passwordElement.value);
            break;
        case typeGoogleElement.checked && user === guest:
            if (user === guest) {
                auth = user.checkGoogleLogin("secret_token_google");
            }
            break;
        case typeFacebookElement.checked:
            // debugger;
            if (user === guest) {
                auth = user.getFacebookLogin("secret_token_fb");
            }
            break;
    }
    if (auth) {
        alert("login success");
    }
    else {
        alert("login failed");
    }
});
resetPasswordElement.addEventListener("click", (event) => {
    event.preventDefault();
    let user = loginAsAdminElement.checked ? admin : guest;
    user.resetPassword();
});
