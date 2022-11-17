class Api::V1::ApplicationController < Api::ApplicationController
  respond_to :json
  include AuthHelper
  helper_method :current_user
  RANSACK_DEFAULT_SORT = 'id asc'

  def self.responder
    JsonResponder
  end

  def build_meta(collection)
    {
      count: collection.count,
      total_count: collection.total_count,
      current_page: collection.current_page,
      total_pages: collection.total_pages,
      per_page: collection.limit_value,
    }
  end

  def ransack_params
    if params.has_value?('state_eq' => 'new_task')
      { 'state_eq' => 'new_task', s: 'id desc' }
    else
      params.to_unsafe_h.fetch(:q, nil )
    end
  end

  def page
    params.fetch(:page, 1)
  end

  def per_page
    per = params.fetch(:per, 10).to_i
    per > 100 ? 100 : per
  end
end
