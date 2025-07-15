import Home from '../pages/Home';
import Following from '../pages/Following';
import Profile from '../pages/Profile';
import Upload from '../pages/Upload';
import Explore from '../pages/Explore';
import Live from '../pages/Live';
import Start from '../pages/Start';

import DefaultLayout from '../layouts/DefaultLayout';
import Sidebar from '../layouts/DefaultLayout/Sidebar';
import HeaderOnly from '../layouts/HeaderOnly';
import ActionBar from '../components/ActionBar';

const publicRoutes = [
    { path: '/', component: Home, layout: DefaultLayout },
    { path: '/start', component: Start },
    { path: '/following', component: Following, layout: DefaultLayout },
    { path: '/upload', component: Upload, layout: ActionBar },
    { path: '/explore', component: Explore, layout: null },
    { path: '/live', component: Live, layout: null },
    { path: '/@:nickname', component: Profile, layout: DefaultLayout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
