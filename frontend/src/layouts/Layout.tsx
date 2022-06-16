import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';

type LayoutProps = {};

const Layout: React.FC<LayoutProps> = () => {
  return (
    <React.Fragment>
      <Header />
      <Outlet />
    </React.Fragment>
  );
};

export default Layout;
