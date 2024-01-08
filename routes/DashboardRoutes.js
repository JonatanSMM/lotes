import { v4 as uuid } from 'uuid';
export const DashboardMenu = [
	{
		id: uuid(),
		title: 'Inicio',
		icon: 'home',
		link: '/'
	},
	{
		id: uuid(),
		title: 'PAGINAS EDITABLES',
		grouptitle: true
	},
	{
		id: uuid(),
		title: 'Menu',
		icon: 'menu',
		link: '/dashboard/crud'
	},
	{
		id: uuid(),
		title: 'Noticias',
		icon: 'book-open',
		link: '/dashboard/crud2'
	},
	{
		id: uuid(),
		title: 'Publicidad',
		icon: 'activity',
		link: '/dashboard/crud3'
	},
	{
		id: uuid(),
		title: 'Lista Imagenes',
		icon: 'image',
		link: '/dashboard/crud4'
	},
	{
		id: uuid(),
		title: 'Proyectos',
		icon: 'command',
		link: '/dashboard/crud5'
	},
	{
		id: uuid(),
		title: 'Carrusel',
		icon: 'command',
		link: '/dashboard/crud6'
	},
	{
		id: uuid(),
		title: 'COMPRA TU LOTE',
		grouptitle: true
	},
	{
		id: uuid(),
		title: 'Administrable',
		icon: 'code',
		children: [
			{ id: uuid(), link: '/dashboard/navBar', name: 'Navbar' },
			{ id: uuid(), link: '/dashboard/slider', name: 'Slider' },
			{ id: uuid(), link: '/dashboard/servicios', name: 'Servicios' },
			{ id: uuid(), link: '/dashboard/especificaciones', name: 'Información' },
			{ id: uuid(), link: '/dashboard/detalleinfo', name: 'Especificaciones'},
			{ id: uuid(), link: '/authentication/forget-password', name: 'Imagenes'}			
		]
	},
	{
		id: uuid(),
		title: 'SEGURIDAD',
		grouptitle: true
	},
	{
		id: uuid(),
		title: 'User',
		icon: 'user',
		link: '/dashboard/menus'
	},
	{
		id: uuid(),
		title: 'Autentificacion',
		icon: 'lock',
		children: [
			{ id: uuid(), link: '/authentication/sign-in', name: 'Iniciar Sesion' },
			{ id: uuid(), link: '/authentication/sign-up', name: 'Registrarse' },
			{ id: uuid(), link: '/authentication/forget-password', name: 'Forget Password'}			
		]
	},
	{
		id: uuid(),
		title: 'OTROS COMPONENTES',
		grouptitle: true
	},	
	{
		id: uuid(),
		title: '404 Error',
		icon: 'server',
		link: '/404'
	},
	{
		id: uuid(),
		title: 'Components',
		icon: 'monitor',
		children: [
			{ id: uuid(), link: '/components/modal', name: 'Modal' },
			{ id: uuid(), link: '/components/progress', name: 'Progress' },
			{ id: uuid(), link: '/components/spinners', name: 'Spinners' },
		]
	},	

	
];

export default DashboardMenu;
