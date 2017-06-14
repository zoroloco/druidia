package druidia.net.war.test.patterns.command;

public class SellStock implements Order{
	private Stock abcStock;
	
	public SellStock(Stock abcStock){
		this.abcStock = abcStock;
	}
	
	public void execute() {		
		this.abcStock.sell();
	}

}
