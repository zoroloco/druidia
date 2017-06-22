package druidia.net.web.test.patterns.observer;

import java.util.ArrayList;
import java.util.List;

/**
 * This class will hold a list of all observers and notify them.
 * 
 * @author kcenturion
 *
 */

public class Subject {
	private List<Observer> observers = new ArrayList<Observer>();
	private int state;
	
	public int getState(){
		return state;
	}
	
	public void setState(int state){
		this.state = state;
		notifyAllObservers();
	}
	
	public void attach(Observer observer){
		observers.add(observer);
	}
	
	public void notifyAllObservers(){
		for(Observer obs : this.observers){
			obs.update();
		}
	}
}
