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
		
		String foo = "i purchased phoebe on my birthday almost ten years ago. Gooooooooooooooooooooooooooooooooood doggy.";
		
		Map<String,Integer> charCounter = new HashMap<String,Integer>();
		for(int i = 0; i < foo.length(); i++){
			String key = String.valueOf(foo.charAt(i));
			
			if(!charCounter.containsKey(key)){
				charCounter.put(key, new Integer(0));
			}		
			
			Integer charCount = charCounter.get(key);
			charCount++;
			charCounter.put(key, charCount);			
		}
				
		int highestCount = 0;
		String highestKey= null;
		
		Iterator<Map.Entry<String, Integer>> it = charCounter.entrySet().iterator();
		while(it.hasNext()){
			Map.Entry<String, Integer> me = it.next();
			System.out.println(me.getKey()+":"+me.getValue());
			if(me.getValue()>highestCount){
				highestCount = me.getValue();
				highestKey   = me.getKey();
			}
		}
		
		System.out.println("Letter with highest occurence is: "+highestKey+ " with "+highestCount+" times.");
	}

}
