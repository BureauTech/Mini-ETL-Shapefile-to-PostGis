package org.fatec.shapegis.controller;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.fatec.shapegis.dao.PostgisConnection;
import org.fatec.shapegis.functions.Compactador;
import org.fatec.shapegis.functions.DeletarArquivo;
import org.fatec.shapegis.model.FormConexao;
import org.fatec.shapegis.model.FormPostgisParaShape;
import org.fatec.shapegis.model.FormShapeParaPostgis;
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
import org.springframework.web.bind.annotation.PathVariable;
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
	String tmp = separador + "ShapeGIS" + separador + "tmp";

	@GetMapping("/bomdia")
	public String bomdia() {
		return "bomdia";
	}

	@GetMapping("/tmp")
	public String userTemp() {
		return System.getProperty("java.io.tmpdir");
	}

	@PostMapping(path = "/connect/postgres", consumes = "application/json", produces = "application/json")
	public ArrayList<String> postgres(@RequestBody FormConexao form) throws ClassNotFoundException, SQLException {
		// Declara as ArrayLists para receber as databases
		ArrayList<String> databases = new ArrayList<String>();

		// Inicializa o objeto de clase PostgisConnection
		PostgisConnection conn = new PostgisConnection(form);
		// Abre conexão com o Postgres
		conn.connectToPostgres();

		// Resgata a lista de databases existente no Postgres conectado
		databases = conn.databases();

		// Fecha a conexão
		conn.close();

		// Retorna objeto Json
		return databases;
	}

	@PostMapping(path = "/connect/database", consumes = "application/json", produces = "application/json")
	public ArrayList<String> database(@RequestBody FormConexao form) throws ClassNotFoundException, SQLException {
		// Declara as ArrayLists para receber as tabelas e campos
		ArrayList<String> tables = new ArrayList<String>();
		// Inicializa o objeto de clase PostgisConnection
		PostgisConnection conn = new PostgisConnection(form);
		// Abre conexão com a database especificada
		conn.connectToDatabase();

		// Resgata os nomes das tabelas
		tables = conn.tables();
		// Cria o Json para o retorno
		// Fecha conexao
		conn.close();

		// Retorna o Json
		return tables;
	}

	// Upload dos arquivos
	// Recebendo um arquivo de cada vez

	@PostMapping(path = "/upload", consumes = "multipart/form-data", produces = "application/json")
	public ArrayList<String> uploadShapeToPost(@RequestParam(value = "file") MultipartFile file) throws IOException {

		File dir = new File(local + tmp + separador + "ShapeToPost");
		dir.mkdirs();

		File f = new File(dir, file.getOriginalFilename());

		/*
		 * Verificando a extensão do arquivo String fileName = f.toString(); int index =
		 * fileName.lastIndexOf('.'); String extension = fileName.substring(index + 1);
		 */

		// Salva o arquivo no diretório temporário
		try {
			// Transfer or Saving in local memory
			file.transferTo(f);
		} catch (IllegalStateException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

		// Retorna null caso o arquivo não seja .shp
		return null;
	}

	@PostMapping(path = "/upload/postgis-to-shape", consumes = "multipart/form-data", produces = "application/json")
	public ArrayList<String> uploadPostToShape(@RequestParam(value = "file") MultipartFile file) throws IOException {

		File dir = new File(local + tmp + separador + "PostToShape");
		dir.mkdirs();

		File f = new File(dir, file.getOriginalFilename());

		/*
		 * Verificando a extensão do arquivo String fileName = f.toString(); int index =
		 * fileName.lastIndexOf('.'); String extension = fileName.substring(index + 1);
		 */

		// Salva o arquivo no diretório temporário
		try {
			// Transfer or Saving in local memory
			file.transferTo(f);
		} catch (IllegalStateException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

		// Retorna null caso o arquivo não seja .shp
		return null;
	}

	@PostMapping(path = "/fields/{name}", consumes = "application/json")
	public ArrayList<String> fields(@RequestBody FormConexao form, @PathVariable("name") String name)
			throws ClassNotFoundException, SQLException {
		// Declarando ArrayList para retorno
		ArrayList<String> fields = new ArrayList<String>();
		// Inicia o objeto de conexão
		PostgisConnection conn = new PostgisConnection(form);
		// Abre conexão com o banco de dados
		conn.connectToDatabase();
		fields = conn.fields(name);
		// Fecha conexao
		conn.close();
		// Retorna os campos do arquivo
		return fields;
	}

	@GetMapping("attributes/{file}")
	public ArrayList<String> atributosArquivo(@PathVariable("file") String file) throws IOException {
		// Declara o caminho do arquivo
		File f = new File(
				local + separador + "ShapeGIS" + separador + "tmp" + separador + "ShapeToPost" + separador + file);
		// Declara o ArrayList
		ArrayList<String> fields = new ArrayList<String>();

		// Processa o arquivo
		// -----------------------------------------------------------
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
		// -----------------------------------------------------------

		// Retorna os campos
		return fields;

	}

	@PostMapping(path = "/shape-to-postgis", consumes = "application/json")
	public Integer shapeToPostgis(@RequestBody FormShapeParaPostgis form) throws Exception {
		int result = 0;
		String atributo;
		String valor;
		HashMap<String, String> depara = new HashMap<>();

		for (Map.Entry<String, String> entrada : form.map.entrySet()) {
			if (!entrada.getValue().equals("Para")) {
				depara.put(entrada.getKey(), entrada.getValue());
			}
		}
		HashMap<String, Object> tmpAtts;

		// File dir = new File(local + separador + "ShapeGIS" + separador + "tmp" +
		// separador);
		// DeletarArquivos.Pasta(dir);

		File f = new File(
				local + separador + "ShapeGIS" + separador + "tmp" + separador + "ShapeToPost" + separador + form.file);
		FileDataStore myData = FileDataStoreFinder.getDataStore(f);
		SimpleFeatureSource source = myData.getFeatureSource();
		SimpleFeatureType schema = source.getSchema();

		Query query = new Query(schema.getTypeName());
		query.setMaxFeatures(5);

		FeatureCollection<SimpleFeatureType, SimpleFeature> collection = source.getFeatures(query);
		try (FeatureIterator<SimpleFeature> features = collection.features()) {
			while (features.hasNext()) {
				atributo = new String();
				valor = new String();
				tmpAtts = new HashMap<>();

				SimpleFeature feature = features.next();
				for (Property attribute : feature.getProperties()) {
					tmpAtts.put(attribute.getName().toString(), attribute.getValue());
				}

				for (Map.Entry<String, String> entrada : depara.entrySet()) {
					atributo += entrada.getKey() + " ,";
					valor += "'" + tmpAtts.get("" + entrada.getValue() + "") + "',";
				}

				if (atributo.length() > 0 && valor.length() > 0) {
					atributo = atributo.substring(0, atributo.length() - 1);
					valor = valor.substring(0, valor.length() - 1);
				}

				String sqlQuery = "INSERT INTO " + form.tabela + "(" + atributo + ") VALUES (" + valor + ");";
				PostgisConnection conn = new PostgisConnection(form.host, form.porta, form.bd, form.usuario,
						form.senha);
				conn.connectToDatabase();
				result = conn.gravarDados(sqlQuery);
				conn.close();
			}
		}

		File dir = new File(local + separador + "ShapeGIS" + separador + "tmp" + separador);
		DeletarArquivo.DelArq(dir, form.file);

		return result;
	}

	@PostMapping(path = "/postgis-to-shape")
	public String PostgisToShape(@RequestBody FormPostgisParaShape form) throws Exception {
		// Inicia a variável de retorno
		String result = null;

		// Declara o caminho do diretório de saída
		String dir = local + tmp + separador + "PostToShape" + separador;

		// Cria diretório se já não existir
		File fileDir = new File(tmp);
		fileDir.mkdirs();

		// Declara qual o processo a ser executado no comando
		String process = "pgsql2shp";
		// Controi a String do comando
		String command = process + "-f" + dir + form.tabela // -f para nome do arquivo de saida
				+ "-h" + form.host // -h para host
				+ "-p" + form.porta // -p para porta
				+ "-u" + form.usuario // -u para usuário
				+ "-P" + form.senha // -P para senha
				+ " " + form.bd // espaço, nome do banco
				+ " " + "public." + form.tabela; // espaço, schema.tabela

		// Executa o commando no CMD do runtime que a aplicação está rodando, no
		// diretório de instalação
		// do PostgreSQL
		Process p = Runtime.getRuntime().exec("cmd cmd.exe /c " + command, null,
				new File("C:\\Program Files\\PostgreSQL\\10\\bin"));

		// Printa o comando no console (teste)
		System.out.println(command);

		// Recupera as mensagens geradas pela execução do processo
		BufferedReader stdInput = new BufferedReader(new InputStreamReader(p.getInputStream()));
		BufferedReader stdError = new BufferedReader(new InputStreamReader(p.getErrorStream()));

		// Printa no console as mensagens
		// Em caso de erro é devolvida a mensagem como resposta da requisição
		String output;
		while ((output = stdInput.readLine()) != null) {
			System.out.println(output);
		}
		while ((output = stdError.readLine()) != null) {
			System.out.println(output);
			result = result + output;
		}
		p.waitFor();

		try {
			result = Compactador.compactarParaZip(form.tabela);
		} catch (IOException e) {
			e.printStackTrace();
		}

		// Sinaliza que o processo terminou
		System.out.println("Process finished !\n");
		
		// Retorna String como nula ou, em caso de erro, com a mensagem gerada pelo
		// processo
		return result;
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
