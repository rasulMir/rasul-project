import Common from "./components/Common.js";
import Slider from "./components/Slider.js";
import Zoom from "./components/Zoom.js";
let common = new Common;
common.hideLoader();

let slider = new Slider;
slider.init();

let zoom = new Zoom;
zoom.init();