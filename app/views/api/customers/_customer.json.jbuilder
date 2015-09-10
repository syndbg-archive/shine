json.id customer.customer_id

json.call(customer, :email, :first_name, :last_name, :username, :created_at,
          :billing_street, :billing_city, :billing_state, :billing_zipcode,
          :shipping_street, :shipping_city, :shipping_state, :shipping_zipcode)
