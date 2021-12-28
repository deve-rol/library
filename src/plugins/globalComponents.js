import UiCheckbox from "../components/inputs/UiCheckbox";
import UiRadioButton from "../components/inputs/UiRadioButton";
import UiSwitch from "../components/inputs/UiSwitch";

const components = {
  init(app) {
    app.component("UiCheckbox", UiCheckbox);
    app.component("UiRadioButton", UiRadioButton);
    app.component("UiSwitch", UiSwitch);
  },
};

export default components;
