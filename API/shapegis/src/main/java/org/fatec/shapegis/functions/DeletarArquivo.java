package org.fatec.shapegis.functions;

import java.io.File;

public class DeletarArquivo {
	//deleta todos os arquivos com o nome guardado em "arq".
	public static void DelArq (File dir, String arq) {		 		
		
		File[] files = dir.listFiles(File::isFile);
		
		for (File f : files) {
			//pega somente o nome do arquivo sem sua extensão
			// e compara com "arq" para deletar.
			if(f.getName().substring(0, f.getName().indexOf(".")).equals(arq)) {
				f.delete();
			}
		}
	}
}