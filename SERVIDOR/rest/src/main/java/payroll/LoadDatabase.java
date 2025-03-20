package payroll;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Date;

@Configuration
class LoadDatabase {

	private static final Logger log = LoggerFactory.getLogger(LoadDatabase.class);

	@Bean
	CommandLineRunner initDatabase(ClienteRepository repository, ServicoRepository servicoRepository) {

		return args -> {
			Cliente bruna=new Cliente(null, "firebase1", "Bruna Pri", "Toyota Corolla", 2020, new Date(), "Oil Change", "12345678901", "lucas@example.com", 300.0);
			log.info("Preloading " + repository.save(bruna));
			log.info("Preloading " + repository.save(new Cliente(null, "firebase2", "Maria Silva", "Honda Civic", 2018, new Date(), "Tire Replacement", "98765432100", "maria@example.com", 500.0)));
			log.info("Preloading " + repository.save(new Cliente(null, "firebase3", "João Souza", "Ford Focus", 2019, new Date(), "Brake Repair", "45678912300", "joao@example.com", 700.0)));
			log.info("Preloading " + repository.save(new Cliente(null, "firebase4", "Ana Costa", "Chevrolet Cruze", 2021, new Date(), "Battery Replacement", "32165498700", "ana@example.com", 400.0)));
			log.info("Preloading " + repository.save(new Cliente(null, "firebase5", "Carlos Lima", "Volkswagen Jetta", 2022, new Date(), "Engine Check", "65498732100", "carlos@example.com", 1000.0)));
		

			log.info("Preloading servico for bruna" + servicoRepository.save(new Servico(null, new Date(), "troca de oleo", 300.0, bruna)));
			log.info("Preloading servico for bruna" + servicoRepository.save(new Servico(null, new Date(), "troca de PNEU", 344.0, bruna)));
			log.info("Preloading servico for bruna" + servicoRepository.save(new Servico(null, new Date(), "troca de FILTRO", 999.0, bruna)));

		};
	}
}
