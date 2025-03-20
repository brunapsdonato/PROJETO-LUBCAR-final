package payroll;

import java.util.Date;
import java.util.Objects;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Servico {
    private @Id @GeneratedValue Long id;
	private Date data;
	private String servico;
	private double valor;

    @ManyToOne
    private Cliente cliente;

    // Default constructor
    public Servico() {}

    // Constructor with all fields
    public Servico(Long id, Date data, String servico, double valor, Cliente cliente) {
        this.id = id;
        this.data = data;
        this.servico = servico;
        this.valor = valor;
        this.cliente = cliente;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public double getValor() {
        return valor;
    }

    public void setValor(double valor) {
        this.valor = valor;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    // hashCode
    @Override
    public int hashCode() {
        return Objects.hash(id, data, servico, valor, cliente);
    }

    // equals
    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Servico servico1 = (Servico) obj;
        return Double.compare(servico1.valor, valor) == 0 &&
               Objects.equals(id, servico1.id) &&
               Objects.equals(data, servico1.data) &&
               Objects.equals(servico, servico1.servico) &&
               Objects.equals(cliente, servico1.cliente);
    }

    // toString
    @Override
    public String toString() {
        return "Servico{" +
               "id=" + id +
               ", data=" + data +
               ", servico='" + servico + '\'' +
               ", valor=" + valor +
               ", cliente=" + cliente +
               '}';
    }
}
