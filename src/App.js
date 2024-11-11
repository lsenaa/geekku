import './App.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Main from './components/main/Main';
import EstateSearch from './components/estate/estateSearch/EstateSearch';
import InteriorMain from './components/Interior/InteriorMain/Main';
import MyInteriorMain from './components/myInteriorPage/myInteriorMain/MyInteriorMain';
import CommunityMain from './components/community/communityMain/CommunityMain';
import CommunityBoardWrite from './components/community/communityWrite/CommunityBoardWrite';
import CommunityBoardDetail from './components/community/communityBoardDetail/CommunityBoardDetail';
import LoginPerson from './components/Login/LoginPerson';
import { Route, Routes } from 'react-router';
import CommunityList from './components/community/communityMain/CommunityList';
import CompanyList from './components/Interior/companyList/Main';
import PersonProfilePage from './components/myPage/PersonProfilePage';
import EstateWrite from './components/estate/estateWrite/EstateWrite'
import HouseMain from './components/house/HouseMain'
import HouseWrite from './components/house/houseWrite/HouseWrite'
import HouseDetail from './components/house/houseDetail/HouseDetail'
import MyInteriorModify from './components/myInteriorPage/myInteriorModify/MyInteriorModify'
import OneStopWrite from './components/oneStop/oneStopWrite/oneStopWrite'
import OneStopDetail from './components/oneStop/oneStopDetail/oneStopDetail'

function App() {
  return (
    <div className="appContainer">
      <Header />
      <Routes>
        {/* Estate */}
        <Route path="/" element={<Main />} />
        <Route path="/estateSearch" element={<EstateSearch />} />
        <Route path="/estateWrite" element={<EstateWrite />} />

        {/* House */}
        <Route path="/houseMain" element={<HouseMain />} />
        <Route path="/houseWrite" element={<HouseWrite />} />
        <Route path="/houseDetail/:num" element={<HouseDetail />} />

        {/* Interior */}
        <Route path="/interiorMain" element={<InteriorMain/>} />
        <Route path="/companyMain" element={<CompanyList/>} />
        <Route path="/estateSearch" element={<EstateSearch />} />
        
        {/* Onestop */}
        <Route path="/oneStopWrite" element={<OneStopWrite />} />
        <Route path="/oneStopDetail" element={<OneStopDetail />} />

        {/* Communnity */}
        <Route path="/communityMain" element={<CommunityMain/>} />
        <Route path="/communityList" element={<CommunityList/>} />
        <Route path="/communityBoardWrite" element={<CommunityBoardWrite/>}/>
        <Route path='/communityBoardDetail' element={<CommunityBoardDetail/>}/>

        {/* Login */}
        <Route path="/loginPerson" element={<LoginPerson />} />

        {/* MyPage */}
        <Route path='/personProfilePage' element={<PersonProfilePage />} />
        <Route path="/myInteriorPage" element={<MyInteriorMain />} />
        <Route path="/myInteriorModify" element={<MyInteriorModify />} />
        
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
