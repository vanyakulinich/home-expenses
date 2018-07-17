// @material-ui/icons
import {Dashboard, Person, ContentPaste,
        LibraryBooks, LocationOn, BubbleChart, Notifications, Unarchive} from "@material-ui/icons";
// core components/views
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import TableList from "views/TableList/TableList.jsx";
import Typography from "views/Typography/Typography.jsx";
import Icons from "views/Icons/Icons.jsx";
import Maps from "views/Maps/Maps.jsx";
import NotificationsPage from "views/Notifications/Notifications.jsx";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.jsx";
import SignIn from 'views/SignIn/SignIn.jsx';
import SignUp from 'views/SignUp/SignUp.jsx';
import VerifyEmail from 'views/VerifyEmail/VerifyEmail.jsx';
import Config from 'views/Config/Config.jsx';
import Reports from 'views/Reports/Reports.jsx';


const dashboardRoutes = [
  {
    path: "/dashboard",
    sidebarName: "Dashboard",
    navbarName: "Material Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    signedUser: true
  },
  {
    path: "/reports",
    sidebarName: "Reports",
    navbarName: "Reports",
    icon: Dashboard,
    component: Reports
  },
  {
    path: "/config",
    sidebarName: "Config",
    navbarName: "Config",
    icon: Dashboard,
    component: Config
  },
  // {
  //   path: "/user",
  //   sidebarName: "User Profile",
  //   navbarName: "Profile",
  //   icon: Person,
  //   component: UserProfile
  // },
  // {
  //   path: "/table",
  //   sidebarName: "Table List",
  //   navbarName: "Table List",
  //   icon: ContentPaste,
  //   component: TableList
  // },
  // {
  //   path: "/typography",
  //   sidebarName: "Typography",
  //   navbarName: "Typography",
  //   icon: LibraryBooks,
  //   component: Typography
  // },
  // {
  //   path: "/icons",
  //   sidebarName: "Icons",
  //   navbarName: "Icons",
  //   icon: BubbleChart,
  //   component: Icons
  // },
  // {
  //   path: "/maps",
  //   sidebarName: "Maps",
  //   navbarName: "Map",
  //   icon: LocationOn,
  //   component: Maps
  // },
  // {
  //   path: "/notifications",
  //   sidebarName: "Notifications",
  //   navbarName: "Notifications",
  //   icon: Notifications,
  //   component: NotificationsPage
  // },
  {
    path: "/signin",
    sidebarName: "Sign In",
    navbarName: "SignIn",
    icon: Person,
    component: SignIn
  },
  {
    path: "/signup",
    sidebarName: "Sign Up",
    navbarName: "SignUp",
    icon: Person,
    component: SignUp
  },
  { 
    hidden: true,
    path: "/verify",
    sidebarName: "Verify Email",
    navbarName: "Verify Email",
    icon: Person,
    component: VerifyEmail
  },
  { redirect: true, 
    path: "/", 
    to: localStorage.getItem('token') ? "/dashboard" : '/signin', 
    navbarName: "Redirect" }
];

export default dashboardRoutes;
