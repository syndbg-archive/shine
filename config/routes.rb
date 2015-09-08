Rails.application.routes.draw do
  devise_for :users

  root 'dashboard#index'

  namespace :api do
    resources :customers, only: [:index]
  end

  get '/customers', to: 'customers#index'
end
