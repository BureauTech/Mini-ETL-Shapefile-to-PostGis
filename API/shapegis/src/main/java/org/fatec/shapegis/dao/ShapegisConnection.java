package org.fatec.shapegis.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import lombok.Data;

@Data // Adiciona os métodos get e set, com a biblioteca lombok
public class ShapegisConnection {
	public String status = "Não conectou...";

	private String driverName = "org.postgresql.Driver";
	private String url;
	private String serverLocal;
	private String dataBase;
	private String usuario;
	private String senha;
	private int porta;

	private List<String> result = new ArrayList<>();
	
	public ShapegisConnection(String usuario, String senha, String url) {
		super();
		this.usuario = usuario;
		this.senha = senha;
		this.url = url;
	}
	
	// Método de Conexão//
	public java.sql.Connection getConexao() {

		Connection connection = null; // Variável de referência do tipo Connection

		try {

			// Carregando o JDBC Driver padrão
			Class.forName(this.driverName);

			// padrão --> jdbc:postgresql://host:port/database
			connection = DriverManager.getConnection(this.url, this.usuario, this.senha);

			// Testa sua conexão//
			if (connection != null) {
				System.out.println("STATUS--->Conectado com sucesso!");
				this.status = "STATUS--->Conectado com sucesso!";
			} else {
				System.out.println("STATUS--->Não foi possivel realizar conexão.");
				this.status = "STATUS--->Não foi possivel realizar conexão";
			}
			return connection;
		} catch (ClassNotFoundException e) { // Driver não encontrado
			e.printStackTrace(System.err);
			return null;
		} catch (SQLException e) { // Não conseguindo se conectar ao banco
			e.printStackTrace(System.err);
			return null;
		}
	}

	// Método que retorna o status da sua conexão//
	public String statusConection() {

		return status;

	}

	// Método que fecha sua conexão//
	public boolean FecharConexao() {
		try {
			getConexao().close();
			System.out.println("Fechado...");
			return true;

		} catch (SQLException e) {
			return false;

		}

	}

	// Método que reinicia sua conexão//
	public java.sql.Connection ReiniciarConexaoComDB() {
		FecharConexao();
		System.out.println("Reiniciando conexão...");
		return getConexao();

	}
	
	
	public void resultadosBanco(String query) {
		try {

			// Perguntar ao professor, prq usar <java.sql.Statement> em vez de só
			// <Statement>
			java.sql.Statement stmt = getConexao().createStatement();
			java.sql.ResultSet rs = stmt.executeQuery(query);

			while (rs.next()) {
				this.result.add(rs.getString(1));
			}
			stmt.close();
			rs.close();

		} catch (SQLException e) {
			e.printStackTrace(System.err);
		}
	}
}
