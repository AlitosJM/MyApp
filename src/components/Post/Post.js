class Post{
  intro = "Hi there, I am José Miguel, nice to meet you...";
	constructor(post_id, title, subtitle, body){
    	this.post_id=post_id;
      this.title=title;
      this.subtitle=subtitle;
      this.body=this.intro;
    }
}

export default Post;
