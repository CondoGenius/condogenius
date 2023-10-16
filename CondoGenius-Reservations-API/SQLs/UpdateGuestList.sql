UPDATE guest_list
SET name = IFNULL(@Name, name), phone = IFNULL(@Phone, phone), cpf = IFNULL(@Cpf, cpf)
WHERE id = @Id;
