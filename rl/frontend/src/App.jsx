import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupPage from "./components/signup/pages/Signup.jsx";
import LoginPage from "./components/login/pages/LoginPage.jsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<SignupPage />} /> {/* as default */}
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>{" "}
        {/* End Routes */} {/* End Router */} {/* End App */}
      </Router>
    </>
  );
}

export default App;
