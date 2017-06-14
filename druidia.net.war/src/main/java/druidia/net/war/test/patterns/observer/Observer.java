package druidia.net.war.test.patterns.observer;

public abstract class Observer {
	protected Subject subject;
	public abstract void update();
}
