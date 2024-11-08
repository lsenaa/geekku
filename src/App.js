import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import InteriorMain from './components/Interior/InteriorMain/Main';
import CompanyList from './components/Interior/companyList/Main';
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/interiorMain" element={<InteriorMain/>} />
        <Route path="/companyMain" element={<CompanyList/>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
