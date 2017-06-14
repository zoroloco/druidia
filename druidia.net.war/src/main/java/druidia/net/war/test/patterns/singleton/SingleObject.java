package druidia.net.war.test.patterns.singleton;

public class SingleObject {

	//this static member will exist only once for this whole class.
	private static SingleObject instance = new SingleObject();
	
	//make this class private so it cannot be instantiated.
	private SingleObject(){
		
	}
	
	public static SingleObject getInstance(){
		return instance;
	}
	
	public void showMessage(){
		System.out.println("this is from our singleton.");
	}
}
