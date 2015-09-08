Rails.application.routes.draw do
  devise_for :users

  root 'dashboard#index'

  resources :customers, only: [:index]
end
