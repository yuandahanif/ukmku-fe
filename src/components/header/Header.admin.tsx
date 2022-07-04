import ProfilePopup from '@/components/popup/Profile';

const HeaderAdmin = () => {
  return (
    <header className='w-full border-b bg-white'>
      <nav className='flex items-center justify-end pr-3 pt-3'>
        <ProfilePopup />
      </nav>
    </header>
  );
};

export default HeaderAdmin;
