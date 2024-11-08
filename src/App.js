import './App.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Main from './components/main/Main';
import EstateSearch from './components/estate/estateSearch/EstateSearch';
import InteriorMain from './components/Interior/InteriorMain/Main';
import AllStopWrite from './components/Allstop/AllStopWirte';
import MyInteriorMain from './components/MyInteriorPage/MyInteriorMain';

function App() {
  return (
    <div className='appContainer'>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/estateSearch" element={<EstateSearch />} />
        <Route path="/interiorMain" element={<InteriorMain/>} />
        <Route path="/companyMain" element={<CompanyList/>} />
        <Route path="/estateSearch" element={<EstateSearch />} />
        <Route path="/allStopWrite" element={<AllStopWrite />} />
        <Route path="/myInteriorPage" element={<MyInteriorMain />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
