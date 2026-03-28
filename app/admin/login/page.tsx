import LoginForm from '@/components/admin/LoginForm';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Login | Tenders Alpha',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Image src="/logo.png" alt="Tenders Alpha" width={48} height={48} className="object-contain" />
          </div>
          <h1 className="text-white text-2xl font-bold font-heading">Tenders Alpha Admin Panel</h1>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
