if Customer.count == 0
  logger.info 'Creating customers.'

  3000.times do |i|
    Customer.create!(
      first_name: Faker::Name.first_name,
      last_name: Faker::Name.last_name,
      username: "#{Faker::Internet.user_name}#{i}",
      email: "#{Faker::Internet.user_name}#{i}@#{Faker::Internet.domain_name}")
  end

  logger.info 'Done creating customers.'
end

if State.count == 0
  logger.info 'Creating States'

  State.create!(name: 'Alabama', code: 'AL')
  State.create!(name: 'Alaska', code: 'AK')
  State.create!(name: 'Arizona', code: 'AZ')
  State.create!(name: 'Arkansas', code: 'AR')
  State.create!(name: 'California', code: 'CA')
  State.create!(name: 'Colorado', code: 'CO')
  State.create!(name: 'Connecticut', code: 'CT')
  State.create!(name: 'Delaware', code: 'DE')
  State.create!(name: 'Dist. of Columbia', code: 'DC')
  State.create!(name: 'Florida', code: 'FL')
  State.create!(name: 'Georgia', code: 'GA')
  State.create!(name: 'Hawaii', code: 'HI')
  State.create!(name: 'Idaho', code: 'ID')
  State.create!(name: 'Illinois', code: 'IL')
  State.create!(name: 'Indiana', code: 'IN')
  State.create!(name: 'Iowa', code: 'IA')
  State.create!(name: 'Kansas', code: 'KS')
  State.create!(name: 'Kentucky', code: 'KY')
  State.create!(name: 'Louisiana', code: 'LA')
  State.create!(name: 'Maine', code: 'ME')
  State.create!(name: 'Maryland', code: 'MD')
  State.create!(name: 'Massachusetts', code: 'MA')
  State.create!(name: 'Michigan', code: 'MI')
  State.create!(name: 'Minnesota', code: 'MN')
  State.create!(name: 'Mississippi', code: 'MS')
  State.create!(name: 'Missouri', code: 'MO')
  State.create!(name: 'Montana', code: 'MT')
  State.create!(name: 'Nebraska', code: 'NE')
  State.create!(name: 'Nevada', code: 'NV')
  State.create!(name: 'New Hampshire', code: 'NH')
  State.create!(name: 'New Jersey', code: 'NJ')
  State.create!(name: 'New Mexico', code: 'NM')
  State.create!(name: 'New York', code: 'NY')
  State.create!(name: 'North Carolina', code: 'NC')
  State.create!(name: 'North Dakota', code: 'ND')
  State.create!(name: 'Ohio', code: 'OH')
  State.create!(name: 'Oklahoma', code: 'OK')
  State.create!(name: 'Oregon', code: 'OR')
  State.create!(name: 'Pennsylvania', code: 'PA')
  State.create!(name: 'Rhode Island', code: 'RI')
  State.create!(name: 'South Carolina', code: 'SC')
  State.create!(name: 'South Dakota', code: 'SD')
  State.create!(name: 'Tennessee', code: 'TN')
  State.create!(name: 'Texas', code: 'TX')
  State.create!(name: 'Utah', code: 'UT')
  State.create!(name: 'Vermont', code: 'VT')
  State.create!(name: 'Virginia', code: 'VA')
  State.create!(name: 'Washington', code: 'WA')
  State.create!(name: 'West Virginia', code: 'WV')
  State.create!(name: 'Wisconsin', code: 'WI')
  State.create!(name: 'Wyoming', code: 'WY')

  logger.info 'Done creating states.'
end

def create_billing_address(customer_id, num_states)
  billing_state   = State.find(rand(num_states) + 1)
  billing_address = Address.create!(
    street: Faker::Address.street_address,
    city: Faker::Address.city,
    state: billing_state,
    zipcode: Faker::Address.zip
  )

  CustomersBillingAddress.create!(customer_id: customer_id,
                                  address: billing_address)
end

def create_shipping_address(customer_id, num_states, is_primary)
  shipping_state = State.find(rand(num_states) + 1)
  shipping_address = Address.create!(
    street: Faker::Address.street_address,
    city: Faker::Address.city,
    state: shipping_state,
    zipcode: Faker::Address.zip
  )

  CustomersShippingAddress.create!(customer_id: customer_id,
                                   address: shipping_address,
                                   primary: is_primary)
end

num_states = State.count

Customer.pluck(:id).each do |customer_id|
  create_billing_address(customer_id, num_states)

  num_shipping_addresses = rand(4) + 1

  num_shipping_addresses.times do |i|
    create_shipping_address(customer_id, num_states, i == 0)
  end
end
