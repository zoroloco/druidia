package druidia.net.war.test.patterns.observer;

/**
 * All observers will be given a subject to observe.
 * 
 * When a subject is changed in a certain way, then all observers will be notified of this change.
 * 
 * @author kcenturion
 *
 */

public class ObserverPatternDemo {

	public static void main(String[] args) {
		Subject subject = new Subject();//our subject that we want to observe.
		
		new BinaryObserver(subject);
		new OctalObserver(subject);
		new HexaObserver(subject);
		
		System.out.println("First state change: 15");	
        subject.setState(15);
        System.out.println("Second state change: 10");	
        subject.setState(10);
	}
}
