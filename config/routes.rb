Rails.application.routes.draw do
  root 'users#new'
  resources :users do
    resources :questions
    resources :score_boards
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
