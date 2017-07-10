package druidia.net.web.rest;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import druidia.net.web.rest.json.RequestPayload;
import druidia.net.web.rest.json.ResponsePayload;

@Path("/user-profile")
public class RestUserProfile {
	
	//@EJB
	//private UserProfileDataService userProfileSvc;

	/**
	 * 
	 * Will fetch a user profile based off the given params.
	 */
	@GET
	@Path("/get/{user-id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getUserProfile(@PathParam("user-id") String userId){
		System.out.println("getUserProfile get request has user id:"+userId);
		
		return Response.ok(new ResponsePayload(),MediaType.APPLICATION_JSON).build();
	}
	
	/**
	 * You can hit this with postman by setting body with:
	 * {"requestType":"get-state"}
	 * Also set the header to Content-Type application/json
	 * 
	 * This method will accept the user profile and persist it.
	 * 
	 * A post will create a user profile for the first time.
	 */
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/post")	
    public Response postUserProfile(RequestPayload requestPayload, @Context HttpServletRequest req){
		String remoteIP = req.getRemoteAddr();
		System.out.println("Request to /get-states came from remote IP:"+remoteIP);
		System.out.println("Got payload:"+requestPayload.getRequestType());
		
		ResponsePayload responsePayload = new ResponsePayload();
		responsePayload.setStatusCode(200);
		responsePayload.setErrorMessage("no back end connection yet!");
		
		return Response.ok(responsePayload,MediaType.APPLICATION_JSON).build();
	}
	
	/**
	 * updates a user profile.
	 * 
	 * @param requestPayload
	 * @return
	 */
	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/put")
	public Response putUserProfile(RequestPayload requestPayload){
		
		
		return null;
	}	
	
	@DELETE
	@Produces(MediaType.TEXT_PLAIN)
	@Path("/delete")
	public Response deleteUserProfile(){
		
		return null;
	}
}
