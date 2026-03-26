import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Orders from './pages/Orders';
import Dashboard from './pages/Dashboard';
import Checkout from './pages/Checkout';
import Vision2030 from './pages/Vision2030';

import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <CartProvider>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/vision-2030" element={<Vision2030 />} />
              </Routes>
            </Layout>
          </CartProvider>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
