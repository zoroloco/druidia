package druidia.net.ejb.services;

import javax.ejb.Local;

//import druidia.net.persistence.entities.UserProfile;

/**
 * This is @local because this interface that exposes the business methods for persistence 
 * resides on the same server as the EJB client application.
 * 
 * @author kcenturion
 *
 */

@Local
public interface UserProfileDataService {
	/*
	
	public void create(UserProfile userProfile);
	
	public UserProfile read(Integer id) throws NoResultException;
	
	public void update(UserProfile userProfile);

	public void delete(Integer id);
	
	*/
}
