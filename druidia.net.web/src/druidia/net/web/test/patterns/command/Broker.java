package druidia.net.web.test.patterns.command;

import java.util.ArrayList;
import java.util.List;

//command invoker class.

public class Broker {
	private List<Order> orderList = new ArrayList<Order>();
	
	//build the chain of commands
	public void takeOrder(Order order){
		orderList.add(order);
	}
	
	//execute the commands in their order
	public void placeOrders(){
		for(Order order: orderList){
			order.execute();
		}
		orderList.clear();
	}
}
