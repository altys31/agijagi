import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Authentication from './components/Authentication';
import { BottomNavigation } from './components/common/BottomNavigation/BottomNavigation';
import Layout from './components/common/Layout';
import { ModalProvider } from './hooks/useModal';
import { BabyInfoForm } from './pages/Baby/BabyInfoForm/BabyInfoForm';
import BabyMain from './pages/Baby/BabyMain';
import BabyProfile from './pages/BabyProfile';
import BoardPage from './pages/BoardPage';
import WriteArticlePage from './pages/BoardPage/WritePage';
import Login from './pages/Login';
import { Main } from './pages/Main';
import MileStone from './pages/MileStoneCheckPage';
import MileStoneReport from './pages/MileStoneReportPage';
import RecordPage from './pages/RecordPage';
import Report from './pages/ReportPage';
import SchedulePage from './pages/SchedulePage';
import Signup from './pages/Signup';
import { Welcome } from './pages/Signup/Welcome';
import BookComponent from './pages/Book';
import WritingDiary from './pages/WritingDiary';

import BookCreate from './components/book/BookCreate';
import BookDetail from './pages/BookDetialPage';
import GlobalStyle from './styles/GlobalStyle';

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
      },
    },
  });

  return (
    <>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ModalProvider>
            <Router />
          </ModalProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

const Router = () => {
  const location = useLocation();
  const showBottomNavigation = [
    '/family',
    '/record',
    '/family/profile',
    '/schedule',
    '/milestone',
    '/milestone-report',
    '/report',
    '/book',
    '/book-create',
  ].includes(location.pathname);

  return (
    <Layout>
      <Layout.Inner>
        <Routes>
          {/* 로그인 하지 않은 사용자만 접근 가능한 라우터 (로그인 한 사용자가 접근 시 /main 으로 라우팅) */}
          {/* 이 곳에 존재하는 Route는 constants/guestOnlyRoutes.ts 에 추가해야 됨... 401 때문에... */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* 로그인 한 사용자만 접근 가능한 라우터 (비로그인 사용자가 접근하면 /login 으로 라우팅) */}
          {/* msw 사용으로 주석처리*/}
          <Route element={<Authentication authority="MEMBER_ONLY" />}>
            <Route path="/" element={<Main />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/main" element={<Main />} />
            <Route path="/board" element={<BoardPage />} />
            <Route path="/board/write" element={<WriteArticlePage />} />
            <Route path="/familyform" element={<BabyInfoForm />} />
          </Route>

          {/* 아이를 선택하고 로그인 한 사용자만 접근 가능한 라우터 (아이 선택 안 하면 /main 으로 라우팅) */}
          <Route
            element={<Authentication authority="CHILD_SELECTED_MEMBER_ONLY" />}
          >
            <Route path="/schedule" element={<SchedulePage />} />
            <Route path="/milestone" element={<MileStone />} />
            <Route path="/milestone-report" element={<MileStoneReport />} />
            <Route path="/family" element={<BabyMain />} />
            <Route path="/family/profile" element={<BabyProfile />} />
            <Route path="/family/writing" element={<WritingDiary />} />
            <Route path="/report" element={<Report />} />
            <Route path="/record" element={<RecordPage />} />
            <Route path="/book" element={<BookComponent />} />
            <Route path="/book/:id" element={<BookDetail />} />
            <Route path="/book-create" element={<BookCreate />} />
          </Route>
        </Routes>
      </Layout.Inner>
      {showBottomNavigation && <BottomNavigation />}
    </Layout>
  );
};

export default App;
