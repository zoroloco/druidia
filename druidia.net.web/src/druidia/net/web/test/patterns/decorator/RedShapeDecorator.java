package druidia.net.web.test.patterns.decorator;

public class RedShapeDecorator extends ShapeDecorator{

	public RedShapeDecorator(Shape decoratedShape) {
		super(decoratedShape);
	}
	
	public void draw(){
		decoratedShape.draw();
		setRedBorder(decoratedShape);//do a little something extra.
	}
	
	private void setRedBorder(Shape decoratedShape){
		System.out.println("Border color:red");
	}

}
