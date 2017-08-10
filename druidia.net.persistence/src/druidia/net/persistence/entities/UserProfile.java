package druidia.net.persistence.entities;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

import druidia.net.persistence.domain.entities.EntityBase;

@Entity
@Table(name="user_profile")
@NamedQueries({
	@NamedQuery(name="UserProfile.findById", query="SELECT p FROM user_profile p where p.id=:userProfileId")
})
public class UserProfile extends EntityBase implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 6859543691428523431L;

	private Integer mongo_user_id;
	private String  aboutMe;
	
	@Column(name="MONGO_USER_ID", nullable=false)
	public Integer getMongo_user_id() {
		return mongo_user_id;
	}
	public void setMongo_user_id(Integer mongo_user_id) {
		this.mongo_user_id = mongo_user_id;
	}
	
	@Column(name="ABOUT_ME", length=128)
	public String getAboutMe() {
		return aboutMe;
	}
	public void setAboutMe(String aboutMe) {
		this.aboutMe = aboutMe;
	}
	
}
