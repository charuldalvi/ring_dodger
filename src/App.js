import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import PlanetInfo from "./PlanetInfo";
import GameOverUI from "./GameOverUI";
import Gameplay from "./Gameplay";
import GameplayNext from "./GameplayNext";
import MenuUI from "./MenuUI";
import useStore from "./store";




function App() {
  
  


  return (
   <Router>
      <div>
      <Switch>
        <Route exact = "true" path="/Space Explorer" component={MenuUI}/>
        <Route exact = "true" path="/Gameplay" component={Gameplay}/>
        <Route exact = "true" path="/GameplayNext" component={GameplayNext}/>
        <Route exact = "true" path="/GameOverUI" component={GameOverUI}/>
        <Route exact = "true" path="/PlanetInfo" component={PlanetInfo}/>
        
      </Switch>
    </div>
   </Router>
  );
}

export default App;
