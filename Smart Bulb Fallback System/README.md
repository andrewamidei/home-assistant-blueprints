This code is built for situations where you want to use smart bulbs and the existing light switch on the wall without cutting the power to the smart bulbs.

The Home Assistant automation is designed to send commands to smart bulbs rather than cutting the power from a Shelly relay. If the Shelly relay loses connection to the router or the internet goes out, the script will detect this and manually switch the power of the smart bulbs. This prevents them from getting stuck in a state, which can be frustrating.

## Installation Instructions

Paste the Shelly script in the Shelly web UI for your shelly device controlling the smart bulbs. Replace `<HomeAssistantURL>` with your home assistant local URL. To set up the Shelly script, follow this link: https://shelly-api-docs.shelly.cloud/gen2/Scripts/Tutorial/.
```
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
```

### Import the automation into Home Assistant

[![Open your Home Assistant instance and show the blueprint import dialog with a specific blueprint pre-filled.](https://raw.githubusercontent.com/andrewamidei/home-assistant-blueprints/refs/heads/main/Smart%20Bulb%20Fallback%20System/shelly_smart_lights_logic.yaml)

After that your lights will stay on unless connection between Home Assistant and the shelly is lost. then your shelly device will fall back to manually switching the light! 

