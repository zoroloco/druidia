package druidia.net.war.rest.json;

/**
 * This response pojo will be a wrapper for the json response of any http request to the restful api.
 * 
 * @author kcenturion
 *
 */

public class ResponsePayload {
	private int statusCode;
	private String errorMessage;
	
	public int getStatusCode() {
		return statusCode;
	}
	public void setStatusCode(int statusCode) {
		this.statusCode = statusCode;
	}
	public String getErrorMessage() {
		return errorMessage;
	}
	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}
	
}
