import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Catalog from './components/Catalog/Catalog';
import Header from './components/Header/Header';
import Banner from './components/Banner/Banner';
import Footer from './components/Footer/Footer';
import NotFound from './components/NotFound/NotFound';
import About from './pages/About/About';
import Contacts from './pages/Contacts/Contacts';
import Item from './pages/Item/Item';
import Cart from './pages/Cart/Cart';
import './App.css';

const App = () => (
  <>
    <Header />
    <main className="container">
      <div className="row">
        <div className="col">
          <Banner />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/about" element={<About />} />
            <Route path="/catalog/:id" element={<Item />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={< NotFound />}/>
          </Routes>
        </div>
      </div>
    </main>
    <Footer />
  </>
);

export default App;
