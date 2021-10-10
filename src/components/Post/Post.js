import PYTHON from '../../images/python-logo.png';

export class Post{
  intro0 = "Hi there, I am José Miguel, nice to meet you...";

  intro1 = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
  Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an 
  unknown printer took a galley of type and scrambled it to make a type specimen book. 
  It has survived not only five centuries, but also the leap into electronic typesetting, 
  remaining essentially unchanged. It was popularised in the 1960s with the release of 
  Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing 
  software like Aldus PageMaker including versions of Lorem Ipsum.`
  
	constructor(post_id, image, title, subtitle, parag0=null, parag1=null, latex=false){
    	this.post_id = post_id;
      this.image = image;
      this.title = title;
      this.subtitle =subtitle;
      this.parag0 = parag0 ? parag0:this.intro0;
      this.parag1 = parag1 ? parag1:this.intro1;
      this.latex = latex;
    }
}
const post_objects = [];

const myIntro_0 = `Mi nombre es José Miguel Alí Toscano, soy maestro en ciencias en 
bioelectrónica. Apasionado por proyectos relacionados a la ingeniería electrónica, 
he participado en el desarrollo de diversos proyectos desde hardware y firmware 
con base en lenguaje C para microntroladores de 8 bits.`

const myIntro_1 = `Mi interés general se encuentra en la generación de intrumentación 
electrónica que sea de utilidad para resolver problemas en específico. 
Actualmente, tengo interés en el diseño y desarrollo de aplicaciones web y 
machine learning con Python con el fin de brindar soluciones oportunas para satisfacer 
las necesidades empresariales,  académicas ó de asistencia tecnológica. 
Estas páginas son parte de mi primer proyecto de diseño web con React para Javascript.`

const LR_explanation = `La regresión lineal es una técnica de modelado estadístico que se emplea 
para describir una variable de respuesta continua como una función de una o varias variables 
predictoras ${"MATAB".link("https://la.mathworks.com/discovery/linear-regression.html")}.`;

const LR = `La ecuación general de la regresión lineal es: $Y=\\beta_0+\\sum\\ \\beta_i X_i +\\epsilon_i$`;


post_objects.push(new Post(0, PYTHON,"¡Hola Mundo!", "😄", myIntro_0, myIntro_1, false));
post_objects.push(new Post(1, PYTHON,"¡Regresión Lineal!", "🤖", LR_explanation, LR, true));
post_objects.push(new Post(2, PYTHON,"Wanna a cookie?", "🍪"));
post_objects.push(new Post(3, PYTHON,"Test ?", "🍪"));

export default post_objects;
