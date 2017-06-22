package druidia.net.web.test.patterns.strategy;

public class OperationSubtract implements Strategy{

	public int doOperation(int num1, int num2) {
		return num1 - num2;
	}

}
