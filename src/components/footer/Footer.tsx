import Logo from '~/images/logo.svg';

const Footer = () => {
  return (
    <footer className='mt-auto w-full space-x-6 bg-white py-6 px-10'>
      <div className='flex'>
        <div className=''>
          <Logo className='h-12 w-20' />

          <p className='text-sm text-slate-600'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius eos
            autem excepturi vero. Mollitia ipsum magni itaque ullam repudiandae
            fuga illum quam cum repellat, aperiam ex praesentium! Nostrum,
            eveniet saepe.
          </p>
        </div>
        <div>
          <span>Perusahaan</span>
          <p className='text-sm text-slate-600'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius eos
            autem excepturi vero. Mollitia ipsum magni itaque ullam repudiandae
            fuga illum quam cum repellat, aperiam ex praesentium! Nostrum,
            eveniet saepe.
          </p>
        </div>
      </div>

      <span className='mt-10 inline-block w-full text-center text-sm'>
        &copy; 2022 @me. All Right Reserved
      </span>
    </footer>
  );
};

export default Footer;
