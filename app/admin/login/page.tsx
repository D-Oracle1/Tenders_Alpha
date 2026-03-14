import LoginForm from '@/components/admin/LoginForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Login | Tenders General Merchant',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-primary font-bold text-2xl font-heading">TG</span>
          </div>
          <h1 className="text-white text-2xl font-bold font-heading">CMS Admin Panel</h1>
          <p className="text-white/60 text-sm mt-1">Tenders General Merchant Ltd.</p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
