import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

const startApp = async () => {
  const { worker } = await import('./mocks/browser');

  const startWorker = async () => {
    try {
      await worker.start({
        serviceWorker: { url: '/mockServiceWorker.js' },
        onUnhandledRequest: 'warn',
      });
      // worker started
      console.log(
        '[MSW] worker started, controller:',
        navigator.serviceWorker.controller
      );
    } catch (err) {
      console.error('[MSW] failed to start worker', err);
    }
  };

  await startWorker();

  // 서비스 워커가 유휴 상태일 때 브라우저가 서비스 워커를 종료하면 문서가 컨트롤러가 없는 상태가 될 수 있습니다.
  // 사용자가 탭에 포커스를 맞추거나 돌아올 때 워커를 다시 시작하여 요청이 다시 모킹되도록 합니다.

  const ensureWorker = async () => {
    if (navigator.serviceWorker.controller) return;

    console.warn(
      '[MSW] no service worker controller found — attempting recovery'
    );

    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

    const maxAttempts = 3;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        console.log(
          `[MSW] recovery attempt ${attempt} - registering service worker`
        );

        // 서비스 워커가 등록되어 있지 않으면 직접 등록 시도
        if ('serviceWorker' in navigator) {
          try {
            await navigator.serviceWorker.register('/mockServiceWorker.js');
            console.log('[MSW] navigator.serviceWorker.register() resolved');
          } catch (regErr) {
            console.warn(
              '[MSW] navigator.serviceWorker.register() failed',
              regErr
            );
          }

          // 해당 scope에 대한 서비스 워커가 활성화될 때까지 대기
          try {
            await navigator.serviceWorker.ready;
            console.log(
              '[MSW] navigator.serviceWorker.ready resolved, controller:',
              navigator.serviceWorker.controller
            );
          } catch (readyErr) {
            console.warn(
              '[MSW] navigator.serviceWorker.ready failed',
              readyErr
            );
          }
        }

        // MSW 워커 재시작
        await startWorker();

        // 컨트롤러가 존재하는지 확인
        if (navigator.serviceWorker.controller) {
          console.log('[MSW] recovery succeeded, controller present');
          return;
        }
      } catch (err) {
        console.error('[MSW] recovery attempt failed', err);
      }

      // 재시도 전 대기
      const delay = 500 * attempt;
      console.log(`[MSW] waiting ${delay}ms before next attempt`);
      await sleep(delay);
    }

    console.error(
      '[MSW] recovery attempts exhausted — MSW may not intercept requests until reload'
    );
  };

  window.addEventListener('focus', ensureWorker);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') ensureWorker();
  });

  // Optional: log controller changes for debugging
  navigator.serviceWorker.addEventListener?.('controllerchange', () => {
    console.log(
      '[MSW] service worker controller changed',
      navigator.serviceWorker.controller
    );
  });
};

startApp();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
