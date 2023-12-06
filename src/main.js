import './css/main.css';
import { router } from '@/router';
import { dashboard } from '@/pages/Dashboard';
import { excel } from '@/pages/Excel';

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: dashboard,
  },
  {
    path: 'excel',
    name: 'excel',
    component: excel,
  },
];

router('#app', routes);
