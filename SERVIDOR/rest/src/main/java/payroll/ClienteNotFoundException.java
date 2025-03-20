package payroll;

class ClienteNotFoundException extends RuntimeException {

	ClienteNotFoundException(Long id) {
		super("Could not find employee " + id);
	}
}
