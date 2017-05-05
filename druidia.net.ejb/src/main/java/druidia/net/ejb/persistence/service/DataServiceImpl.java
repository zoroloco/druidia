package druidia.net.ejb.persistence.service;

import java.io.Serializable;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceContextType;

@Stateless
public class DataServiceImpl implements DataService,Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -4180029320339341961L;

	@PersistenceContext(unitName = "LFPU", type = PersistenceContextType.TRANSACTION)
	private EntityManager entityManager;
	
	//private static final IAppLogger log = LoggerFactory.getLogger(DataServiceImpl.class);
	
	public EntityManager getEntityManager(){
		return entityManager;
	}
	
	/*
	@Override
	public User saveUser(User user) throws DruidiaException{
		try{			
			log.info("Saving user:"+user);			
			return getEntityManager().merge((User)SecurityHelper.auditEntity(user));
		}
		catch(Exception e){
			throw new DruidiaException(e.getMessage());
		}		
	}
	
	@Override
	public void deleteUser(User user) throws DruidiaException{
		if(null == user || null == user.getId()){
			throw new DruidiaException("Invalid User.");
		}
			
		EntityManager em    = getEntityManager();				
		
		try{
			log.info("Deleting user: "+user,true);
			User u = em.find(User.class, user.getId());
			if(null != u){										
				em.remove(u);		
				log.info("Delete of user:"+user+" has been committed to database.");
			}
		}
		catch(Exception e){
			throw new DruidiaException("Error deleting user.");
		} 
	}	
	
	@Override
	public User getUser(String username) throws DruidiaException {				
		try{
			Query query = getEntityManager().createNamedQuery("User.findByUserName");
			if(null != query){
				query.setParameter("userName", username);
				User user = (User)query.getSingleResult();
				if(null != user){
					
					log.info("User "+user+" loaded.");
					if(null != user.getUserProfile() && 
					   null != user.getUserProfile().getProfileUserEvent() &&
					   null != user.getUserProfile().getProfileUserEvent().getUserFiles() &&
					   user.getUserProfile().getProfileUserEvent().getUserFiles().size()>0){
						log.info("Lazily loading user profile user event "+user.getUserProfile().getProfileUserEvent().getId()+
								" with "+user.getUserProfile().getProfileUserEvent().getUserFiles().size()+" user files.");
					}
					
					return user;
				}
			}
		}
		catch(NoResultException nre){
			log.info("No result found.");
			return null;
		}
		catch(Exception e){
			throw new DruidiaException(e.getMessage());
		}		
		
		return null;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Role> getRoles() throws DruidiaException{
		
		List<Role>results = new ArrayList<Role>();
		
		try{
			Query query = getEntityManager().createNamedQuery("Role.findAll");
			if(null != query){
				results = (List<Role>)query.getResultList();
			}
		}
		catch(Exception e){
			throw new DruidiaException(e.getMessage());
		}
		
		return results;
	}
	
	@Override
	public List<UserEvent> getAllPublicUserEvents() throws DruidiaException {
		List<UserEvent>results = new ArrayList<UserEvent>();
		try{
			Query query = getEntityManager().createNamedQuery("UserEvent.findAllPublicUserEvents");
			if(null != query){
				results = (List<UserEvent>)query.getResultList();
				
				//how for every userevent, we do a call to the userFile's collection's size() method.
				//this will initialize the proxy to enable lazy loading.
				for(int i = 0; i < results.size(); i++){
					UserEvent curEvent = results.get(i);
					log.info("Lazily loading user event "+curEvent.getId()+" with "+
							 curEvent.getUserFiles().size()+" user files and "+
							 curEvent.getComments().size()+" user comments.");
				}
			}
		}
		catch(NoResultException nre){
			log.info("No public user events found.");
		}
		catch(Exception e){
			throw new DruidiaException(e.getMessage());
		}
		
		return results;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<UserEvent> getUserEventsPublicByUserID(Long userID) throws DruidiaException {
		log.info("Querying all user events for userID:"+userID,true);
		List<UserEvent>results = new ArrayList<UserEvent>();
		
		try{
			Query query = getEntityManager().createNamedQuery("UserEvent.findUserEventsByUserID");			
			if(null != query){
				query.setParameter("userID", userID);
				
				results = (List<UserEvent>)query.getResultList();
				
				//how for every userevent, we do a call to the userFile's collection's size() method.
				//this will initialize the proxy to enable lazy loading.
				for(int i = 0; i < results.size(); i++){
					UserEvent curEvent = results.get(i);
					log.info("Lazily loading user event "+curEvent.getId()+" with "+
							 curEvent.getUserFiles().size()+" user files and "+
							 curEvent.getComments().size()+" user comments.");
				}
			}
		}
		catch(Exception e){
			throw new DruidiaException(e.getMessage());
		}
		
		return results;
	}

	@Override
	public UserFile saveUserFile(UserFile file) throws DruidiaException{
		try{
			log.info("Saving file:"+file);
			return getEntityManager().merge((UserFile)SecurityHelper.auditEntity(file));
		}
		catch(Exception e){
			throw new DruidiaException(e.getMessage());
		}		
	}

	@Override
	public void saveAuditLog(AuditLog auditLog) {
		try{
			log.info("Saving audit log:"+auditLog);
			getEntityManager().merge((AuditLog)SecurityHelper.auditEntity(auditLog));
		}
		catch(RuntimeException re){
			log.error(re.getMessage());
			throw re;
		}				
	}

	@Override
	public User getUser(Long userID) throws DruidiaException {
		User result = null;
		try{
			result = getEntityManager().find(User.class, userID);
		}
		catch(Exception e){
			throw new DruidiaException(e.getMessage());
		}
		
		return result;
	}

	@Override
	public UserEvent saveUserEvent(UserEvent userEvent) throws DruidiaException {
		try{			
			log.info("Saving user event:"+userEvent);					
			UserEvent savedUserEvent = getEntityManager().merge((UserEvent)SecurityHelper.auditEntity(userEvent));
			
			if(null != savedUserEvent){								
				log.info("Lazily loading user event "+savedUserEvent.getId()+" with "+savedUserEvent.getUserFiles().size()+" user files.");
				FileHelper.createDir(FileHelper.getUserDirectoryPathForUser(userEvent.getUser())+savedUserEvent.getId());
				return savedUserEvent;	
			}						
		}
		catch(Exception e){
			throw new DruidiaException(e.getMessage());
		}		
		
		return null;
	}
	
	@Override
	public void deleteUserEvent(UserEvent userEvent) throws DruidiaException{
		if(null == userEvent || null == userEvent.getId()){
			throw new DruidiaException("User event to be deleted is invalid:"+userEvent);
		}
			
		EntityManager em    = getEntityManager();								
		
		try{
			log.info("Attempting to delete user event: "+userEvent,true);									
			UserEvent ub = em.find(UserEvent.class, userEvent.getId());
			if(null != ub){										
				em.remove(ub);		
				log.info("Delete of user event:"+userEvent+" has been committed to database.");
			}
		}
		catch(Exception e){			
			throw new DruidiaException(e.getMessage());
		} 
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<UserEvent> getUserEventsByDateRange(Long userId,Date startDate, Date endDate) throws DruidiaException{
		List<UserEvent> results = new ArrayList<UserEvent>();
		
		try{
			Query query = entityManager.createNamedQuery("UserEvent.findAllUserEventsByDateRange");
		    query.setParameter("userId",  userId);
		    query.setParameter("startDate", startDate);
		    query.setParameter("endDate", endDate);
		    
		    results = query.getResultList();	
		}
		catch(Exception e){
			throw new DruidiaException(e.getMessage());
		}
	   	   
		return results;
	}

	@Override
	public UserEvent getUserEvent(Long userEventID) throws DruidiaException {
		UserEvent result = null;
		try{
			result = getEntityManager().find(UserEvent.class, userEventID);
			if(null != result){
				log.info("Lazily loading user event "+userEventID+" with "+result.getUserFiles().size()+" user files.");
				
				//call every userFile's collection's size() method.
				//this will initialize the proxy to enable lazy loading.								
				log.info("Lazily loading user event "+result.getId()+" with "+
					result.getUserFiles().size()+" user files and "+
					result.getComments().size()+" user comments.");				
			}
		}
		catch(Exception e){
			throw new DruidiaException(e.getMessage());
		}
		
		return result;
	}
	
	@Override
	public UserFile getUserFile(Long userFileID) throws DruidiaException {
		UserFile result = null;
		try{
			result = getEntityManager().find(UserFile.class, userFileID);
			if(null != result){
				log.info("Lazily loading user file "+userFileID);								
			}
		}
		catch(Exception e){
			throw new DruidiaException(e.getMessage());
		}
		
		return result;
		
	}

	@Override
	public void deleteUserFile(UserFile userFile) throws DruidiaException {
		if(null == userFile || null == userFile.getId()){
			throw new DruidiaException("User file to be deleted is invalid:"+userFile);
		}
			
		EntityManager em    = getEntityManager();								
		
		try{
			log.info("Attempting to delete user file: "+userFile,true);									
			UserFile uf = em.find(UserFile.class, userFile.getId());
			if(null != uf){										
				em.remove(uf);		
				log.info("Delete of user file:"+userFile+" has been committed to database.");
			}
		}
		catch(Exception e){			
			throw new DruidiaException(e.getMessage());
		} 		
	}
	
	@Override
	public DeviceCommand saveDeviceCommand(DeviceCommand deviceCommand) throws DruidiaException {
		DeviceCommand savedDeviceCommand = null;
		try{						
			savedDeviceCommand = 
					getEntityManager().merge((DeviceCommand)SecurityHelper.auditEntity(deviceCommand));						
		}
		catch(Exception e){
			throw new DruidiaException(e.getMessage());
		}		
		
		return savedDeviceCommand;
	}

	@Override
	public DeviceCommand popDeviceCommand(String deviceID) throws DruidiaException {
		log.info("Querying device commands for device ID:"+deviceID);
		DeviceCommand dc = null;
		try{
			Query query = getEntityManager().createNamedQuery("DeviceCommand.getOldestDeviceCommand");
			if(null != query){
				query.setParameter("deviceID", deviceID);
				@SuppressWarnings("unchecked")
				List<DeviceCommand>results = query.getResultList();
				if(null != results && results.size()>0){
					dc = results.get(0);//oldest queued up command for this device.
				}
			}
		}
		catch(NoResultException nre){
			log.info("No pending device commands found for device ID:"+deviceID);
		}
		catch(Exception e){
			throw new DruidiaException(e.getMessage());
		}		
		
		return dc;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Device> getAllDevices() throws DruidiaException {
		List<Device>results = new ArrayList<Device>();
		try{
			Query query = getEntityManager().createNamedQuery("Device.getAllDevices");
			if(null != query){
				results = (List<Device>)query.getResultList();
			}
		}
		catch(NoResultException nre){
			log.info("No devices found.");
		}
		catch(Exception e){
			throw new DruidiaException(e.getMessage());
		}
		
		return results;
	}

	@Override
	public Device getDeviceByMacAddress(String macAddress) throws DruidiaException {		
		Device result = null;
		try{
			Query query = getEntityManager().createNamedQuery("Device.getDeviceByMacAddress");
			if(null != query){
				query.setParameter("macAddress", macAddress);
				result = (Device)query.getSingleResult();
			}
		}
		catch(Exception e){
			throw new DruidiaException(e.getMessage());
		}
		
		return result;
	}
	
	@Override
	public UserEvent getUserEventByTitle(String title) throws DruidiaException {
		UserEvent result = null;
		try{
			Query query = getEntityManager().createNamedQuery("UserEvent.findUserEventByTitle");
			if(null != query){
				query.setParameter("title", title);
				result = (UserEvent)query.getSingleResult();
				
				//call every userFile's collection's size() method.
				//this will initialize the proxy to enable lazy loading.								
				if(null != result){
					log.info("Lazily loading user event "+result.getId()+" with "+
							result.getUserFiles().size()+" user files and "+
							result.getComments().size()+" user comments.");
				}
			}
		}
		catch(Exception e){
			throw new DruidiaException(e.getMessage());
		}
		
		return result;
	}

	@Override
	public Device saveDevice(Device device) throws DruidiaException {
		try{			
			log.info("Saving device:"+device);			
			return getEntityManager().merge((Device)SecurityHelper.auditEntity(device));
		}
		catch(Exception e){
			throw new DruidiaException(e.getMessage());
		}		
	}

	@Override
	public int getUserEventCountForUser(Long userID) throws DruidiaException {
		Integer result = null;
		
		try{
			Query query = entityManager.createNamedQuery("UserEvent.findUserEventsByUserID");
		    query.setParameter("userID",  userID);		    		    		    
		    result = (Integer)query.getResultList().size();		    
		}
		catch(NoResultException nre){
			result = 0;
		}
		catch(Exception e){			
			throw new DruidiaException(e.getMessage());
		}
		
		log.info(result+" user event(s) found for user ID:"+userID);
		
		return result;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<UserEvent> getUserEventsForUserLazy(Long userID,int startingFrom, int chunkSize) throws DruidiaException {
		List<UserEvent>results = new ArrayList<UserEvent>();
		log.info("Fetching user events starting from:"+startingFrom+" with max results of "+chunkSize+" for user ID:"+userID);
		try{
			Query query = entityManager.createNamedQuery("UserEvent.findUserEventsByUserID");
		    query.setParameter("userID",  userID);		    
		    query.setFirstResult(startingFrom);
		    query.setMaxResults(chunkSize);
		    		    
		    results = (List<UserEvent>)query.getResultList();		    
		    
		    //how for every userevent, we do a call to the userFile's collection's size() method.
			//this will initialize the proxy to enable lazy loading.
			for(int i = 0; i < results.size(); i++){
				UserEvent curEvent = results.get(i);
				log.info("Lazily loading user event "+curEvent.getId()+" with "+
						 curEvent.getUserFiles().size()+" user files and "+
						 curEvent.getComments().size()+" user comments.");
			}
		}
		catch(Exception e){
			throw new DruidiaException(e.getMessage());
		}
		
		return results;
	}

	@Override
	public SecurityDriveFile saveSecurityDriveFile(SecurityDriveFile securityDriveFile) throws DruidiaException {
		try{			
			log.info("Saving security drive file:"+securityDriveFile);
			return getEntityManager().merge((SecurityDriveFile)SecurityHelper.auditEntity(securityDriveFile));
		}
		catch(Exception e){
			throw new DruidiaException(e.getMessage());
		}				
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<SecurityDriveFile> getAllSecurityDriveFiles() throws DruidiaException {
		List<SecurityDriveFile>results = new ArrayList<SecurityDriveFile>();
		try{
			Query query = getEntityManager().createNamedQuery("SecurityDriveFile.getAllSecurityDriveFiles");
			if(null != query){
				results = (List<SecurityDriveFile>)query.getResultList();
			}
		}
		catch(NoResultException nre){
			log.info("No security drive files found.");
		}
		catch(Exception e){
			throw new DruidiaException(e.getMessage());
		}
		
		return results;
	}

	@Override
	public void deleteSecurityDriveFile(SecurityDriveFile securityDriveFile) throws DruidiaException {
		if(null == securityDriveFile || null == securityDriveFile.getId()){
			throw new DruidiaException("Security drive file to be deleted is invalid:"+securityDriveFile);
		}
			
		EntityManager em    = getEntityManager();								
		
		try{
			log.info("Attempting to delete security drive file: "+securityDriveFile,true);									
			SecurityDriveFile sdf = em.find(SecurityDriveFile.class, securityDriveFile.getId());
			if(null != sdf){										
				em.remove(sdf);		
				log.info("Delete of security drive file:"+securityDriveFile+" has been committed to database.");
			}
		}
		catch(Exception e){			
			throw new DruidiaException(e.getMessage());
		}		
	}
	
	*/
}
