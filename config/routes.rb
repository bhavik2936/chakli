Rails.application.routes.draw do
  root 'users#new'
  resources :questions
  resources :users do
    resources :score_boards
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
