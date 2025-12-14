import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin";
import Spin from "./pages/Spin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/spin/:token" element={<Spin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
