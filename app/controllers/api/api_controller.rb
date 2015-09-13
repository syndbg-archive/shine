module Api
  class ApiController < ActionController::Base
    # Prevent CSRF attacks by raising an exception.
    # For APIs, you may want to use :null_session instead.
    protect_from_forgery with: :null_session

    before_action :deep_snake_case_params!
    after_action :csrf_cookie_for_angular!

    respond_to :json

    def deep_snake_case_params!(val = params)
      case val
      when Array
        val.map { |v| deep_snake_case_params! v }
      when Hash
        val.keys.each do |k, v = val[k]|
          val.delete k
          val[k.underscore] = deep_snake_case_params!(v)
        end
        val
      else
        val
      end
    end

    def csrf_cookie_for_angular!
      cookies['XSRF-TOKEN'] = form_authenticity_token if protect_against_forgery?
    end

    def verified_request?
      super || valid_authenticity_token?(session, request.headers['X-XSRF-TOKEN'])
    end
  end
end
