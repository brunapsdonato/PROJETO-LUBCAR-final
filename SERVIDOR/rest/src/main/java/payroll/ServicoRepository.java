package payroll;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

interface ServicoRepository extends JpaRepository<Servico, Long> {

    List<Servico> findByClienteId(Long clienteId);
}
