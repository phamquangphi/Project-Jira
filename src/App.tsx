import { useRoutes } from "react-router-dom";
import { reouter } from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas);
function App() {
  return <div>{useRoutes(reouter)} </div>;
}

export default App;
