// interface UserAuth {
//     checkPassword(password: string) : boolean;
//     resetPassword();
//     setGoogleToken(token : string);
//     checkGoogleLogin(token : string) : boolean;
//     setFacebookToken(token : string);
//     getFacebookLogin(token : string) : boolean;
// }

interface Auth {
  checkPassword(password: string): boolean;
  resetPassword(): void;
}

interface AuthGoogle {
  setGoogleToken(token: string): void;
  checkGoogleLogin(token: string): boolean;
}

interface AuthFacebook {
  setFacebookToken(token: string): void;
  getFacebookLogin(token: string): boolean;
}

class User implements Auth, AuthGoogle, AuthFacebook {
  private _password: string = "user";
  private _facebookToken!: string;
  private _googleToken!: string;

  //Interesting detail here: while I did not define a return type or param type, any deviation from the interface will give you an error.
  // Test it out by uncommenting the code below.
  checkGoogleLogin(token: string) {
    // return "this will not work";
    return token === this._googleToken;
  }

  setGoogleToken(token: string) {
    this._googleToken = token;
  }

  getFacebookLogin(token: string) {
    return token === this._facebookToken;
  }

  setFacebookToken(token: string) {
    this._facebookToken = token;
  }

  checkPassword(password: string): boolean {
    return password === this._password;
  }

  resetPassword() {
    this._password = prompt("What is your new password?") || "";
  }
}

//admin cannot use google or facebook token
class Admin implements Auth {
  private _password: string = "admin";

  checkPassword(password: string): boolean {
    return password === this._password;
  }

  resetPassword() {
    this._password = prompt("What is your new password?") || "";
  }
}

class GoogleBot implements AuthGoogle {
  private _googleToken!: string;

  checkGoogleLogin(token: string) {
    return token === this._googleToken;
  }

  setGoogleToken(token: string) {
    this._googleToken = token;
  }
}

const passwordElement = <HTMLInputElement>document.querySelector("#password");
const typePasswordElement = <HTMLInputElement>document.querySelector("#typePassword");
const typeGoogleElement = <HTMLInputElement>document.querySelector("#typeGoogle");
const typeFacebookElement = <HTMLInputElement>document.querySelector("#typeFacebook");
const loginAsAdminElement = <HTMLInputElement>document.querySelector("#loginAsAdmin");
const resetPasswordElement = <HTMLAnchorElement>document.querySelector("#resetPassword");
const loginForm = document.querySelector("#login-form") as HTMLElement;

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
  } else {
    alert("login failed");
  }
});

resetPasswordElement.addEventListener("click", (event) => {
  event.preventDefault();

  let user = loginAsAdminElement.checked ? admin : guest;
  user.resetPassword();
});
