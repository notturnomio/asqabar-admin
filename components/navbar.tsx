import { MainNav } from '@/components/mainNav';
import StoreSwitcher from '@/components/storeSwitcher';
import prismadb from '@/lib/prismadb';
import { UserButton, auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { ThemeToggle } from './themeToggle';

const Navbar = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const stores = await prismadb.store.findMany({
    where: { userId },
  });

  return (
    <div className='border-b'>
      <div className='flex h-16 items-center px-4'>
        <StoreSwitcher items={stores} />
        <MainNav className='mx-6' />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeToggle />
          {/* <div className='border rounded-full hover:border-slate-500 transition-all'> */}
          <UserButton afterSignOutUrl='/' />
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
