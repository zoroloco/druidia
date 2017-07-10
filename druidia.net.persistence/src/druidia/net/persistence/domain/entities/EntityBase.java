package druidia.net.persistence.domain.entities;

import static javax.persistence.GenerationType.IDENTITY;

/**
 * 
 * This is the base class for all persisted entities.
 */

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@MappedSuperclass
public class EntityBase implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -137847505056489077L;
	
	private Integer id;
	private String  createdBy;
	private Date    createdTime;
	private String  modifiedBy;
	private Date    modifiedTime;
	
	@Id
	@GeneratedValue(strategy=IDENTITY)
	@Column(name="ID", unique=true, nullable=false)
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	
	@Column(name="CREATED_BY", length=45,nullable=false)
	public String getCreatedBy() {
		return createdBy;
	}
	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="CREATED_DATE", nullable=false)
	public Date getCreatedTime() {
		return createdTime;
	}
	public void setCreatedTime(Date createdTime) {
		this.createdTime = createdTime;
	}
	
	@Column(name="MODIFIED_BY", length=45)
	public String getModifiedBy() {
		return modifiedBy;
	}
	public void setModifiedBy(String modifiedBy) {
		this.modifiedBy = modifiedBy;
	}
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="MODIFIED_DATE", nullable=false)
	public Date getModifiedTime() {
		return modifiedTime;
	}
	public void setModifiedTime(Date modifiedTime) {
		this.modifiedTime = modifiedTime;
	}
}
