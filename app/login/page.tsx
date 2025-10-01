import LoginForm from '@/app/login/LoginForm';
import Image from 'next/image';
import logo from '@/assets/logo.png';

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-secondary p-3 md:h-36">
          <div className="w-full text-white">
            <Image src={logo} alt="Atlas Logo" className="h-12 md:h-24 object-contain mx-auto" />
          </div>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}