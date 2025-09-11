import { Outlet } from 'react-router-dom';
import { Header, Footer } from '@/widgets';

export const AppLayout = () => (
  <div className='app'>
    <Header />
    <main className='main-content'>
      <Outlet />
    </main>
    <Footer />
  </div>
);
