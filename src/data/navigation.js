import { servicesData } from './services';
import { eventsData } from './events';

export const navigationData = [
  { title: 'Startpagina', to: '/' },
  { 
    title: 'Verhuur', 
    to: '/verhuur', 
    type: 'dropdown', 
    children: servicesData.map(s => ({
      id: s.id,
      title: s.title,
      to: `/verhuur/dienst/${s.id}`,
      icon: s.icon
    }))
  },
  { 
    title: 'Evenementen', 
    to: '/evenementen', 
    type: 'dropdown', 
    children: eventsData.map(e => ({
      id: e.id,
      title: e.title,
      to: `/evenementen/type/${e.id}`,
      icon: e.icon
    }))
  },
  { title: 'Contact', to: '/contact' }
];
