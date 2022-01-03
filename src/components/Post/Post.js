import PYTHON from '../../images/python-logo.png';
import REACT from '../../images/react-logo.png';
import JS from '../../images/js-logo.png';

export class Post{
  intro0 = "Hi there, I am José Miguel, nice to meet you...";

  intro1 = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
  Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an 
  unknown printer took a galley of type and scrambled it to make a type specimen book. 
  It has survived not only five centuries, but also the leap into electronic typesetting, 
  remaining essentially unchanged. It was popularised in the 1960s with the release of 
  Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing 
  software like Aldus PageMaker including versions of Lorem Ipsum.`
  
	constructor(post_id, image, title, subtitle, parag0=null, latex=false){
    	this.post_id = post_id;
      this.image = image;
      this.title = title;
      this.subtitle =subtitle;
      this.parag0 = parag0 ? parag0:this.intro0;
      this.latex = latex;
    }
}
const post_objects = [];

const myIntro = `<p> Mi nombre es José Miguel Alí Toscano, soy maestro en ciencias en 
Bioelectrónica. Apasionado por proyectos relacionados a la ingeniería electrónica, 
he participado en el desarrollo de diversos proyectos desde hardware y firmware 
con base en lenguaje C para microntroladores de 8 bits. </p>
<p> Mi interés general se encuentra en la generación de intrumentación 
electrónica que sea de utilidad para resolver problemas en específico. 
Actualmente, tengo interés en el diseño y desarrollo de aplicaciones web y 
machine learning con Python con el fin de brindar soluciones oportunas para satisfacer 
las necesidades empresariales,  académicas ó de asistencia tecnológica. 
Estas páginas son parte de mi primer proyecto de diseño web con React para Javascript y Django
como mini servicio para sign up/login, regresión lineal simple y creación de modelo Red Neuronal
con TensorFlow para reconocimiento de patrones. </p>`;

const lrExplanation = `<p> La regresión lineal es una técnica de modelado estadístico que se emplea 
para describir una variable de respuesta continua como una función de una o varias variables 
predictoras.</p>
<p> La ecuación general de la regresión lineal simple es: $Y=\\beta_0+ \\beta_i X_i +\\epsilon_i$,  $\\ X_i$ es la variable
independiente y $Y$ la variable respuesta. $\\beta_0$ y $\\beta_i$ son las estimaciones de parámetros 
y lineales que se deben calcular $\\epsilon_i$ es el término de error ${"MATAB".link("https://la.mathworks.com/discovery/linear-regression.html")}.</p>
<p> La siguiente forma acepta un archivo CSV el cual deberá contener dos columnas de datos, una columna de datos
 para la variable independiente y otra para la variable respuesta. Los datos deben ser numéricos, preprocesados y tener etiquetas
 descriptoras el primer renglón para poder calcular el <strong class="myStrong">modelo de regresión lineal simple</strong> y obtener
 un valor a predecir.</p>`;

const TicTacToc = `
Este es el juego del gato o Tic Tac Toe realizado en JavaScript espero lo disfrutes mucho.
`;

const TensorFlow = `<p>
Este es un ejemplo de modelo de red neuronal entrenado para reconocimiento de imágenes. El modelo se calculó con Python y
sus pesos son utilizados en esta aplicacion web para reconocer los dígitos de respuesta de una suma aritmética.</p>
<p> El juego trata dibujar el resultado correcto de la suma en el lienzo obscuro y si el resultado es correcto, se observará
el crecimiento de un "Jardín Matemático".
</p>
`;


post_objects.push(new Post(0, REACT,"¡Hola Mundo!", "😄", myIntro, false));
post_objects.push(new Post(1, PYTHON,"Regresión Lineal", "🤖", lrExplanation, true));
post_objects.push(new Post(2, JS,"Tic Tac Toe", "🎮", TicTacToc));
post_objects.push(new Post(3, PYTHON,"Jardín Aritmético", "🌷", TensorFlow));

export default post_objects;
