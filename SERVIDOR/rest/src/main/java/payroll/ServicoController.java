package payroll;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.hateoas.EntityModel;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

// tag::hateoas-imports[]
// end::hateoas-imports[]

@RestController
class ServicoController {

	private final ServicoRepository repository;

	ServicoController(ServicoRepository repository) {
		this.repository = repository;
	}

	// Aggregate root

	// tag::get-aggregate-root[]
	@GetMapping("/servicos/cliente/{clienteId}")
	@CrossOrigin(origins = "http://localhost:4200")
	List<EntityModel<Servico>> all(@PathVariable Long clienteId) {

		List<EntityModel<Servico>> clientes = repository.findByClienteId(clienteId).stream()
				.map(cliente -> EntityModel.of(cliente))
				.collect(Collectors.toList());

		return clientes;
	}
	// end::get-aggregate-root[]

	@PostMapping("/servicos")
	@CrossOrigin(origins = "http://localhost:4200")
	Servico newServico(@RequestBody Servico servico) {
		return repository.save(servico);
	}

	// Single item

	// tag::get-single-item[]
	@GetMapping("/servicos/{id}")
	@CrossOrigin(origins = "http://localhost:4200")
	EntityModel<Servico> one(@PathVariable Long id) {

		Servico cliente = repository.findById(id) //
				.orElseThrow(() -> new ClienteNotFoundException(id));

		return EntityModel.of(cliente);
	}
	// end::get-single-item[]

	@PutMapping("/servicos/{id}")
	@CrossOrigin(origins = "http://localhost:4200")
	Servico replaceServico(@RequestBody Servico newServico, @PathVariable Long id) {

		return repository.findById(id) //
				.map(servico -> {
                    servico.setCliente(newServico.getCliente());
					servico.setData(newServico.getData());
					servico.setServico(newServico.getServico());
					servico.setValor(newServico.getValor());
					return repository.save(newServico);
				}) //
				.orElseGet(() -> {
					return repository.save(newServico);
				});
	}

	@DeleteMapping("/servicos/{id}")
	@CrossOrigin(origins = "http://localhost:4200")
	void deleteServico(@PathVariable Long id) {
		repository.deleteById(id);
	}
}
