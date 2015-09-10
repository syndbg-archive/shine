class Customer < ActiveRecord::Base
  has_many :customers_shipping_address

  has_one :customers_billing_address
  has_one :customer_detail
  has_one :billing_address, through: :customers_billing_address,
                            source: :address

  def primary_shipping_address
    customers_shipping_address.find_by(primary: true).address
  end
end
