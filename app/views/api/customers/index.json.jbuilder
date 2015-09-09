json.partial! '/api/paginated', resource: @customers

json.items do
  json.array! @customers, partial: 'customer', as: :customer
end
