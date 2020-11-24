package org.fatec.shapegis.functions;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

public class Compactador {
	
	static String result = null;
	
	static final String separador = System.getProperty("file.separator");
	static final String local = System.getProperty("user.home");
	static final String tmp = separador + "ShapeGIS" + separador + "tmp";
	
	static final int TAMANHO_BUFFER = 4096;

	public static String compactarParaZip(String nomeArq) throws Exception {
		int cont;
		final byte[] dados = new byte[TAMANHO_BUFFER];
		
		File dir = new File(local + tmp + separador + "PostToShape" + separador);
		File[] files = dir.listFiles(File::isFile);

		FileOutputStream destino;
		ZipOutputStream saida = null;

		try {
			destino = new FileOutputStream(new File(local + tmp + separador + "PostToShape" + separador + nomeArq + ".zip"));
			saida = new ZipOutputStream(new BufferedOutputStream(destino));
			result = (local + tmp + separador + "PostToShape" + separador + nomeArq + ".zip");
		} catch (Exception e) {
			System.err.println(e.getMessage());
			result = e.getMessage();
		}
		for (final File arqEntrada : files) {
			try {
				final FileInputStream streamDeEntrada = new FileInputStream(arqEntrada);
				final BufferedInputStream origem = new BufferedInputStream(streamDeEntrada, TAMANHO_BUFFER);
				final ZipEntry entry = new ZipEntry(arqEntrada.getName());
				saida.putNextEntry(entry);

				while ((cont = origem.read(dados, 0, TAMANHO_BUFFER)) != -1) {
					saida.write(dados, 0, cont);
				}
				origem.close();
			} catch (Exception e) {
				System.err.println(e.getMessage());
				result = e.getMessage();
			}
		}

		saida.close();
		return result;
	}
}