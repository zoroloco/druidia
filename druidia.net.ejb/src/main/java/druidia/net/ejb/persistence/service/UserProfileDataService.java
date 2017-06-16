package druidia.net.ejb.persistence.service;

import javax.ejb.Local;

/**
 * This is @local because this interface that exposes the business methods for persistence 
 * resides on the same server as the EJB client application.
 * 
 * @author kcenturion
 *
 */

@Local
public interface UserProfileDataService {
	public void create();
	public void read();
	public void update();
	public void delete();
}
