class CustomerDetail < ActiveRecord::Base
  self.primary_key = 'customer_id'

  belongs_to :customer

  def generate_fake_billing_info
    {
      lastFour: Faker::Business.credit_card_number[-4..-1],
      cardType: Faker::Business.credit_card_type,
      expirationMonth: Faker::Business.credit_card_expiry_date.month,
      expirationYear: Faker::Business.credit_card_expiry_date.year,
      detailsLink: Faker::Internet.url
    }
  end
end
