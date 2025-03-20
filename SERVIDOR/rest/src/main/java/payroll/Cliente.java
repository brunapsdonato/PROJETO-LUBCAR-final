package payroll;

import java.util.Date;
import java.util.Objects;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
class Cliente {

	private @Id @GeneratedValue Long id;
	private String firebaseId;
	private String nome;
	private String carroModelo;
	private int ano;
	private Date data;
	private String servico;
	private String cpf;
	private String email;
	private double valor;

	public Cliente() {
	}

	// Constructor with all fields
	public Cliente(Long id, String firebaseId, String nome, String carroModelo, int ano, Date data, String servico, String cpf, String email, double valor) {
		this.id = id;
		this.firebaseId = firebaseId;
		this.nome = nome;
		this.carroModelo = carroModelo;
		this.ano = ano;
		this.data = data;
		this.servico = servico;
		this.cpf = cpf;
		this.email = email;
		this.valor = valor;
	}

	// Getters and Setters
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFirebaseId() {
		return firebaseId;
	}

	public void setFirebaseId(String firebaseId) {
		this.firebaseId = firebaseId;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getCarroModelo() {
		return carroModelo;
	}

	public void setCarroModelo(String carroModelo) {
		this.carroModelo = carroModelo;
	}

	public int getAno() {
		return ano;
	}

	public void setAno(int ano) {
		this.ano = ano;
	}

	public Date getData() {
		return data;
	}

	public void setData(Date data) {
		this.data = data;
	}

	public String getServico() {
		return servico;
	}

	public void setServico(String servico) {
		this.servico = servico;
	}

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public double getValor() {
		return valor;
	}

	public void setValor(double valor) {
		this.valor = valor;
	}

	// equals and hashCode
	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;
		Cliente cliente = (Cliente) o;
		return ano == cliente.ano &&
				Double.compare(cliente.valor, valor) == 0 &&
				Objects.equals(id, cliente.id) &&
				Objects.equals(firebaseId, cliente.firebaseId) &&
				Objects.equals(nome, cliente.nome) &&
				Objects.equals(carroModelo, cliente.carroModelo) &&
				Objects.equals(data, cliente.data) &&
				Objects.equals(servico, cliente.servico) &&
				Objects.equals(cpf, cliente.cpf) &&
				Objects.equals(email, cliente.email);
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, firebaseId, nome, carroModelo, ano, data, servico, cpf, email, valor);
	}
}
