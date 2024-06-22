class AddMemoToEvents < ActiveRecord::Migration[6.1]
  def change
    add_column :events, :memo, :text
  end
end
