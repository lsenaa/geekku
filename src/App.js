import { Routes, Route } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import LoginPerson from './components/Login/LoginPerson';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/loginPerson" element={<LoginPerson />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
