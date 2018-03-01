function getUsername(formName) {
  console.log(gitty.setName(formName));
  console.log(">> ", gitty.getName());
  console.log(gitty.getGitHubAccount());
  
  return false;
}

// gitty module
var gitty = (function() {
  var userName = "";
  var userAvatar = "";
  var userLocation = "";
  var userRepos = 0;
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
                userLocation = obj.location;
                userRepos = obj.public_repos;
                loadUserInfo();
                
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

  // Check if a node for user image or text already exists and remove it
  var checkNodeForChildren = function(node) {
    if (document.getElementById(node).children.length > 0)
    {
      // If there is already a node, let's remove it
      var targetNode = document.getElementById(node);
      while (targetNode.firstChild) 
      {
          targetNode.removeChild(targetNode.firstChild);
      } 
    }
  }

  var loadUserInfo = function() {
    // Load the user image into the page
    checkNodeForChildren('imageDiv');
    var image = document.createElement("img");
    var imageParent = document.getElementById("imageDiv");
    image.id = "avatar";
    image.width = 175;
    image.src = userAvatar;
    imageParent.appendChild(image); 

    // Load the user's details into the page
    checkNodeForChildren('userInfoDiv');
    var userInfo = document.createElement("h3");
    var userInfoParent = document.getElementById("userInfoDiv");
    userInfo.innerHTML = userName + " | " + userLocation + "<br>" + "repos: " + userRepos;
    userInfoParent.appendChild(userInfo);
    

    console.log(":: ", userName, userLocation, userRepos);
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
                //console.log('User\'s name is ' + xhr.responseText);
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


// Google Maps API code
function initMap() {
  var uluru = {lat: 39.393, lng: -76.604};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 2,
    center: uluru
  });
  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });
  }
