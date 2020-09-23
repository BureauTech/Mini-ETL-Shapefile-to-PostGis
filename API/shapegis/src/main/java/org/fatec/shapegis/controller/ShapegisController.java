package org.fatec.shapegis.controller;

import org.fatec.shapegis.dao.ShapegisConnection;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;



@RestController // Serve para dizer que se trata de um controlador, que vai gerar serviços para o projeto.
@RequestMapping("/param") // () este parâmetro é utilizado para referenciar, como chamar este projeto em outro contexto.
public class ShapegisController {
	
	// Transformar um método em um serviço
	// () este método deverá ser chamado por /database.
	
	// URL: http://localhost:8080/param/database?usuario=postgres&senha=postgres&endereco=localhost&porta=5432
	@RequestMapping("/database")
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
}
