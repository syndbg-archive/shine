class AddLowerIndexesToCustomers < ActiveRecord::Migration
  def up
    execute <<-SQL
      CREATE INDEX customers_lower_first_name
      ON customers (lower(first_name) varchar_pattern_ops)
    SQL

    execute <<-SQL
      CREATE INDEX customers_lower_last_name
      ON customers (lower(last_name) varchar_pattern_ops)
    SQL

    execute <<-SQL
      CREATE INDEX customers_lower_email
      ON customers (lower(email) varchar_pattern_ops)
    SQL
  end

  def down
    remove_index 'customers_lower_first_name'
    remove_index 'customers_lower_last_name'
    remove_index 'customers_lower_email'
  end
end
