class Plinko{
constructor(x,y){
var options = {
    isStatic:true,
    restitution:1,
    friction: 0
}
    
this.body = Bodies.circle(x, y, 10, options);
this.r = 10;

World.add(world, this.body);

}
display(){
    ellipse(this.body.position.x, this.body.position.y, this.r);
}
 function() {
    noStroke();
    fill();
    var pos = this.body.position;
    push();
    translate(pos.x, pos.y);
    ellipse(0, 0, this.r * 2);
    pop();
  }

}

