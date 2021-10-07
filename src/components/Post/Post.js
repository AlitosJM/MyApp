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
  
	constructor(post_id, image, title, subtitle, parag0=null, parag1=null){
    	this.post_id=post_id;
      this.image=image;
      this.title=title;
      this.subtitle=subtitle;
      this.parag0=this.intro0;
      this.parag1=this.intro1;
    }
}

const post_objects = [];
post_objects.push(new Post(0, PYTHON,"Hello world!", "😄"));
post_objects.push(new Post(1, PYTHON,"Hi there, Python apps!", "🤖"));
post_objects.push(new Post(2, PYTHON,"Wanna a cookie?", "🍪"));
post_objects.push(new Post(3, PYTHON,"Test ?", "🍪"));

export default post_objects;
