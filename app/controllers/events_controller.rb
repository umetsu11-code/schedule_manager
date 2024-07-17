class EventsController < ApplicationController
  before_action :set_event, only: [:show, :edit, :update, :destroy]

  def index
    @events = Event.all
    @current_date = Time.zone.today.strftime('%Y/%m/%d')
    @total_events = @events.count
  end

  def show
  end

  def new
    @event = Event.new
  end

  def edit
  end

  def create
    @event = Event.new(event_params)
    if @event.save
      flash[:notice] = 'スケジュールが正常に作成されました。'
      redirect_to @event
    else
      flash[:alert] = 'スケジュールの作成に失敗しました。'
      render :new
    end
  end

  def update
    if @event.update(event_params)
      flash[:notice] = 'スケジュールが正常に更新されました。'
      redirect_to @event
    else
      flash[:alert] = 'スケジュールの更新に失敗しました。'
      render :edit
    end
  end

  def destroy
    @event.destroy
    flash[:notice] = 'スケジュールが削除されました。'
    respond_to do |format|
      format.html { redirect_to events_url }
      format.json { head :no_content }
    end
  end

  private

  def set_event
    @event = Event.find(params[:id])
  end

  def event_params
    params.require(:event).permit(:title, :start_time, :end_time, :all_day, :memo)
  end
end

  
