function getUsername(formName) {
  console.log(gitty.setName(formName));
  console.log(">> ", gitty.getName());
  console.log(gitty.getGitHubAccount());
  return false;
}

// gitty module with Revealing Module pattern
var gitty = (function() {
  var userName = "";
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
                obj = JSON.parse(xhr.responseText);
                console.log(obj.name);
            }
            else {
                console.log('Request failed.  Returned status of ' + xhr.status);
            }
    };
    xhr.send();
  };
  
  return {
    setName: setUserName,
    getName: getUserName,
    getGitHubAccount: getGitHubAccount
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

