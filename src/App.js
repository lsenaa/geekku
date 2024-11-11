import './App.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Main from './components/main/Main';
import EstateSearch from './components/estate/estateSearch/EstateSearch';
import InteriorMain from './components/Interior/InteriorMain/Main';
import MyInteriorMain from './components/MyInteriorPage/MyInteriorMain/MyInteriorMain';
import CommunityMain from './components/Community/CommunityMain/CommunityMain';
import CommunityBoardWrite from './components/Community/CommunityWrite/CommunityBoardWrite';
import CommunityBoardDetail from './components/Community/CommunityBoardDetail/CommunityBoardDetail';
import LoginPerson from './components/Login/LoginPerson';
import { Route, Routes } from 'react-router';
import CommunityList from './components/Community/CommunityMain/CommunityList';
import CompanyList from './components/Interior/InteriorMain/CompanyList';
import MyInteriorModify from './components/MyInteriorPage/MyInteriorModify/MyInteriorModify';
import OneStopDetail from './components/oneStop/oneStopDetail/oneStopDetail';
import OneStopWrite from './components/oneStop/oneStopWrite/oneStopWrite';

function App() {
  return (
    <div className='appContainer'>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/estateSearch" element={<EstateSearch />} />
        <Route path="/interiorMain" element={<InteriorMain/>} />
        <Route path="/companyMain" element={<CompanyList/>}/>
        <Route path='/companyRegister' element={<CompanyRegister/>}/>
        <Route path="/estateSearch" element={<EstateSearch />} />
        <Route path="/oneStopWrite" element={<OneStopWrite />} />
        <Route path="/oneStopDetail" element={<OneStopDetail />} />
        <Route path="/myInteriorPage" element={<MyInteriorMain />} />
        <Route path="/myInteriorModify" element={<MyInteriorModify />} />
        <Route path="/CommunityMain" element={<CommunityMain />} />
        <Route path="/CommunityList" element={<CommunityList />} />
        <Route path="/CommunityBoardWrite" element={<CommunityBoardWrite />} />
        <Route path='/CommunityBoardDetail' element={<CommunityBoardDetail />} />
        <Route path="/loginPerson" element={<LoginPerson />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
