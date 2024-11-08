import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Routes, Route } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import AllStopWrite from './components/Allstop/AllStopWirte';
import MyInteriorMain from './components/MyInteriorPage/MyInteriorMain';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/allStopWrite" element={<AllStopWrite />} />
        <Route path="/myInteriorPage" element={<MyInteriorMain />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
