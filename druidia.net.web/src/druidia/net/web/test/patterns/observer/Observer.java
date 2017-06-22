package druidia.net.web.test.patterns.observer;

public abstract class Observer {
	protected Subject subject;
	public abstract void update();
}
