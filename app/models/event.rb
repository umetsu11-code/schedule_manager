class Event < ApplicationRecord
  validates :title, presence: true, length: { maximum: 20 }
  validates :start_time, presence: true
  validates :end_time, presence: true
  validate :end_time_after_start_time
  validates :memo, length: { maximum: 500 }

  def end_time_after_start_time
    return if end_time.blank? || start_time.blank?

    if end_time < start_time
      errors.add(:end_time, "終了日は開始日以降の日付にしてください")
    end
  end
end