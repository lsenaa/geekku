import { Routes, Route } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import CommunityMain from './components/Community/CommunityMain/CommunityMain';
import CommunityBoardWrite from './components/Community/CommunityWrite/CommunityBoardWrite';
import CommunityBoardDetail from './components/Community/CommunityBoardDetail/CommunityBoardDetail';

function App() {
  return (
    <div className='A'> {/*임시임 지워야함*/}
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/CommunityMain" element={<CommunityMain/>} />
        <Route path="/CommunityBoardWrite" element={<CommunityBoardWrite/>}/>
        <Route path='/CommunityBoardDetail' element={<CommunityBoardDetail/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
