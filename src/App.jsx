import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import routes from "./routes/routes";

function App() {
  return (
    <>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path={routes.HOME} element={<Layout />}>
            <Route index element={<Home />} />
            <Route path={routes.USUARIOS} element={<Home />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
