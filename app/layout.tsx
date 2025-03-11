import { ReactNode } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import '@/assets/styles/globals.css';
import AuthProvider from './components/AuthProvider';
import { ToastContainer } from 'react-toastify';
import { GlobalProvider } from '@/context/GlobalContext';
import 'photoswipe/dist/photoswipe.css';

export const metadata = {
  title: 'Property pulse',
  keywords: 'real estate, property, real estate',
  description: 'Real estate and property management',
};

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <GlobalProvider>
        <html>
          <body>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <ToastContainer />
          </body>
        </html>
      </GlobalProvider>
    </AuthProvider>
  );
};

export default MainLayout;
