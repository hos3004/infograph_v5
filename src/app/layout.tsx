import './globals.css';
import type { Metadata } from 'next';
import { Video, Mic } from 'lucide-react';

export const metadata: Metadata = {
  title: 'فيديوجراف ',
  description: 'Internal Tool for generating infographic videos quickly',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <div className="container">
          <header className="header">
            <h1 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Video className="text-accent" size={32} />
              فيديوجراف
            </h1>
            <nav style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginTop: '0.75rem' }}>
              <a
                href="/"
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.4rem',
                  color: 'var(--text-secondary)', textDecoration: 'none',
                  fontSize: '0.9rem', padding: '0.35rem 0.85rem',
                  borderRadius: '8px', border: '1px solid var(--border-color)',
                  transition: 'all 0.15s',
                }}
              >
                <Video size={15} />
                إنفوجراف
              </a>
              <a
                href="/voiceover"
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.4rem',
                  color: 'var(--text-secondary)', textDecoration: 'none',
                  fontSize: '0.9rem', padding: '0.35rem 0.85rem',
                  borderRadius: '8px', border: '1px solid var(--border-color)',
                  transition: 'all 0.15s',
                }}
              >
                <Mic size={15} />
                فويس أوفر
              </a>
            </nav>
          </header>
          {children}
          <footer style={{
            textAlign: 'center',
            marginTop: '2rem',
            paddingTop: '1.5rem',
            paddingBottom: '.3rem',
            borderTop: '1px solid var(--border-color)',
            color: 'var(--text-secondary)',
            fontSize: '0.9rem'
          }}>
            جميع الحقوق محفوظه © حسام المغربي
          </footer>
        </div>
      </body>
    </html>
  );
}
