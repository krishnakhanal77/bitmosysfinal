import { Route, Routes } from "react-router-dom";
import CryptoPage from "./pages/crypto-page/CryptoPage";
import HomePage from "./pages/home-page/HomePage";
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/crypto-page" element={<CryptoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


