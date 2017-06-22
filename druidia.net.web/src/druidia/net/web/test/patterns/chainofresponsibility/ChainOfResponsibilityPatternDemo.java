package druidia.net.web.test.patterns.chainofresponsibility;

public class ChainOfResponsibilityPatternDemo {

	private static AbstractLogger getChainOfLoggers(){
		AbstractLogger errorLogger   = new ErrorLogger(AbstractLogger.ERROR);
		AbstractLogger fileLogger    = new FileLogger(AbstractLogger.DEBUG);
		AbstractLogger consoleLogger = new ConsoleLogger(AbstractLogger.INFO);
		
		errorLogger.setNext(fileLogger);
		fileLogger.setNext(consoleLogger);
		
		return errorLogger;
	}
	
	public static void main(String[] args) {
		AbstractLogger loggerChain = getChainOfLoggers();

		loggerChain.logMessage(AbstractLogger.INFO, 
				"This is an info message.");
		 
		loggerChain.logMessage(AbstractLogger.DEBUG, 
		         "This is an debug level information.");

		loggerChain.logMessage(AbstractLogger.ERROR, 
		         "This is an error information.");
	}

}
