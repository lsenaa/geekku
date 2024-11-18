import { Route, Routes } from 'react-router';
import Main from 'components/main/Main';
import EstateSearch from 'components/estate/estateSearch/EstateSearch';
import InteriorMain from 'components/interior/interiorMain/Main';
import CommunityMain from 'components/community/communityMain/CommunityMain';
import CommunityBoardWrite from 'components/community/communityWrite/CommunityBoardWrite';
import CommunityBoardDetail from 'components/community/communityBoardDetail/CommunityBoardDetail';
import CompanyList from 'components/interior/companyList/Main';
import ProfilePerson from 'components/profile/person/ProfilePerson';
import EstateWrite from 'components/estate/estateWrite/EstateWrite';
import HouseMain from 'components/house/HouseMain';
import HouseWrite from 'components/house/houseWrite/HouseWrite';
import HouseDetail from 'components/house/houseDetail/HouseDetail';
import OnestopWrite from 'components/oneStop/oneStopWrite/OneStopWrite';
import OnestopDetail from 'components/oneStop/oneStopDetail/OneStopDetail';
import MypageInteriorMain from 'components/mypage/interior/mypageInteriorMain/MypageInteriorMain';
import MypageInteriorModify from 'components/mypage/interior/mypageInteriorModify/MypageInteriorModify';
import MypagePersonMain from 'components/mypage/person/MypagePersonMain';
import MypagePersonInterior from 'components/mypage/person/interior/MypagePersonInterior';
import MypageLayout from 'components/layout/mypage/person/MypageLayout';
import MypagePersonReview from 'components/mypage/person/interior/MypagePersonReview';
import MypagePersonOnestop from 'components/mypage/person/onestop/MypagePersonOnestop';
import BookmarkHouse from 'components/mypage/person/bookmark/house/BookmarkHouse';
import BookmarkInterior from 'components/mypage/person/bookmark/interior/BookmarkInterior';
import BookmarkCommunity from 'components/mypage/person/bookmark/community/BookmarkCommunity';
import MypagePersonCommunity from 'components/mypage/person/community/MypagePersonCommunity';
import PersonInfo from 'components/mypage/info/PersonInfo';
import CompanyInfo from 'components/mypage/info/CompanyInfo';
import Login from 'components/login/Login';
import SearchId from 'components/login/SearchId';
import JoinPerson from 'components/join/JoinPerson';
import JoinCompany from 'components/join/JoinCompany';
import JoinInterior from 'components/join/JoinInterior';
import SearchPwd from 'components/login/SearchPwd';
import SearchPwdResult from 'components/login/SearchPwdResult';
import SampleList from 'components/interior/sampleList/SampleList';
import InteriorRegister from 'components/interior/interiorList/InteriorRegister';
import SampleDetail from 'components/interior/sampleDetail/SampleDetail';
import SampleRegister from 'components/interior/sampleRegister/SampleRegister';
import InteriorAnswer from 'components/interior/interiorAnswer/InteriorAnswer';
import MypageEstate from 'components/mypage/estate/main/MypageEstate';
import ProfileInterior from 'components/profile/interior/ProfileInterior';
import ProfileInteriorAll from 'components/profile/interior/all/ProfileInteriorAll';
import ProfileInteriorIntroduce from 'components/profile/interior/introduce/ProfileInteriorIntroduce';
import ProfileInteriorSample from 'components/profile/interior/sample/ProfileInteriorSample';
import ProfileInteriorReview from 'components/profile/interior/review/ProfileInteriorReview';
import ProfileEstate from 'components/profile/estate/ProfileEstate';
import MypageEstateLayout from 'components/layout/mypage/estate/MypageEstateLayout';
import MypageEstateHouseAnswer from 'components/mypage/estate/house/MypageEstateHouseAnswer';
import MypageEstateOnestopAnswer from 'components/mypage/estate/onestop/MypageEstateOnestopAnswer';
import NotFound from 'components/notfound/NotFound';
import Register from 'components/interior/companyRegister/Register';

const Router = () => {
  return (
    <Routes>
      {/* Estate */}
      <Route path="/" element={<Main />} />
      <Route path="/estate" element={<EstateSearch />} />
      <Route path="/estate/write" element={<EstateWrite />} />
      {/* House */}
      <Route path="/house" element={<HouseMain />} />
      <Route path="/house/write" element={<HouseWrite />} />
      <Route path="/house/detail/:num" element={<HouseDetail />} />
      {/* Interior */}
      <Route path="/interior" element={<InteriorMain />} />
      <Route path="/companyList" element={<CompanyList />} />
      <Route path="/companyRegister" element={<Register />} />
      <Route path="/sampleList" element={<SampleList />} />
      <Route path="/interiorRegister" element={<InteriorRegister />} />
      <Route path="/sampleDetail" element={<SampleDetail />} />
      <Route path="/sampleRegister" element={<SampleRegister />} />
      <Route path="/interiorAnswer" element={<InteriorAnswer />} />
      {/* Onestop */}
      <Route path="/oneStopWrite" element={<OnestopWrite />} />
      <Route path="/oneStopDetail" element={<OnestopDetail />} />

      {/* Communnity */}
      <Route path="/community" element={<CommunityMain />} />
      <Route path="/communityBoardWrite" element={<CommunityBoardWrite />} />
      <Route path="/communityBoardDetail" element={<CommunityBoardDetail />} />
      {/* MyPage */}
      <Route path="/mypage/person/*" element={<MypageLayout />}>
        <Route index element={<MypagePersonMain />} />
        <Route path="interior" element={<MypagePersonInterior />} />
        <Route path="interior/review" element={<MypagePersonReview />} />
        <Route path="onestop" element={<MypagePersonOnestop />} />
        <Route path="bookmark" element={<BookmarkHouse />} />
        <Route path="bookmark/interior" element={<BookmarkInterior />} />
        <Route path="bookmark/community" element={<BookmarkCommunity />} />
        <Route path="community" element={<MypagePersonCommunity />} />
        <Route path="info" element={<PersonInfo />} />
        {/* 비밀번호 변경 추가하기 */}
        {/* <Route path="info/password" element={} /> */}
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/mypage/estate/*" element={<MypageEstateLayout />}>
        <Route index element={<MypageEstate />} />
        <Route path="house" element={<MypageEstateHouseAnswer />} />
        <Route path="onestop" element={<MypageEstateOnestopAnswer />} />
        <Route path="info" element={<CompanyInfo />} />
        {/* 비밀번호 변경 추가하기 */}
        {/* <Route path="info/password" element={} /> */}
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/mypageInterior" element={<MypageInteriorMain />} />
      <Route path="/mypageInteriorModify" element={<MypageInteriorModify />} />
      <Route path="/personInfo" element={<PersonInfo />} />
      <Route path="/companyInfo" element={<CompanyInfo />} />

      {/* Login */}
      <Route path="/login" element={<Login />} />
      <Route path="/searchId" element={<SearchId />} />
      <Route path="/searchPwd" element={<SearchPwd />} />
      <Route path="/searchPwdResult" element={<SearchPwdResult />} />
      {/* Join */}
      <Route path="/joinPerson" element={<JoinPerson />} />
      <Route path="/joinCompany" element={<JoinCompany />} />
      <Route path="/joinInterior" element={<JoinInterior />} />
      {/* Profile */}
      <Route path="/profile/person" element={<ProfilePerson />} />
      <Route path="/profile/interior/*" element={<ProfileInterior />}>
        <Route index element={<ProfileInteriorAll />} />
        <Route path="sample" element={<ProfileInteriorSample />} />
        <Route path="review" element={<ProfileInteriorReview />} />
        <Route path="introduce" element={<ProfileInteriorIntroduce />} />
      </Route>
      <Route path="/profile/estate" element={<ProfileEstate />} />
      {/* NotFound */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
