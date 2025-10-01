import Link from 'next/link';
import Image from 'next/image';
import logo from '@/assets/logo.png'; // Make sure this path is correct

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-50">
      <div className="text-center">
        <Image 
          src={logo} 
          alt="Atlas Logo" 
          width={150} 
          height={150} 
          className="mx-auto mb-8"
        />
        <h1 className="text-4xl font-black text-secondary mb-4">
          Welcome to Atlas Q&A
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          The best place to ask questions and share knowledge.
        </p>
        <Link 
          href="/ui"
          className="px-6 py-3 bg-secondary text-white font-semibold rounded-lg shadow-md hover:bg-secondary/90 transition-colors"
        >
          Go to the App
        </Link>
      </div>
    </main>
  );
}