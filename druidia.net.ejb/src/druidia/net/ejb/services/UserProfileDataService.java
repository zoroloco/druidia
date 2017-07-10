package druidia.net.ejb.services;

import javax.ejb.Local;
import javax.persistence.NoResultException;

import druidia.net.persistence.domain.entities.UserProfile;

/**
 * This is @local because this interface that exposes the business methods for persistence 
 * resides on the same server as the EJB client application.
 * 
 * @author kcenturion
 *
 */

@Local
public interface UserProfileDataService {
	/**
	 * 
	 * @param userProfile
	 */
	public void create(UserProfile userProfile);
	/**
	 * 
	 * @param id
	 * @return
	 * @throws NoResultException
	 */
	public UserProfile read(Integer id) throws NoResultException;
	/**
	 * 
	 * @param userProfile
	 */
	public void update(UserProfile userProfile);
	/**
	 * Deletes a user profile from the user_profile table.
	 * @param userProfile
	 */
	public void delete(Integer id);
}
