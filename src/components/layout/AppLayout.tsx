
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24 px-4 md:px-8 pb-10 mx-auto w-full max-w-7xl">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
