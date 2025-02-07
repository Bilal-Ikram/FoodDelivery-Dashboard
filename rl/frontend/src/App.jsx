import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup/pages/Signup";
import LoginPage from "./components/login/pages/LoginPage.jsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} /> {/* as default */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>{" "}
        {/* End Routes */} {/* End Router */} {/* End App */}
        {/* Add more routes as needed */}
      </Router>
    </>
  );
}

export default App;
