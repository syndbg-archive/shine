class AddTriggersToRefreshCustomerDetails < ActiveRecord::Migration
  def up
    execute <<-SQL
      CREATE OR REPLACE FUNCTION
        refresh_customer_details()
        RETURNS TRIGGER LANGUAGE PLPGSQL
      AS $$
      BEGIN
        REFRESH MATERIALIZED VIEW CONCURRENTLY customer_details;
        RETURN NULL;
      END $$;
    SQL

    %w(customers customers_shipping_addresses customers_billing_addresses
       addresses).each do |table|
      execute <<-SQL
        CREATE TRIGGER refresh_customer_details
        AFTER INSERT OR UPDATE OR DELETE
        ON #{table}
          FOR EACH STATEMENT
            EXECUTE PROCEDURE refresh_customer_details()
      SQL
    end
  end

  def down
    %w(customers
       customers_shipping_addresses
       customers_billing_addresses
       addresses).each do |table|
      execute "DROP TRIGGER refresh_customer_details ON #{table}"
    end

    execute 'DROP FUNCTION refresh_customer_details()'
  end
end
