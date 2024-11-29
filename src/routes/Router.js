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
import OnestopMain from 'components/oneStop/OnestopMain';
import OnestopDetail from 'components/oneStop/oneStopDetail/OneStopDetail';
import OnestopWrite from 'components/oneStop/oneStopWrite/OneStopWrite';
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
import ReviewWrite from 'components/interior/review/ReviewWrite';
import Register from 'components/interior/interiorRegister/Register';
import ModifyPwd from 'components/mypage/info/ModifyPwd';
import MypageInteriorLayout from 'components/layout/mypage/interior/MypageInteriorLayout';
import MypageInteriorMain from 'components/mypage/interior/MypageInteriorMain';
import MypageInteriorRequest from 'components/mypage/interior/interior/request/MypageInteriorRequest';
import MypageInteriorCase from 'components/mypage/interior/interior/case/MypageInteriorCase';
import MypageInteriorInquiry from 'components/mypage/interior/interior/interiorInquiry/MypageInteriorInquiry';
import MypageInteriorReview from 'components/mypage/interior/interior/review/MypageInteriorReview';
import MypageInteriorOnestop from 'components/mypage/interior/onestop/OnestopReply';
import MypageInteriorModify from 'components/mypage/interior/modify/MypageInteriorModify';
import ReqInteriorMain from 'components/reqinterior/ReqInteriorMain';
import ReqInteriorWrite from 'components/reqinterior/reqInteriorWrite/ReqInteriorWrite';
import ReqInteriorDetail from 'components/reqinterior/reqInteriordetail/ReqInteriorDetail';
import SendAlarm from 'components/layout/notification/SendAlarm';
import OneStopWrite from 'components/oneStop/oneStopWrite/OneStopWrite';
import MypagePersonRequestInterior from 'components/mypage/person/interior/MypagePersonRequestInterior';

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
      <Route path="/interiorMain" element={<InteriorMain />} />
      <Route path="/interiorList" element={<CompanyList />} />
      <Route path="/companyRegister" element={<Register />} />
      <Route path="/sampleList" element={<SampleList />} />
      <Route path="/interiorRegister" element={<InteriorRegister />} />
      <Route path="/sampleDetail" element={<SampleDetail />} />
      <Route path="/sampleRegister" element={<SampleRegister />} />
      <Route path="/interiorAnswer/:num" element={<InteriorAnswer />} />
      <Route path="/reviewWrite" element={<ReviewWrite />} />
      {/* Onestop */}
      <Route path="/onestop" element={<OnestopMain />} />
      <Route path="/onestop/write" element={<OneStopWrite />} />
      <Route path="/onestop/detail/:num" element={<OnestopDetail />} />

      {/* Communnity */}
      <Route path="/community" element={<CommunityMain />} />
      <Route path="/communityBoardWrite" element={<CommunityBoardWrite />} />
      <Route
        path="/communityBoardDetail/:CommunityNum"
        element={<CommunityBoardDetail />}
      />
      {/* MypagePerson */}
      <Route path="/mypage/person/*" element={<MypageLayout />}>
        <Route index element={<MypagePersonMain />} />
        <Route path="interior" element={<MypagePersonInterior />} />
        <Route
          path="interior/request"
          element={<MypagePersonRequestInterior />}
        />
        <Route path="interior/review" element={<MypagePersonReview />} />
        <Route path="onestop" element={<MypagePersonOnestop />} />
        <Route path="bookmark" element={<BookmarkHouse />} />
        <Route path="bookmark/interior" element={<BookmarkInterior />} />
        <Route path="bookmark/community" element={<BookmarkCommunity />} />
        <Route path="community" element={<MypagePersonCommunity />} />
        <Route path="info" element={<PersonInfo />} />
        <Route path="info/password" element={<ModifyPwd />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      {/* MypageEstate */}
      <Route path="/mypage/estate/*" element={<MypageEstateLayout />}>
        <Route index element={<MypageEstate />} />
        <Route path="house" element={<MypageEstateHouseAnswer />} />
        <Route path="onestop" element={<MypageEstateOnestopAnswer />} />
        <Route path="info" element={<CompanyInfo />} />
        <Route path="info/password" element={<ModifyPwd />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      {/* MypageInterior */}
      <Route path="/mypage/interior/*" element={<MypageInteriorLayout />}>
        <Route index element={<MypageInteriorMain />} />
        <Route path="manage/reqinterior" element={<MypageInteriorRequest />} />
        <Route path="manage/case" element={<MypageInteriorCase />} />
        <Route path="manage/inquiry" element={<MypageInteriorInquiry />} />
        <Route path="manage/review" element={<MypageInteriorReview />} />
        <Route path="onestop" element={<MypageInteriorOnestop />} />
        <Route path="userInfo" element={<CompanyInfo />} />
        <Route path="userInfo/password" element={<ModifyPwd />} />
        <Route path="info" element={<CompanyInfo />} />
        <Route path="info/password" element={<SearchPwdResult />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/mypageInterior/modify" element={<MypageInteriorModify />} />
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
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/profile/estate" element={<ProfileEstate />} />
      {/* RequestInterior */}
      <Route path="/requestInterior" element={<ReqInteriorMain />} />
      <Route path="/requestInterior/write" element={<ReqInteriorWrite />} />
      <Route path="/interiorall/detail/:num" element={<ReqInteriorDetail />} />
      {/* NotFound */}
      <Route path="*" element={<NotFound />} />
      {/* test 나중에 지워야함*/}
      <Route path="/sendAlarm" element={<SendAlarm />} />
    </Routes>
  );
};

export default Router;
