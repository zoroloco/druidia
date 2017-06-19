package druidia.net.war.test;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

/**
 * @author kcenturion
 *
 */
public class Test {

	public static void main(String[] args){
		
		String foo = "i purchased phoebe on my birthday almost ten years ago. Good doggy.";
		
		Map<String,Integer> charCounter = new HashMap<String,Integer>();
		for(int i = 0; i < foo.length(); i++){
			if(charCounter.containsKey(foo.charAt(i))){
				Integer charCount = charCounter.get(foo.charAt(i));
				charCount++;
				charCounter.put(String.valueOf(foo.charAt(i)), charCount);
			}
			else{
				charCounter.put(String.valueOf(foo.charAt(i)), new Integer(0));
			}
		}
		
		Iterator<String> it = charCounter.keySet().iterator();
		while(it.hasNext()){
			String val = (String)it.next();
			System.out.println(val+charCounter.get(val));
		}
	}

}
