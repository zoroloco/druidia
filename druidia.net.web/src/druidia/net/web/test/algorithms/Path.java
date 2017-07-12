package druidia.net.web.test.algorithms;

import java.util.LinkedList;

public class Path {
	private LinkedList<Integer> ll = new LinkedList<Integer>();
	
    private String path;

    public Path(String path) {
        this.path = path;
        
        
    }

    public String getPath() {
        return path;
    }

    public void cd(String newPath) {       
      if(newPath=="/"){
        this.path = newPath;
      }    
        
      if(newPath.matches("(\\.\\./)*(\\D)+")){
    	  String[] newPathHashed = newPath.split("../");
    	  String[] currentPathHashed = this.path.split("/");
    	  String newDir   = newPath.substring(newPath.lastIndexOf("/")+1,newPath.length());
    	  
    	  if(newPathHashed.length<=currentPathHashed.length){
    		  for(int i = 0; i < newPath.length(); i++){
        		  
        	  }  
    	  }
    	  else{
    		  path = "/";
    	  }
    	  
      }
        
        
    }

    public static void main(String[] args) {
        Path path = new Path("/a/b/c/d");
        path.cd("../x");
        System.out.println(path.getPath());
    }
}

