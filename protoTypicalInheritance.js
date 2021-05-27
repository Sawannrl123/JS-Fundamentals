/**
 * Prototypical Inheritance
 */
 function User(email, name) {
  this.email = email;
  this.name = name;
  this.online = false;
}

User.prototype.login = function() {
  this.online = true;
  console.log(this.email + " is LoggedIn.");
}

User.prototype.logout = function() {
  this.online = false;
  console.log(this.email + " is LoggedOut.");
}

function Admin(...args) {
  User.apply(this, args);
  
}

Admin.prototype = Object.create(User.prototype);

Admin.prototype.deleteUser = function(u){
  users = users.filter(user => user.email !== u.email);
}

console.log(User.prototype);

var userOne = new User("sawannirala.09@gmail.com", "Sawan Nirala");
var userTwo = new User("sawannirala@gmail.com", "Sawan Kumar");
var admin = new Admin("ananya@gmail.com", "Ananya Kumari");

const users = [userOne, userTwo];

console.log(admin);

