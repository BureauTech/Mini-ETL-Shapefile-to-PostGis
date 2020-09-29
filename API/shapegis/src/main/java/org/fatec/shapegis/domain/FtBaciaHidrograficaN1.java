package org.fatec.shapegis.domain;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FtBaciaHidrograficaN1 {
	private int bhi_cd;
	private String bhi_cd_otto;
	private Double bhi_ar;
	private String geom;
	
}
