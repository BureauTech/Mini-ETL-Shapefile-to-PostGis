package org.fatec.shapegis.controller;

import java.io.File;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.fatec.shapegis.dao.PostgisConnection;
import org.fatec.shapegis.model.FormConexao;
import org.geotools.data.FileDataStore;
import org.geotools.data.FileDataStoreFinder;
import org.geotools.data.Query;
import org.geotools.data.simple.SimpleFeatureSource;
import org.geotools.feature.FeatureCollection;
import org.geotools.feature.FeatureIterator;
import org.opengis.feature.Property;
import org.opengis.feature.simple.SimpleFeature;
import org.opengis.feature.simple.SimpleFeatureType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin
@RestController // Declara que a classe controla requisições em Rest
public class ShapegisController {
	String separador = System.getProperty("file.separator");
	String local = System.getProperty("user.home");

	@GetMapping("/bomdia")
	public String bomdia() {
		return "bomdia";
	}

	@PostMapping(path = "/connect/postgres", consumes = "application/json", produces = "application/json")
	public Map<String, String> postgres(@RequestBody FormConexao form) throws ClassNotFoundException, SQLException {
		// Declara as ArrayLists para receber as databases
		ArrayList<String> databases = new ArrayList<String>();
		// Declara o ArrayList de retorno
		HashMap<String, String> map = new HashMap<String, String>();
		// Inicializa o objeto de clase PostgisConnection
		PostgisConnection conn = new PostgisConnection(form);
		// Abre conexão com o Postgres
		conn.connectToPostgres();
		
		// Resgata a lista de databases existente no Postgres conectado
		databases = conn.databases();
		
		// Cria o objeto Json para retorno
		map.put("databases", databases.toString()); // {"databases": "[...]"}
		
		// Fecha a conexão
		conn.close();
		
		// Retorna objeto Json
		return map;
	}

	@PostMapping(path = "/connect/database", consumes = "application/json", produces = "application/json")
	public Map<String, String> database(@RequestBody FormConexao form) throws ClassNotFoundException, SQLException {
		// Declara as ArrayLists para receber as tabelas e campos
		ArrayList<String> tables = new ArrayList<String>();
		// Declara o ArrayList de retorno
		HashMap<String, String> map = new HashMap<String, String>();
		// Inicializa o objeto de clase PostgisConnection
		PostgisConnection conn = new PostgisConnection(form);
		// Abre conexão com a database especificada
		conn.connectToDatabase();

		// Resgata os nomes das tabelas
		tables = conn.tables();
		// Cria o Json para o retorno
		for (String t : tables) {
			map.put(t, conn.fields(t).toString());
		}
		// Fecha conexao
		conn.close();
		
		// Retorna o Json
		return map;
	}

	// Upload dos arquivos
	// Recebendo um arquivo de cada vez
	@PostMapping(path = "/upload", consumes = "multipart/form-data", produces = "application/json")
	public ArrayList<String> upload(@RequestParam(value = "file") MultipartFile file) throws IOException {

		File dir = new File(local + separador + "ShapeGIS" + separador + "tmp");
		dir.mkdirs();

		File f = new File(dir.toString(), file.getOriginalFilename());

		// Verificando a extensão do arquivo
		String fileName = f.toString();
		int index = fileName.lastIndexOf('.');
		String extension = fileName.substring(index + 1);

		// Salva o arquivo no diretório temporário
		try {
			file.transferTo(f);
			// Transfer or Saving in local memory
		} catch (IllegalStateException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

		// Se a extensão for shp
		if (extension.equals("shp")) {
		
		}

		// Retorna null caso o arquivo não seja .shp
		return null;
	}
	
	@GetMapping("atributes/{file}")
	public Map<String, String> atributosArquivo(String file) throws IOException{
		
		File f = new File(local + separador + "ShapeGIS" + separador + "tmp" + separador + file);
		// Processa o arquivo e retorna os campos
		ArrayList<String> fields = new ArrayList<String>();
		FileDataStore myData = FileDataStoreFinder.getDataStore(f);
		SimpleFeatureSource source = myData.getFeatureSource();
		SimpleFeatureType schema = source.getSchema();

		Query query = new Query(schema.getTypeName());
		query.setMaxFeatures(1);

		FeatureCollection<SimpleFeatureType, SimpleFeature> collection = source.getFeatures(query);
		try (FeatureIterator<SimpleFeature> features = collection.features()) {
			while (features.hasNext()) {
				SimpleFeature feature = features.next();

				for (Property attribute : feature.getProperties()) {
					fields.add(attribute.getName().toString());
				}
			}
		}
		
		HashMap<String, String> map = new HashMap<String, String>();
		map.put("atributes", fields.toString());
		
		return map;
		
	}
	
}

// Old code
//------------------------------------------------------------------------------
/*
 * 
 * @PostMapping(path = "/tables", consumes = "application/json") public
 * ArrayList<String> tables(@RequestBody FormConexao form) throws
 * ClassNotFoundException, SQLException { ArrayList<String> tables = new
 * ArrayList<String>(); // Abre conexao PostgisConnection conn = new
 * PostgisConnection(form); // Cria JsonArray para o retorno // Resgata os nomes
 * das tabelas disponíveis no banco tables = conn.tables(); // Fecha conexao
 * conn.close(); return tables; }
 * 
 * @PostMapping(path = "/fields/{name}", consumes = "application/json") public
 * ArrayList<String> fields(@RequestBody FormConexao form, @PathVariable("name")
 * String name) throws ClassNotFoundException, SQLException { ArrayList<String>
 * fields = new ArrayList<String>(); // Abre conexao PostgisConnection conn =
 * new PostgisConnection(form); // Cria JsonArray para o retorno // Resgata os
 * campos da tabela especificada fields = conn.fields(name); // Fecha conexao
 * conn.close(); return fields; }
 * 
 * 
 * // Recebendo multiplos arquivos
 * 
 * @PostMapping(path = "/upload", consumes = "multipart/form-data", produces =
 * "application/json") public ArrayList<String> upload(@RequestParam(value =
 * "file") MultipartFile[] files) throws IOException {
 * 
 * File shp = null;
 * 
 * File d = new File(local + separador + "ShapeGIS" + separador + "tmp");
 * d.mkdirs();
 * 
 * // Salvando arquivos for (MultipartFile file : files) { File f = new
 * File(d.toString(), file.getOriginalFilename()); System.out.println(f); try {
 * file.transferTo(f); // Transfer or Saving in local memory } catch
 * (IllegalStateException e) { e.printStackTrace(); } catch (IOException e) {
 * e.printStackTrace(); }
 * 
 * String fileName = f.toString(); int index = fileName.lastIndexOf('.'); String
 * extension = fileName.substring(index + 1); if (extension.equals("shp")) { shp
 * = new File(d.toString(), file.getOriginalFilename()); } }
 * 
 * // Leitura dos arquivos ArrayList<String> fields = new ArrayList<String>();
 * FileDataStore myData = FileDataStoreFinder.getDataStore(shp);
 * SimpleFeatureSource source = myData.getFeatureSource(); SimpleFeatureType
 * schema = source.getSchema();
 * 
 * Query query = new Query(schema.getTypeName()); query.setMaxFeatures(1);
 * 
 * FeatureCollection<SimpleFeatureType, SimpleFeature> collection =
 * source.getFeatures(query); try (FeatureIterator<SimpleFeature> features =
 * collection.features()) { while (features.hasNext()) { SimpleFeature feature =
 * features.next();
 * 
 * for (Property attribute : feature.getProperties()) {
 * fields.add(attribute.getName().toString()); } } }
 * 
 * for (MultipartFile file : files) { try { ((File) file).delete(); // deletando
 * os arquivos } catch (Exception e) { e.printStackTrace();
 * 
 * }
 * 
 * } return fields; }
 */

/*
 * @RequestMapping("/database") public List<String> getDataBase(@RequestParam
 * String usuario, @RequestParam String senha, @RequestParam String endereco,
 * 
 * @RequestParam int porta) { ShapegisConnection conn = new
 * ShapegisConnection(usuario, senha, "jdbc:postgresql://" + endereco + ":" +
 * porta + "/" + usuario); conn.resultadosBanco(
 * "SELECT datname FROM pg_database WHERE datname NOT LIKE 'postgres' \r\n" +
 * "AND datname NOT LIKE 'template%';"); conn.FecharConexao(); return
 * conn.getResult(); }
 * 
 * //URL:
 * http://localhost:8080/param/tabela?usuario=postgres&senha=postgres&endereco=
 * localhost&porta=5432&database=db-pi
 * 
 * @RequestMapping("/tabela") public List<String> getTabela(@RequestParam String
 * usuario, @RequestParam String senha, @RequestParam String endereco,
 * 
 * @RequestParam int porta, @RequestParam String database) { ShapegisConnection
 * conn = new ShapegisConnection(usuario, senha, "jdbc:postgresql://" + endereco
 * + ":" + porta + "/" + database); conn.resultadosBanco(
 * "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' and table_name like 'ft%'"
 * ); conn.FecharConexao(); return conn.getResult(); }
 * 
 * //URL:
 * http://localhost:8080/param/atributo?usuario=postgres&senha=postgres&endereco
 * =localhost&porta=5432&database=db-pi&tabela=ft_bacia_hidrografica_n1
 * 
 * @RequestMapping("/atributo") public List<String> getAtributo(@RequestParam
 * String usuario, @RequestParam String senha, @RequestParam String endereco,
 * 
 * @RequestParam int porta, @RequestParam String database, @RequestParam String
 * tabela) { ShapegisConnection conn = new ShapegisConnection(usuario, senha,
 * "jdbc:postgresql://" + endereco + ":" + porta + "/" + database);
 * conn.resultadosBanco(
 * "SELECT column_name FROM information_schema.columns WHERE table_name = '"+
 * tabela +"'"); conn.FecharConexao(); return conn.getResult(); }
 */
