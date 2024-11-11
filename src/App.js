import './App.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Main from './components/main/Main';
import EstateSearch from './components/estate/estateSearch/EstateSearch';
import InteriorMain from './components/Interior/InteriorMain/Main';
import AllStopWrite from './components/Allstop/AllStopWirte';
import MyInteriorMain from './components/MyInteriorPage/MyInteriorMain';
import CommunityMain from './components/community/communityMain/CommunityMain';
import CommunityBoardWrite from './components/community/communityWrite/CommunityBoardWrite';
import CommunityBoardDetail from './components/community/communityBoardDetail/CommunityBoardDetail';
import LoginPerson from './components/Login/LoginPerson';
import { Route, Routes } from 'react-router';
import CommunityList from './components/community/communityMain/CommunityList';
import CompanyList from './components/Interior/InteriorMain/CompanyList';
import PersonProfilePage from './components/MyPage/PersonProfilePage';

function App() {
  return (
    <div className='appContainer'>
      <Header />
      <Routes>
        {/* Estate */}
        <Route path="/" element={<Main />} />
        <Route path="/estateSearch" element={<EstateSearch />} />

        {/* Interior */}
        <Route path="/interiorMain" element={<InteriorMain/>} />
        <Route path="/companyMain" element={<CompanyList/>} />
        <Route path="/estateSearch" element={<EstateSearch />} />

        {/* AllStop */}
        <Route path="/allStopWrite" element={<AllStopWrite />} />
        <Route path="/myInteriorPage" element={<MyInteriorMain />} />

        {/* Communnity */}
        <Route path="/communityMain" element={<CommunityMain/>} />
        <Route path="/communityList" element={<CommunityList/>} />
        <Route path="/communityBoardWrite" element={<CommunityBoardWrite/>}/>
        <Route path='/communityBoardDetail' element={<CommunityBoardDetail/>}/>

        {/* Login */}
        <Route path="/loginPerson" element={<LoginPerson />} />

        {/* MyPage */}
        <Route path='/personProfilePage' element={<PersonProfilePage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
