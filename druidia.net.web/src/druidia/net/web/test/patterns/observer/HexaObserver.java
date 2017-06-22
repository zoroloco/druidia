package druidia.net.web.test.patterns.observer;

public class HexaObserver extends Observer{
	private Subject subject;
	
	public HexaObserver(Subject subject){
		this.subject = subject;
		this.subject.attach(this);//hey I am listening to you!
	}
	
	@Override
	public void update() {
		System.out.println("Hex String:" +Integer.toHexString(subject.getState()));
	}

}
