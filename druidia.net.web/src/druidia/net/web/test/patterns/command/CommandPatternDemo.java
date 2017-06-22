package druidia.net.web.test.patterns.command;

/**
 * 
 * Command pattern is a data driven design pattern and falls under behavioral pattern category. 
 * A request is wrapped under an object as command and passed to invoker object.
 *  Invoker object looks for the appropriate object which can handle this command and passes 
 *  the command to the corresponding object which executes the command.
 *
 */

public class CommandPatternDemo {

	public static void main(String[] args) {
		Stock abcStock = new Stock();
		
		BuyStock buyStockOrder   = new BuyStock(abcStock);
		SellStock sellStockOrder = new SellStock(abcStock);
		
		Broker broker = new Broker();
		broker.takeOrder(buyStockOrder);
		broker.takeOrder(sellStockOrder);
		
		broker.placeOrders();
	}

}
