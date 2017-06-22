package druidia.net.web.test.patterns.decorator;

public abstract class ShapeDecorator implements Shape{
	protected Shape decoratedShape;
	
	public ShapeDecorator(Shape decoratedShape){
		this.decoratedShape = decoratedShape;
	}
	
	//can't override this final method.
	public final void p(){
		
	}
}
