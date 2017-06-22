package druidia.net.web.test.patterns.chainofresponsibility;

public abstract class AbstractLogger {
	public static int INFO = 1;
	public static int DEBUG= 2;
	public static int ERROR= 3;
	
	protected int level;
	
	protected AbstractLogger nextLogger;

	public AbstractLogger(){
		
	}
	
	protected void setNext(AbstractLogger nextLogger){
		this.nextLogger = nextLogger;
	}
	
	public void logMessage(int level, String message){
		if(this.level == level){//I can do this!
			write(message);
		}
		if(nextLogger != null){//this is beyond my level! lets pass it along!
			nextLogger.logMessage(level, message);
		}		
	}
	
	abstract protected void write(String message);
}
