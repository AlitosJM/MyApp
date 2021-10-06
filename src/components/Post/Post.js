import PYTHON from '../../images/python-logo.png';

export class Post{
  intro = "Hi there, I am José Miguel, nice to meet you...";
	constructor(post_id, image,title, subtitle, body=null){
    	this.post_id=post_id;
      this.image=image;
      this.title=title;
      this.subtitle=subtitle;
      this.body=this.intro;
    }
}

const post_objects = [];
post_objects.push(new Post(0, PYTHON,"Hello world!", "😄"));
post_objects.push(new Post(1, PYTHON,"Hi there!", "🤖"));
post_objects.push(new Post(2, PYTHON,"Wanna a cookie?", "🍪"));

export default post_objects;
