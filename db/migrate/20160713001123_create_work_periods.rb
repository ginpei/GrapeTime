class CreateWorkPeriods < ActiveRecord::Migration
  def change
    create_table :work_periods do |t|
      t.timestamp :started_at
      t.timestamp :finished_at
      t.string :note
      t.references :task, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
