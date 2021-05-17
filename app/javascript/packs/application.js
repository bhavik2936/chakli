// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import * as ActiveStorage from "@rails/activestorage"
import "channels"
import "@fortawesome/fontawesome-free/css/all"
import "bootstrap"

Rails.start()
Turbolinks.start()
ActiveStorage.start()

// on document ready, the current function will be get executed
jQuery(function() {
  setNavigatorVibrate();
});

// initialize global NavigatorVibrate attributes
function setNavigatorVibrate() {
  window.gameVibration = {};
  window.gameVibration.scoreVibration = 25;
  window.gameVibration.strikeVibration = 50;
  window.gameVibration.gameOverVibration = 700;

  window.navigator.vibrate ??= window.navigator.mozVibrate;
}
