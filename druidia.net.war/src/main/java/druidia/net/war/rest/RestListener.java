package druidia.net.war.rest;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import druidia.net.war.rest.json.RequestPayload;
import druidia.net.war.rest.json.ResponsePayload;

@Path("/api")
public class RestListener {

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/post-user-profile")
	/**
	 * You can hit this with postman by setting body with:
	 * {"requestType":"get-state"}
	 * Also set the header to Content-Type application/json
	 * 
	 * This method will accept the user profile and persist it.
	 * 
	 */
    public Response postUserProfile(RequestPayload requestPayload, @Context HttpServletRequest req){
		String remoteIP = req.getRemoteAddr();
		System.out.println("Request to /get-states came from remote IP:"+remoteIP);
		System.out.println("Got payload:"+requestPayload.getRequestType());
		
		ResponsePayload responsePayload = new ResponsePayload();
		responsePayload.setStatusCode(200);
		responsePayload.setErrorMessage("no back end connection yet!");
		
		return Response.ok(responsePayload,MediaType.APPLICATION_JSON).build();
	}
		
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/get-states")
	public Response getStates(){
		
		return Response.ok(new ResponsePayload(),MediaType.APPLICATION_JSON).build();
	}
}
