class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :name

      t.timestamps null: false
    end

    add_reference :tasks, :user, index: true, foreign_key: true
  end
end
