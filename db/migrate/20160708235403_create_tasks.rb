class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.string :name
      t.integer :spent_time, default: 0
      t.integer :estimate_time, default: 0
      t.integer :necessary_time, default: 0
      t.integer :parent_id

      t.timestamps null: false
    end
  end
end
