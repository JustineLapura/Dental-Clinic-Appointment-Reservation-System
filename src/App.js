import './App.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Home from './pages/Home';
import LoginForm, { action as loginAction } from './pages/LoginForm';
import Layout from './components/Layout';
import AppointmentLayout from './components/AppointmentLayout';
import Appointment, { loader as appointmentsLoader } from './AppointmentPages/Appointment';
import AccountPage from './AppointmentPages/AccountPage';
import DentalRecords from './AppointmentPages/DentalRecords';
import Profile from './AppointmentPages/Profile';
import Services from './pages/Services';
import About from './pages/About';
import Payment from './pages/Payment';
import Registration, { action as registrationAction } from './pages/Registration';
import { authRequired } from './authRequired';
import AdminDashboard from './AdminPages/AdminDashboard';
import SampleLayout from "./components/AdminLayout"
import AdminSchedule from './AdminPages/AdminSchedule';
import AdminService from './AdminPages/AdminService';
import AdminUserAccounts from './AdminPages/AdminUserAccounts';
import AdminMembers from './AdminPages/AdminMembers';
import Note from './AdminPages/Note';
import AdminScheduleForToday from './AdminPages/AdminScheduleForToday';
import { ServiceProvider } from './ServicesContext';
import { AppointmentProvider } from './AppointmentContext';
localStorage.removeItem("isLoggedin");

const router = createBrowserRouter(createRoutesFromElements(
  <Route>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/appointments" element={<AppointmentLayout />}>
        <Route index element={<Appointment />} loader={appointmentsLoader} />
        <Route path='account' element={<AccountPage />} loader={async () => await authRequired()} />
        <Route path='profile' element={<Profile />} loader={async () => await authRequired()} />
        <Route path='records' element={<DentalRecords />} loader={async () => await authRequired()} />
      </Route>
      <Route path="/services" element={<Services />} />
      <Route path="/about" element={<About />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/login" element={<LoginForm />} action={loginAction} />
      <Route path="/registration" element={<Registration />} action={registrationAction} />
    </Route>
    <Route path="/admin" element={<SampleLayout />}>
      <Route index element={<AdminDashboard />}/>
      <Route path="schedule-today" element={<AdminScheduleForToday />}/>
      <Route path="schedule" element={<AdminSchedule />}/>
      <Route path="service" element={<AdminService />}/>
      <Route path="user-accounts" element={<AdminUserAccounts />}/>
      <Route path="members" element={<AdminMembers />}/>
      <Route path="note" element={<Note />}/>
    </Route>
  </Route>
))

function App() {
  return (
    <div className="App">
      <AppointmentProvider>
        <ServiceProvider>
          <RouterProvider router={router} />
        </ServiceProvider>
      </AppointmentProvider>
    </div>
  );
}

export default App;
