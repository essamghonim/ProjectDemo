Parse.Cloud.define('pushChannelTest', function(request, response) {

  // request has 2 parameters: params passed by the client and the authorized user
  var params = request.params;
  var user = request.user;

  // To be used with:
  // https://github.com/codepath/ParsePushNotificationExample
  // See https://github.com/codepath/ParsePushNotificationExample/blob/master/app/src/main/java/com/test/MyCustomReceiver.java
  var customData = params.customData;
  var launch = params.launch;
  var broadcast = params.broadcast;

  // use to custom tweak whatever payload you wish to send
  var pushQuery = new Parse.Query(Parse.Installation);
  pushQuery.equalTo("deviceType", "android");

  var payload = {};

  if (customData) {
      payload.customdata = customData;
  }
  else if (launch) {
      payload.launch = launch;
  }
  else if (broadcast) {
      payload.broadcast = broadcast;
  }

  // Note that useMasterKey is necessary for Push notifications to succeed.

  Parse.Push.send({
  where: pushQuery,      // for sending to a specific channel
  data: payload,
  }, { success: function() {
     console.log("#### PUSH OK");
  }, error: function(error) {
     console.log("#### PUSH ERROR" + error.message);
  }, useMasterKey: true});

  response.success('success');
});

// iOS push testing
Parse.Cloud.define("iosPushTest", function(request, response) {

  // request has 2 parameters: params passed by the client and the authorized user                                                                                                                               
  var params = request.params;
  //var user = request.user;
var user = new Parse.User();
user.id = request.params.ID;    
  // Our "Message" class has a "text" key with the body of the message itself                                                                                                                                    
  var messageText = params.text;
Parse.Cloud.useMasterKey();
  var pushQuery = new Parse.Query(Parse.Installation);
  pushQuery.equalTo('deviceType', 'ios');                                                                                                                                        

  Parse.Push.send({
    where: pushQuery, // Set our Installation query                                                                                                                                                              
    data: {
      alert: "Best Of Luck",
    badge: 1,
    sound: 'default'
    }
  }, { success: function() {
      //console.log("#### PUSH OK");
  response.success('Push Sent!');
  }, error: function(error) {
      //console.log("#### PUSH ERROR" + error.message);
  response.success('Error ' + error.message);
  }, useMasterKey: true});

});
  Parse.Cloud.define("PushNotification", function(request, response) {
var user = new Parse.User();
user.id = request.params.ID;                                                                                                                                    
var messageText = request.params.text;
Parse.Cloud.useMasterKey();
var pushQuery = new Parse.Query(Parse.Installation);
pushQuery.equalTo('user', user);
  Parse.Push.send({
    where: pushQuery, // Set our Installation query                                                                                                                                                              
    data: {
      alert: messageText,
    badge: 1,
    sound: 'default'
    }
  }, { success: function() {
      //console.log("#### PUSH OK");
  response.success('Push Sent!');
  }, error: function(error) {
      //console.log("#### PUSH ERROR" + error.message);
  response.success('Error ' + error.message);
  }, useMasterKey: true});
    });
Parse.Cloud.define("setDeviceToken", function(request, response) {
    var installationId = request.params.installationId;
    var deviceToken = request.params.deviceToken;
    console.log(installationId, deviceToken);

    var query = new Parse.Query(Parse.Installation);
    query.get(installationId, {useMasterKey: true}).then(function(installation) {
        console.log(installation);
        installation.set("deviceToken", deviceToken);
        installation.save(null, {useMasterKey: true}).then(function() {
            console.log("save success");
            response.success(true);
        }, function(error) {
            console.log("save console.error()");
            response.error(error);
        })
    }, function (error) {
        console.log(error);
    })
});
