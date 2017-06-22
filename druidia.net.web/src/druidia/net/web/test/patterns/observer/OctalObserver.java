package druidia.net.web.test.patterns.observer;

public class OctalObserver extends Observer{
	private Subject subject;
	
	public OctalObserver(Subject subject){
		this.subject = subject;
		this.subject.attach(this);
	}

	@Override
	public void update() {
		System.out.println("Octal string: " + Integer.toOctalString(subject.getState()));
		
	}

}
