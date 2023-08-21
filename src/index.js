import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import ErrorPage from './pages/ErrorPage';
import Main from './pages/Main';
import News from './pages/Home/News';
import Introduces from './pages/Home/Introduces';
import Files from './pages/Home/files';
import Contact from './pages/Home/contact';
import SearchInfo from './pages/Home/SearchInfo';
import FormLogin from './pages/Login/FormLogin';
import ForGetPassword from './pages/Login/ForGetPassword';
import UserSystem from './pages/Control/UserSystem/UserSystem';
import PhanLoaiHoc from './pages/Control/PhanLoai/PhanLoaiHoc';
import Loai from './pages/Control/Loai/Loai';
import BaiViet from './pages/Control/BaiViet/BaiViet';
import DuaLoaiVao from './pages/Control/DuaLoaiVao/DuaLoaiVao';
import DuaLoaiRa from './pages/Control/DuaLoaiRa/DuaLoaiRa';
import PhieuThongTin from './pages/Control/PhieuThongTin/PhieuThongTin';
import DanhMucTinh from './pages/Control/DanhMucTinh/DanhMucTinh';
import DanhMucDong from './pages/Control/DanhMucDong/DanhMucDong';
import store from './stores';
import { Provider } from "react-redux";
import WrapperRouteComponent from './pages/config';
import Map from './pages/Control/MapBox/Map';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: "/tintuc",
        element: <News />,
      },
      {
        path: "/hoso/gioithieu",
        element: <Introduces />,
      },
      {
        path: "/hoso/tailieu",
        element: <Files />,
      },
      {
        path: "/hoso/lienhe",
        element: <Contact />,
      },
      {
        path: "/search",
        element: <SearchInfo />,
      },
      {
        path: "/quen-mat-khau",
        element: <ForGetPassword />,
      },
      {
        path: "/",
        element: <WrapperRouteComponent element={<Outlet />} guest />,
        children: [
          {
            path: "dang-nhap",
            element: <FormLogin />,
          },
        ],
      },
      {
        path: "",
        element: <WrapperRouteComponent element={<Outlet />} auth />,
        children: [
          {
            path: "bang-dieu-khien",
            element: <Map />,
          },
          {
            path: "he-thong/nguoi-dung",
            element: <UserSystem />,
          },
          {
            path: "phan-loai-hoc",
            element: <PhanLoaiHoc />,
          },
          {
            path: "loai",
            element: <Loai />,
          },
          {
            path: "bai-viet",
            element: <BaiViet />,
          },
          {
            path: "phieu-de-xuat",
            element: <DuaLoaiVao />,
            children: [
              {
                path: "dua-loai-vao",
                element: <DuaLoaiVao />,
              },
              {
                path: "dua-loai-ra",
                element: <DuaLoaiRa />,
              },
              {
                path: "phieu-cung-cap-thong-tin",
                element: <PhieuThongTin />,
              },
            ],
          },
          {
            path: "danh-muc",
            element: <DanhMucTinh />,
            children: [
              {
                path: "danh-muc-tinh",
                element: <DanhMucTinh />,
              },
              {
                path: "danh-muc-dong",
                element: <DanhMucDong />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);