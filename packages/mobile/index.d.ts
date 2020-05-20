declare module '*.png';
declare module '*.jpg';

interface Incident {
	id: number;
	title: string;
	name: string;
	email: string;
	value: number;
	whatsapp: string;
	city: string;
	uf: string;
}
