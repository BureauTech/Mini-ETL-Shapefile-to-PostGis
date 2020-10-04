package org.fatec.shapegis.controller;

import java.sql.SQLException;
import java.util.ArrayList;

import org.fatec.shapegis.dao.PostgisConnection;
import org.fatec.shapegis.model.FormConexao;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;




@CrossOrigin
@RestController //Declara que a classe controla requisições em Rest
public class ShapegisController {
	
	
	@GetMapping("/bomdia")
	public String bomdia() {
		return "bomdia";
	}
	
	@PostMapping(path="/connect",consumes="application/json")
	public String getConexao(@RequestBody FormConexao form) throws ClassNotFoundException, SQLException {
		//Abre conexao
		PostgisConnection conn = new PostgisConnection(form);
		//Testa o status da conexao
		String status = conn.status();
		//Fecha conexao
		conn.close();
		//Retorna o status da conexao
		return status;	
	}
	
	@PostMapping(path="/tables",consumes="application/json")
	public ArrayList<String> tables(@RequestBody FormConexao form) throws ClassNotFoundException, SQLException {
		ArrayList<String> tables = new ArrayList<String>();
		//Abre conexao
		PostgisConnection conn = new PostgisConnection(form);
		//Cria JsonArray para o retorno
		//Resgata os nomes das tabelas disponíveis no banco
		tables = conn.tables();
		//Fecha conexao
		conn.close();
		return tables;	
	}
	
	@PostMapping(path="/fields/{name}",consumes="application/json")
	public ArrayList<String> fields(@RequestBody FormConexao form, @PathVariable("name") String name) throws ClassNotFoundException, SQLException
	{
		ArrayList<String> fields = new ArrayList<String>();
		//Abre conexao
		PostgisConnection conn = new PostgisConnection(form);
		//Cria JsonArray para o retorno
		//Resgata os nomes das tabelas disponíveis no banco
		fields = conn.fields(name);
		//Fecha conexao
		conn.close();
		return fields;
	}
	
	/*@RequestMapping("/database")
	public List<String> getDataBase(@RequestParam String usuario, @RequestParam String senha, @RequestParam String endereco,
			@RequestParam int porta) {
		ShapegisConnection conn = new ShapegisConnection(usuario, senha, 
				"jdbc:postgresql://" + endereco + ":" + porta + "/" + usuario);
		conn.resultadosBanco(
				"SELECT datname FROM pg_database WHERE datname NOT LIKE 'postgres' \r\n"
						+ "AND datname NOT LIKE 'template%';");
		conn.FecharConexao();
		return conn.getResult();
	}
	
	//URL: http://localhost:8080/param/tabela?usuario=postgres&senha=postgres&endereco=localhost&porta=5432&database=db-pi
	@RequestMapping("/tabela")
	public List<String> getTabela(@RequestParam String usuario, @RequestParam String senha, @RequestParam String endereco,
			@RequestParam int porta, @RequestParam String database) {
		ShapegisConnection conn = new ShapegisConnection(usuario, senha, 
				"jdbc:postgresql://" + endereco + ":" + porta + "/" + database);
		conn.resultadosBanco(
				"SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' and table_name like 'ft%'");
		conn.FecharConexao();
		return conn.getResult();
	}
	
	//URL: http://localhost:8080/param/atributo?usuario=postgres&senha=postgres&endereco=localhost&porta=5432&database=db-pi&tabela=ft_bacia_hidrografica_n1
	@RequestMapping("/atributo")
	public List<String> getAtributo(@RequestParam String usuario, @RequestParam String senha, @RequestParam String endereco,
			@RequestParam int porta, @RequestParam String database, @RequestParam String tabela) {
		ShapegisConnection conn = new ShapegisConnection(usuario, senha, 
				"jdbc:postgresql://" + endereco + ":" + porta + "/" + database);
		conn.resultadosBanco(
				"SELECT column_name FROM information_schema.columns WHERE table_name = '"+ tabela +"'");
		conn.FecharConexao();
		return conn.getResult();
	}
	*/
}

