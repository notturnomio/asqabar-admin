import { UserButton } from '@clerk/nextjs';

const RootPage = () => {
  return (
    <div className='p-4'>
      <p>
        This is a protected page. You can only see this if you are logged in.
      </p>
      <UserButton afterSignOutUrl='/' />
    </div>
  );
};

export default RootPage;
