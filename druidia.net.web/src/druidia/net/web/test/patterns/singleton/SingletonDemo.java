package druidia.net.web.test.patterns.singleton;

public class SingletonDemo {

	public static void main(String[] args) {
		SingleObject mySingleton = SingleObject.getInstance();
		mySingleton.showMessage();
	}

}
