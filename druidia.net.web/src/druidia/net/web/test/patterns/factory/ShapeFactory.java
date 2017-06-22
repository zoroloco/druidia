package druidia.net.web.test.patterns.factory;

public class ShapeFactory {
	public static enum ShapeType{
		CIRCLE,
		RECTANGLE,
		SQUARE
	}

	/**
	 * 
	 * @param shapeType
	 * @return
	 */
	public Shape getShape(ShapeType shapeType){
		switch(shapeType){
		case CIRCLE:
			return new Circle();		
		case RECTANGLE:
			return new Rectangle();
		case SQUARE:
			return new Square();		
		default:
			return null;
		}
	}
}
