import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import "w3-css/3/w3.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPlus,
  faPencilAlt,
  faArchway,
  faUserCog,
  faUser,
  faAddressCard,
  faList,
  faFileUpload,
  faFileDownload,
  faCloudDownloadAlt,
  faCloudUploadAlt,
  faTrashAlt,
  faFingerprint,
  faCalendar,
  faClock,
  faBed,
  faThumbtack,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(
  faPlus,
  faPencilAlt,
  faArchway,
  faUserCog,
  faUser,
  faAddressCard,
  faList,
  faFileUpload,
  faFileDownload,
  faCloudDownloadAlt,
  faCloudUploadAlt,
  faTrashAlt,
  faFingerprint,
  faCalendar,
  faClock,
  faBed,
  faThumbtack
);

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(store)
  .mount("#app");
