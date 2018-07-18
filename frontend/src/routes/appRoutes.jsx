import React from 'react';
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



const appRoutes = [
  {
    path: "/dashboard",
    sidebarName: "Dashboard",
    navbarName: "Material Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    token: true,
  },
  {
    path: "/reports",
    sidebarName: "Reports",
    navbarName: "Reports",
    icon: Dashboard,
    component: Reports,
    token: true,
  },
  {
    path: "/config",
    sidebarName: "Config",
    navbarName: "Config",
    icon: Dashboard,
    component: Config,
    token: true
  },
  {
    path: "/signin",
    sidebarName: "Sign In",
    navbarName: "SignIn",
    icon: Person,
    component: SignIn,
    token: false
  },
  {
    path: "/signup",
    sidebarName: "Sign Up",
    navbarName: "SignUp",
    icon: Person,
    component: SignUp,
    token: false
  },
  { 
    hidden: true,
    path: "/verify",
    sidebarName: "Verify Email",
    navbarName: "Verify Email",
    icon: Person,
    component: VerifyEmail,
    token: false
  },
  { 
    path: "/", 
    navbarName: "Redirect"
  }
];

export default appRoutes;
