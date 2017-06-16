
public class KenSingleton {

	private static KenSingleton instance;
	
	public KenSingleton(){
		
	}
	
	public static KenSingleton getInstance(){
		if(null == instance){
			return new KenSingleton();
		}
		
		return instance;
	}
}
