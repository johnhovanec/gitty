function getUsername(formName) {
  console.log(gitty.setName(formName));
  console.log(">> ", gitty.getName());
  console.log(gitty.getGitHubAccount());
  
  return false;
}

// gitty module with Revealing Module pattern
var gitty = (function() {
  var userName = "";
  var userAvatar = "";
  var rootUrl = "https://api.github.com";
  
  var getUserName = function() {
    return userName;
  };
  
  var setUserName = function(inName) {
    userName = inName;
    return userName;
  };
  
  var getGitHubAccount = function() {
    var xhr = new XMLHttpRequest();
        xhr.open('GET', rootUrl + '/users/' + userName);
        xhr.onload = function() {
            if (xhr.status === 200) {
                console.log('User\'s name is ' + xhr.responseText);
                var obj = JSON.parse(xhr.responseText);
                userAvatar = obj.avatar_url;
              
                // extract this to a function
                var image = document.createElement("img");
                var imageParent = document.getElementById("imageDiv");
                image.id = "avatar";
                image.width = 175;
                image.src = userAvatar;
                //element.src = "https://avatars0.githubusercontent.com/u/65382?v=4">";
                imageParent.appendChild(image);
                console.log(userAvatar);
            }
            else {
                console.log('Request failed.  Returned status of ' + xhr.status);
            }
    };
    xhr.send();
  };
  
  var getPicture = function() {
    return userAvatar;
  };
  
  return {
    setName: setUserName,
    getName: getUserName,
    getGitHubAccount: getGitHubAccount,
    getPicture: getPicture
  }
})();

var gitHubAccount = (function(gitty) {
  console.log("In 2 ..." );
  
  gitty.extension = function callMe() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', rootUrl + '/users/' + userName);
        xhr.onload = function() {
            if (xhr.status === 200) {
                console.log('User\'s name is ' + xhr.responseText);
            }
            else {
                console.log('Request failed.  Returned status of ' + xhr.status);
            }
    };
    xhr.send();
  };
  
  return {
    gitty
  }
  
})(gitty);

