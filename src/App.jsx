import Navbar from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Coin from "./pages/Coin/Coin";
import Footer from "./components/Footer/Footer";
import Feature from "./pages/Feature/Feature";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Signup from "./pages/Signup/Signup";
import NotFound from "./pages/NotFound/NotFound";
import PublicRoute from "./components/PublicRoute/PublicRoute";
import Login from "./pages/Login/Login";

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coin/:coinId" element={<Coin />} />

        <Route
          path="/feature"
          element={
            <PrivateRoute>
              <Feature />
            </PrivateRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
