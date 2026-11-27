import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'

const Home = lazy(() => import('./pages/Home'))
const LearnBangla = lazy(() => import('./pages/LearnBangla'))
const AvroPage = lazy(() => import('./pages/AvroPage'))
const BijoyPage = lazy(() => import('./pages/BijoyPage'))
const BijoyBayannoPage = lazy(() => import('./pages/BijoyBayannoPage'))
const EnglishPage = lazy(() => import('./pages/EnglishPage'))
const InteractiveKeyboardPage = lazy(() => import('./pages/InteractiveKeyboardPage'))
const PracticePage = lazy(() => import('./pages/PracticePage'))
const TypingTestPage = lazy(() => import('./pages/TypingTestPage'))
const DashboardPage = lazy(() => import('./pages/DashboardPage'))
const HistoryPage = lazy(() => import('./pages/HistoryPage'))
const FAQPage = lazy(() => import('./pages/FAQPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ReferencesPage = lazy(() => import('./pages/ReferencesPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const NotFound = lazy(() => import('./pages/NotFound'))
const LoginPage = lazy(() => import('./pages/LoginPage'))
const RegisterPage = lazy(() => import('./pages/RegisterPage'))
const ForgotPasswordPage = lazy(() => import('./pages/ForgotPasswordPage'))
const UpdatePasswordPage = lazy(() => import('./pages/UpdatePasswordPage'))
const AuthCallbackPage = lazy(() => import('./pages/AuthCallbackPage'))
const AccountPage = lazy(() => import('./pages/AccountPage'))

function Loader() {
  return (
    <div className="container-page py-24 text-center text-sm text-slate-400">
      <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-brand-500 align-middle" />
    </div>
  )
}

export default function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/learn-bangla" element={<LearnBangla />} />
          <Route path="/avro" element={<AvroPage />} />
          <Route path="/bijoy" element={<BijoyPage />} />
          <Route path="/bijoy-bayanno" element={<BijoyBayannoPage />} />
          <Route path="/english" element={<EnglishPage />} />
          <Route path="/keyboard" element={<InteractiveKeyboardPage />} />
          <Route path="/practice" element={<PracticePage />} />
          <Route path="/test" element={<TypingTestPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/references" element={<ReferencesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/update-password" element={<UpdatePasswordPage />} />
          <Route path="/auth/callback" element={<AuthCallbackPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
