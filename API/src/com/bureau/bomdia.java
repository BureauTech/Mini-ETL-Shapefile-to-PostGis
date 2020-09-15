package com.bureau;

import javax.ws.rs.GET;
import javax.ws.rs.Path;

@Path("bomdia")
public class bomdia {
	
	@GET
	public String dizerBomDia() {
		return "Bom dia";
		
	}
}
