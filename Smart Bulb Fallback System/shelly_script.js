let userdata = null;
var url = "http://<HomeAssistantURL>/empty";

 function eventcallback(userdata) {
  // print("Event called: ", JSON.stringify(userdata));
  // check if this a button press event
  if (userdata.info.event==="toggle" && userdata.component === "input:0") {
     // print("switch event");
     Shelly.call("HTTP.GET", { url: url, timeout: 1000 },
       function (res, error_code, error_msg) {
         if (error_code !== 0) {
           // print("The device is offline");
           Shelly.call("Switch.toggle","{ id:0 }", null);
         } 
       }, null);
  }
 }
 
 Shelly.addEventHandler(eventcallback, userdata);