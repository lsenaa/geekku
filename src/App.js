import './App.css';
import { Route, Routes } from 'react-router';
<<<<<<< HEAD
import CommunityList from './components/community/communityMain/CommunityList';
import CompanyList from './components/interior/companyList/Main';
import MypagePerson from './components/mypage/person/mypagePersonMain/MypagePerson';
import EstateWrite from './components/estate/estateWrite/EstateWrite'
import HouseMain from './components/house/HouseMain'
import HouseWrite from './components/house/houseWrite/HouseWrite'
import HouseDetail from './components/house/houseDetail/HouseDetail'
import OneStopWrite from './components/oneStop/oneStopWrite/oneStopWrite'
import OneStopDetail from './components/oneStop/oneStopDetail/oneStopDetail'
import MypageInteriorMain from './components/mypage/interior/mypageInteriorMain/MypageInteriorMain';
import MypageInteriorModify from './components/mypage/interior/mypageInteriorModify/MypageInteriorModify';
import Login from './components/login/Login';
import JoinPerson from './components/join/JoinPerson';
import JoinCompany from './components/join/JoinCompany';
import JoinInterior from './components/join/JoinInterior';
import PersonInfo from './components/mypage/info/PersonInfo';
import CompanyInfo from './components/mypage/info/CompanyInfo';
import SearchId from './components/login/SearchId';
=======
import { Suspense } from 'react';
import Header from 'components/layout/header/Header';
import Footer from 'components/layout/footer/Footer';
import Router from 'routes/Router';
>>>>>>> 297ff730838e6f0e3c89954117254f14dc7e2a9f

function App() {
  return (
    <div className="appContainer">
      <Header />
<<<<<<< HEAD
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
        <Route path="/interiorMain" element={<InteriorMain />} />
        <Route path="/companyMain" element={<CompanyList />} />

        {/* Onestop */}
        <Route path="/oneStopWrite" element={<OneStopWrite />} />
        <Route path="/oneStopDetail" element={<OneStopDetail />} />

        {/* Communnity */}
        <Route path="/communityMain" element={<CommunityMain />} />
        <Route path="/communityList" element={<CommunityList />} />
        <Route path="/communityBoardWrite" element={<CommunityBoardWrite />} />
        <Route path='/communityBoardDetail' element={<CommunityBoardDetail />} />

        {/* MyPage */}
        <Route path='/mypagePerson' element={<MypagePerson />} />
        <Route path="/mypageInterior" element={<MypageInteriorMain />} />
        <Route path="/mypageInteriorModify" element={<MypageInteriorModify />} />
        <Route path='/personInfo' element={<PersonInfo />} />
        <Route path='/companyInfo' element={<CompanyInfo />} />

        {/* Login */}
        <Route path='/login' element={<Login />} />
        <Route path='/searchId' element={<SearchId />} />

        {/* Join */}
        <Route path='/joinPerson' element={<JoinPerson />} />
        <Route path='/joinCompany' element={<JoinCompany />} />
        <Route path='/joinInterior' element={<JoinInterior />} />


      </Routes>
=======
      <Suspense fallback={<div>Loading...</div>}>
        <Router />
      </Suspense>
>>>>>>> 297ff730838e6f0e3c89954117254f14dc7e2a9f
      <Footer />
    </div>
  );
}

export default App;
