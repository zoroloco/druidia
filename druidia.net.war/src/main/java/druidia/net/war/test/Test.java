package druidia.net.war.test;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.List;

/**
 * @author kcenturion
 *
 */
public class Test {

	public static void main(String[] args) {
		
		try {
			String druidiaHostname = InetAddress.getByName("34.201.38.178").getHostName();
			//System.out.println(druidiaHostname);
		} catch (UnknownHostException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}		
		
		String dogs[] = {"phoebe","mango","bubba","jonesy"};
		
		List<String> dogsArrayList = new ArrayList<String>();
		for(String dog : dogs){
			//System.out.println(dog);
			dogsArrayList.add(dog);
		}
		
		
		
	}

}
