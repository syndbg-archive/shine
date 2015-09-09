module Api
  class CustomersController < ApplicationController
    PAGE_SIZE = 10

    def index
      page = params.fetch(:page, 1).to_i

      @customers = if params[:keywords].present?
                     customers_by_keywords(params[:keywords])
                   else
                     Customer
                   end

      render json: @customers.page(page).per(PAGE_SIZE)
    end

    def show
      render json: Customer.find(params[:id]).try(:except, :updated_at)
    end

    private

    def customers_by_keywords(keywords)
      customer_search_term = CustomerSearchTerm.new(keywords)

      Customer.where(customer_search_term.where_clause,
                     customer_search_term.where_args)
        .order(customer_search_term.order)
    end
  end
end
