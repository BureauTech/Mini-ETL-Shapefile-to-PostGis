package org.fatec.shapegis.functions;

import java.io.File;

public class DeletarArquivos {
	public static void Pasta(File dir) {
		// colocando os arquivos em um vetor.
		File[] files = dir.listFiles(File::isFile);

		for (File f : files) {
			// deletando os arquivos
			f.delete();
		}
	}
}