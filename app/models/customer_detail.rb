class CustomerDetail < ActiveRecord::Base
  self.primary_key = 'customer_id'

  belongs_to :customer

  def credit_card_token
    customer_id % 1000
  end

  def serializable_hash(options = nil)
    super(options).merge(credit_card_token: credit_card_token)
  end

  def generate_fake_billing_info
    {
      lastFour: Faker::Business.credit_card_number[-4..-1],
      cardType: Faker::Business.credit_card_type,
      expirationMonth: Faker::Business.credit_card_expiry_date.month,
      expirationYear: Faker::Business.credit_card_expiry_date.year,
      detailsLink: Faker::Internet.url
    }
  end

  def update(properties)
    Customer.find(customer_id).update(
      properties.slice(:first_name, :last_name, :username, :email)
    )

    update_billing_address(properties)
    update_shipping_address(properties)
  end

  private

  def update_billing_address(properties)
    billing_properties = address_properties('billing',
                                            properties.slice(:billing_street,
                                                             :billing_city,
                                                             :billing_state,
                                                             :billing_zipcode))
    Address.find(billing_address_id).update(billing_properties)
  end

  def update_shipping_address(properties)
    shipping_properties = address_properties('shipping',
                                             properties.slice(:shipping_street,
                                                              :shipping_city,
                                                              :shipping_state,
                                                              :shipping_zipcode))
    Address.find(shipping_address_id).update(shipping_properties)
  end

  def address_properties(type, properties)
    {
      street: properties["#{type}_street"],
      city: properties["#{type}_city"],
      state: State.find_by_code!(properties["#{type}_state"]),
      zipcode: properties["#{type}_zipcode"]
    }
  end
end
