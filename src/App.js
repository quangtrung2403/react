import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './parts/Header/header';
import Footer from './parts/Footer/Footer';
import { Outlet, useLocation } from 'react-router-dom';
import SideBar from './parts/SideBar/SideBar';
import { AppProvider } from './Context/AppContext';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { getInitData } from './stores/auth';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const location = useLocation();
  const [showSidebar, setShowSidebar] = useState(true);
  const dispatch = useDispatch();
  const allowedPaths = [
    '/bang-dieu-khien',
    '/he-thong/nguoi-dung',
    '/phan-loai-hoc',
    '/loai',
    '/bai-viet',
    '/phieu-de-xuat',
    '/phieu-de-xuat/dua-loai-vao/',
    '/phieu-de-xuat/dua-loai-ra/',
    '/phieu-de-xuat/phieu-cung-cap-thong-tin/',
    '/danh-muc/danh-muc-tinh/',
    '/danh-muc/danh-muc-dong/',
  ];

  const shouldRenderSidebar = () => {
    return allowedPaths.includes(location.pathname);
  };

  const shouldRenderFooter = () => {
    const forbiddenPaths = ['/dang-nhap', '/quen-mat-khau', ...allowedPaths];
    return !forbiddenPaths.includes(location.pathname);
  };

  const handelShowSideBar = () => {
    setShowSidebar(!showSidebar);
  }
  const sidebarWidth = showSidebar ? "75px" : "360px";
  const contentPaddingLeft = showSidebar ? "85px" : "360px";
  const sidebarNameWidth = showSidebar ? "55px" : "320px";

  useEffect(() => {
    dispatch(getInitData());
  }, [dispatch]);


  return (
      <AppProvider>
        <div className="App">
          <Header />
          {shouldRenderSidebar() ? (
            <div className="list-task">
              <i className="fa-solid fa-bars" onClick={handelShowSideBar}></i>
              <div className="list-task__name"
                style={{ width: sidebarNameWidth }}>
                <SideBar />
                {sidebarNameWidth === "55px" ? (
                  <React.Fragment>
                    <i className='fa-solid fa-caret-down dropdown-item__icon d-none'></i>
                    <i className='fa-solid fa-caret-down dropdown-item__icon d-none'></i>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <i className='fa-solid fa-caret-down dropdown-item__icon first-icon'></i>
                    <i className='fa-solid fa-caret-down dropdown-item__icon second-icon'></i>
                  </React.Fragment>
                )}
              </div>
              <div className={classNames("list-task__content", { "list-task__content--with-sidebar": sidebarWidth })}
                style={{ paddingLeft: contentPaddingLeft }}>
                <Outlet />
              </div>
            </div>
          ) : (
            <Outlet />
          )}
          {shouldRenderFooter() && <Footer />}
        </div>
      </AppProvider>
  );
}

export default App;
