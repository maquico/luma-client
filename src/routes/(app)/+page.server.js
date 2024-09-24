/** @type {import('./$types').PageLoad} */
export async function load() {

	// axios.get('http://luma-server.onrender.com/api/projects/')
	// 	.then((response) =>{
	// 		console.log('Projects',response)
	// 	})
	// 	.catch((error) => {
	// 		console.log(error.messages)
	// 	})

	return {
		projects: [
			{
				"title": "Desarrollo de Plataforma E-commerce",
				"description": "Plataforma para la venta de productos ecológicos y frescos en la República Dominicana.",
				"create_date": "2024-08-15",
				"members": ["Ana Gómez", "Luis Pérez", "María Rodríguez"],
				"creator": "Juan Martínez"
			},
			{
				"title": "Proyecto Luma",
				"description": "Plataforma web que combina la gestión de proyectos con la gamificación.",
				"create_date": "2024-07-30",
				"members": ["Raúl Torres", "Diana Morales", "Esteban Vega"],
				"creator": "Marcelo Silva"
			},
			{
				"title": "Aplicativo Biblioteca con FastAPI",
				"description": "Gestión de una biblioteca de libros con FastAPI para implementar conceptos de DevOps.",
				"create_date": "2024-07-10",
				"members": ["Isabel Rivera", "Pedro Sánchez"],
				"creator": "Clara Castillo"
			},
			{
				"title": "Sistema de Gestión de Inventarios",
				"description": "Sistema automatizado para el control y seguimiento de inventarios en una cadena de tiendas minoristas.",
				"create_date": "2024-06-20",
				"members": ["Elena González", "Fernando Herrera"],
				"creator": "Miguel Pérez"
			},
			{
				"title": "Aplicación de Seguimiento de Salud",
				"description": "App móvil que permite a los usuarios monitorear su salud mediante el seguimiento de parámetros como la actividad física y la alimentación.",
				"create_date": "2024-05-05",
				"members": ["Julia Ramírez", "Andrés López", "Natalia Duarte"],
				"creator": "Roberto Suárez"
			},
			{
				"title": "Plataforma de Cursos en Línea",
				"description": "Desarrollo de una plataforma de e-learning para ofrecer cursos en línea sobre diferentes disciplinas.",
				"create_date": "2024-04-18",
				"members": ["Carmen Ortiz", "Eduardo Castro"],
				"creator": "Adriana Muñoz"
			},
			{
				"title": "Sistema de Facturación Electrónica",
				"description": "Desarrollo de un sistema para la emisión y gestión de facturas electrónicas para pequeñas y medianas empresas.",
				"create_date": "2024-03-12",
				"members": ["Patricia Paredes", "Ricardo Serrano"],
				"creator": "Diego Vásquez"
			},
			{
				"title": "Proyecto Luma",
				"description": "Plataforma web que combina la gestión de proyectos con la gamificación.",
				"create_date": "2024-07-30",
				"members": ["Raúl Torres", "Diana Morales", "Esteban Vega"],
				"creator": "Marcelo Silva"
			},
			{
				"title": "Aplicativo Biblioteca con FastAPI",
				"description": "Gestión de una biblioteca de libros con FastAPI para implementar conceptos de DevOps.",
				"create_date": "2024-07-10",
				"members": ["Isabel Rivera", "Pedro Sánchez"],
				"creator": "Clara Castillo"
			},
			{
				"title": "Sistema de Gestión de Inventarios",
				"description": "Sistema automatizado para el control y seguimiento de inventarios en una cadena de tiendas minoristas.",
				"create_date": "2024-06-20",
				"members": ["Elena González", "Fernando Herrera"],
				"creator": "Miguel Pérez"
			},
		]
	};
}