import { Suspense } from 'react';

import AppBar from '../../components/common/AppBar';
import ErrorBoundaryFallback from '../../components/common/ErrorBoundaryFallback';
import SuspenseFallback from '../../components/common/SuspenseFallback';
import RecordList from '../../components/Record/RecordList';

import * as s from './style';

import RecordMenu from './RecordMenu';

import { ErrorBoundary } from 'react-error-boundary';

import RecentRecordList from './RecentRecordList';

const RecordPage = () => {
  return (
    <s.Container>
      <AppBar>
        <AppBar.Title>기록</AppBar.Title>
      </AppBar>
      <s.Main>
        <s.RecordMenu>
          <ErrorBoundary
            fallbackRender={(props) => (
              <ErrorBoundaryFallback height="13rem" {...props}>
                기록 메뉴를 불러오지 못했어요.
              </ErrorBoundaryFallback>
            )}
          >
            <Suspense fallback={<SuspenseFallback height="13rem" />}>
              <RecordMenu />
            </Suspense>
          </ErrorBoundary>
        </s.RecordMenu>
        <s.RecordList>
          <RecordList>
            <ErrorBoundary
              fallbackRender={(props) => (
                <ErrorBoundaryFallback height="13rem" {...props}>
                  최근 기록을 불러오지 못했어요.
                </ErrorBoundaryFallback>
              )}
            >
              <Suspense>
                <RecentRecordList />
              </Suspense>
            </ErrorBoundary>
          </RecordList>
        </s.RecordList>
      </s.Main>
    </s.Container>
  );
};

export default RecordPage;
