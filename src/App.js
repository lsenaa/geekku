import './App.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Main from './components/main/Main';
import EstateSearch from './components/estate/estateSearch/EstateSearch';
import InteriorMain from './components/Interior/InteriorMain/Main';
import AllStopWrite from './components/Allstop/AllStopWirte';
import MyInteriorMain from './components/MyInteriorPage/MyInteriorMain';
import CommunityMain from './components/Community/CommunityMain/CommunityMain';
import CommunityBoardWrite from './components/Community/CommunityWrite/CommunityBoardWrite';
import CommunityBoardDetail from './components/Community/CommunityBoardDetail/CommunityBoardDetail';

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
         <Route path="/CommunityMain" element={<CommunityMain/>} />
        <Route path="/CommunityBoardWrite" element={<CommunityBoardWrite/>}/>
        <Route path='/CommunityBoardDetail' element={<CommunityBoardDetail/>}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
