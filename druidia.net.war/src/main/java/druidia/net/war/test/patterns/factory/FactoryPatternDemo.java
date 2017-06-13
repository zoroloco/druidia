package druidia.net.war.test.patterns.factory;

import druidia.net.war.test.patterns.factory.ShapeFactory.ShapeType;

public class FactoryPatternDemo {

	public static void main(String[] args) {
		ShapeFactory factory = new ShapeFactory();
		
		ShapeType[] shapeTypes = ShapeFactory.ShapeType.values();
		for(int i = 0; i < shapeTypes.length; i++){						
			factory.getShape(shapeTypes[i]).draw();
		}		

	}

}
