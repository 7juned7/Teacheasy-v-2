import {
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";

import Homepage from "./pages/Homepage";
import TeachEasy from "./pages/TeachEasy";

function App() {

  return (
    <div className="App">
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Homepage />} />
            <Route exact path="/teacheasy" element={<TeachEasy />} />
          </Routes>
        </div>
      </Router>

    </div>


  );
}

export default App;
